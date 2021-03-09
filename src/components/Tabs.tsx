import React, { FC } from 'react';
import { usePTContext } from '../context';
import { cx } from '../utils';
import { tabsSwitch } from '../utils/operation';

export interface TabsProps {

    /** 标签选项数据 */
    options?: Array<{ label: string, value: string }>

    /** 切换 Tabs 时是否重置表单数据 */
    resetForm?: boolean

    /** 切换 Tabs 时是否刷新列表 */
    refreshTable?: boolean

    /** 切换 Tabs 触发的事件，事件函数返回 `false` 或 `Promise<false>` 时可阻止后续行为 */
    onChange?: (e: { label: string, value: string }) => void | boolean | Promise<void | boolean>
}

export const Tabs: FC<TabsProps> = props => {
    const { options = [], resetForm = true, refreshTable = true, onChange } = props;
    const ptContext = usePTContext();

    const handleSwitch = async (item: { label: string, value: string }) => {
        if (onChange) {
            const res = await onChange(item);

            if (res === false) {
                return;
            }
        }
        tabsSwitch(ptContext, item.value, resetForm, refreshTable);
    };

    return (
        <ul className="nav nav-tabs">
            {options.map(item => (
                <li
                    key={item.value}
                    className={cx({ active: item.value === ptContext.tabsValue })}
                    onClick={() => handleSwitch(item)}
                >
                    <a>{item.label}</a>
                </li>
            ))}
        </ul>
    );
};

Tabs.displayName = 'Tabs';
