import { IMapField } from '../types';

/**
 * 设置数据
 * @example
 * setValue(dataSource, 'a.b.c', '123');    // dataSource.a = { b: { c: '123' } }
 * setValue(dataSource, 'a.0', '123');      // dataSource.a = ['123']
 * setValue(dataSource, 'a.0.b', '123');    // dataSource.a = [{ b: '123' }]
 */
export function setMagicValue (dataSource: Record<string, any>, field: string, value: unknown): void {
    if (!dataSource || typeof dataSource !== 'object' || !field) return;
    // a.b.c 拆解为 ['a', 'b', 'c']
    const fieldArr = field.split('.').filter(v => v);

    // 只有一层字段时直接设置
    if (fieldArr.length === 1) {
        dataSource[field] = value;
        return;
    }
    let result = dataSource;

    // 多层字段时递归访问，最后一层设置值
    fieldArr.forEach((key, index, arr) => {
        // 最后一层
        if (index === arr.length - 1) {
            result[key] = value;
        } else {
            // 判断下一层数据是否是对象，不是对象时初始化值
            if (typeof result[key] !== 'object') {
                // 字段名是数字时创建数组，非数字时创建对象
                result[key] = (/^\d+$/).test(arr[index + 1]) ? [] : {};
            }
            // 递归访问
            result = result[key];
        }
    });
}

/**
 * 获取数据
 * @example
 * getValue(dataSource, 'a.b.c');   // dataSource.a.b.c
 * getValue(dataSource, 'a.0');     // dataSource.a[0]
 * getValue(dataSource, 'a.0.b');   // dataSource.a[0].b
 */
export function getMagicValue (dataSource: Record<string, any>, field: string): Record<string, any> | undefined {
    if (!dataSource || typeof dataSource !== 'object' || !field) return;

    return field.split('.')
        // 多个点号连着写的容错处理
        .filter(v => v)
        // 递归访问对象
        .reduce((rs, key) => rs?.[key], dataSource);
}

/**
 * 删除数据
 * @example
 * deleteMagicValue(dataSource, 'a.b.c');  // delete dataSource.a.b.c
 * deleteMagicValue(dataSource, 'b.c');    // delete dataSource.b.c'
 */
function deleteMagicValue (dataSource: Record<string, any>, field: string | string[]) {
    if (!dataSource || typeof dataSource !== 'object' || !field) return;

    // 'a.b.c' 转为 ['a', 'b', 'c']，传数组时直接使用
    const [first, ...other] = Array.isArray(field) ? field : field.split('.').filter(v => v);

    if (dataSource[first] && typeof dataSource[first] === 'object') {
        // 对象类型，递归调用对象删除
        deleteMagicValue(dataSource[first], other);
        // 如果对象的所有属性都删完了，就删除当前对象
        if (Object.keys(dataSource[first]).length === 0) {
            delete dataSource[first];
        }
    } else {
        delete dataSource[first];
    }
}

/** 合并数据 */
function mergeData (data1: Record<string, any>, data2: Record<string, any>) {
    Object.entries(data2).forEach(([key, value]) => {
        setMagicValue(data1, key, value);
    });
    return data1;
}

/** 根据 mapField 获取 getFormDataToData 方法 */
export function getFormDataToDataByMapField (mapField: IMapField) {
    return function formDataToData (formData: Record<string, any>): Record<string, any> {
        if (!formData || typeof formData !== 'object') {
            throw new TypeError('formData type is not an object in formDataToData method');
        }
        const draftData = JSON.parse(JSON.stringify(formData));
        const newData = {}; // 新旧值分开存是避免新旧值存在相同的数据接口误删除

        /**
         * 字段名称转化，旧属性名转为新属性名
         *
         * 实现思路：
         * 1. 遍历 currMapField 对象，里面存储旧属性名和新属性名的对应关系，key 值做为 left，value 值作为 right
         * 2. 如果 right 是对象或数组，递归调用自身；如果是字符串，设置新值删除旧值，如果是函数，调用函数删除旧值
         * 3. 设置完回到上一级，这时值肯定是对象，查找对象是不是变成空对象了，是就删除当前对象，然后继续回到上一级
         * 4. 直到回到顶级处理完所有属性后才完成，然后与 currData 合并数据
         *
         * @example
         * currData = { a: '', b: [''], c: { ca: '' } }
         * currMapField = { a: 'a1', b: ['b1'], c: { ca: 'ca1' } }
         * // data 数据将会转化为
         * // { a1: ''， b1: '', ca1: '' }
         */
        const fieldNameTransform = (currData: Record<string, any>, currMapField: IMapField) => {
            Object.entries(currMapField).forEach(([left, right]) => {
                if (!right) return;
                if (typeof right === 'object') {
                    // 如果是对象或数组就递归调用
                    fieldNameTransform(currData[left], right);

                    // 如果处理完后变成一个空对象，就把当前值也删了
                    if (Object.keys(currData[left]).length === 0) {
                        delete currData[left];
                    }
                } else if (typeof right === 'string') {
                    // 如果是字符串就设置新属性，删除旧属性
                    setMagicValue(newData, right, currData[left]);
                    delete currData[left];
                } else if (typeof right === 'function') {
                    // 如果是函数，就执行函数获取新的属性名，并设置新属性，删除旧属性
                    setMagicValue(newData, right(), currData[left]);
                    delete currData[left];
                }
            });
        };

        fieldNameTransform(draftData, mapField);

        // 数据合并，将 currMapField 没体现的数据合并进去
        return mergeData(draftData, newData);
    };
}

