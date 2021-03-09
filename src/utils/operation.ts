import { PTContext } from '../types';
import { clearEmptyField } from '../utils/fieldTransform';

/** 刷新列表 */
export async function refresh (ptContext: PTContext): Promise<void> {
    const { listState } = ptContext;

    await listState.refresh();
}

/** 根据表单数据查询列表 */
export async function query (ptContext: PTContext): Promise<void> {
    const { formState, listState, formDataToData, willClearEmptyField } = ptContext;

    if (!formState) return;
    const formData = formState.getFormData();
    const data = clearEmptyField(formDataToData(formData), willClearEmptyField);

    await listState.query(data);
}

/** 重置表单数据并查询列表 */
export async function reset (ptContext: PTContext): Promise<void> {
    const { formState, listState, initData, tabsField, formDataToData, willClearEmptyField } = ptContext;

    if (!formState) return;
    const initFormData = { ...initData };

    // 如果开启 Tabs ，重置的时候就忽略掉 Tabs 的字段
    if (tabsField) {
        delete initFormData[tabsField];
        initFormData[tabsField] = formState.getFieldValue(tabsField);
    }
    // 清除空数据的字段
    const data = clearEmptyField(formDataToData(initFormData), willClearEmptyField);

    formState.setFieldValues(initFormData);
    await listState.query(data);
}

/** tabs 切换 */
export async function tabsSwitch (
    ptContext: PTContext,
    newValue: string | number,
    resetForm = true,
    refreshTable = true
): Promise<void> {
    const { formState, listState, initData, tabsField, tabsValue, formDataToData, willClearEmptyField } = ptContext;

    if (!tabsField) {
        return;
    }

    if (tabsValue !== newValue && formState) {
        const formData = {
            ...(resetForm ? initData : formState.formData),
            [tabsField]: newValue
        };

        if (refreshTable && listState.query) {
            const data = clearEmptyField(formDataToData(formData), willClearEmptyField);

            await listState.query(data);
        }
        formState.setFieldValues(formData);
    }
}
