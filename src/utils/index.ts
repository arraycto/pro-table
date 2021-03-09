/** 仿 classNames 功能实现 */
export function cx (...args: Array<undefined | string | Record<string, boolean>>): string {
    const classArr: string[] = [];

    args.forEach(value => {
        if (!value) return;
        if (typeof value === 'string') {
            classArr.push(value);
        } else {
            Object.entries(value).forEach(([key, bool]) => {
                bool && classArr.push(key);
            });
        }
    });
    return classArr.join(' ');
}

/** 数组扁平化 */
export function arrayFlat (arr: any[]): any[] {
    let newArr: any[] = [];

    for (const item of arr) {
        newArr = newArr.concat(Array.isArray(item) ? arrayFlat(item) : item);
    }

    return newArr;
}