/** 根据 mapField 获取 getDataToFormData 方法 */
export function getDataToFormDataByMapField (mapField: IMapField) {
    return function dataToFormData (data: Record<string, any>): Record<string, any> {
        if (!data || typeof data !== 'object') {
            throw new TypeError('formData type is not an object in formDataToData method');
        }
        const draftData = JSON.parse(JSON.stringify(data));
        const newData = {}; // 新旧值分开存是避免新旧值存在相同的数据接口误删除
        const waitDelFields: string[] = []; // 待删除队列

        /**
         * 字段名称转化，新属性名转为旧属性名
         *
         * 实现思路：
         * 1. 遍历 currMapField 对象，里面存储旧属性名和新属性名的对应关系，key 值做为 left，value 值作为 right
         * 2. 如果 right 是对象，判断 right 是普通对象还是数组，构建一个空对象或空数组，进入递归调用
         * 3. 如果 right 是字符串，在当前对象上设置新值，将旧值加进待删除队列里，不立即删除是因为会影响后续操作
         * 4. 设置完回到上一级，继续处理下一个字段
         * 5. 直到回到顶级处理完所有属性后才完成，然后将待删除队列所有数据依次删除，再与 currData 合并数据
         *
         * @example
         * currData = { a1: ''， b1: '', ca1: '' }
         * currMapField = { a: 'a1', b: ['b1'], c: { ca: 'ca1' } }
         * // data 数据将会转化为
         * // { a: '', b: [''], c: { ca: '' } }
         */
        const fieldNameTransform = (currData: Record<string, any>, currMapField: IMapField) => {
            Object.entries(currMapField).forEach(([left, right]) => {
                if (!right) return;
                if (typeof right === 'object') {
                    // 构建空对象或空数组
                    currData[left] = Array.isArray(right) ? [] : {};

                    fieldNameTransform(currData[left], right);
                } else if (typeof right === 'string') {
                    // 在当前对象上设置数据
                    currData[left] = getMagicValue(draftData, right);

                    // 加入待删除队列
                    waitDelFields.push(right);
                } else if (typeof right === 'function') {
                    // 如果是函数，执行函数获取属性名
                    const field = right();

                    currData[left] = getMagicValue(draftData, field);
                    waitDelFields.push(field);
                }
            });
        };

        fieldNameTransform(newData, mapField);

        // 遍历待删除队列逐个删除
        waitDelFields.forEach(field => deleteMagicValue(draftData, field));

        // 数据合并，将 currMapField 没体现的数据合并进去
        return mergeData(draftData, newData);
    };
}

/** 清除空数据的字段 */
export function clearEmptyField (data: Record<string, any>, isClear = true): Record<string, any> {
    if (!isClear) {
        return data;
    }
    const draft = JSON.parse(JSON.stringify(data));

    Object.entries(data).forEach(([key, value]) => {
        if (!value) {
            // 空数据直接删除
            delete draft[key];
        } else if (typeof value === 'object') {
            // 对象类型，递归调用对象删除
            const result = clearEmptyField(draft[key], isClear);

            // 如果对象的所有属性都删完了，就删除当前对象
            if (Object.keys(result).length === 0) {
                delete draft[key];
            }
        }
    });
    return draft;
}
