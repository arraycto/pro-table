import './ProTable.scss';
import React, { CSSProperties, ReactNode } from 'react';
import { IFormState, ProTableState } from './types';
import { Context } from './context';
import { cx } from './utils';
import { AsyncApi, SyncApi } from '@share/list';

export interface ProTableProps<Condition, RowEntity> extends Partial<ProTableState<Condition, RowEntity>> {
    formState: IFormState
    listState: AsyncApi<Condition, RowEntity> | SyncApi<Condition, RowEntity>
    className?: string
    style?: CSSProperties
    children: ReactNode
}

const ProTable = <Condition, RowEntity>(props: ProTableProps<Condition, RowEntity>): JSX.Element | null => {
    const {
        initData = {},
        dataToFormData = v => v, formDataToData = v => v,
        willClearEmptyField = true,
        tabsValue = '',
        tabsField, formState, listState,
        className, style, children
    } = props;

    if (!listState) {
        console.error('缺少必填属性 listState，请使用 useProTable 获取所需属性');
        return null;
    }
    if (typeof formState === 'undefined') {
        console.error('缺少必填属性 formState，请使用 useProTable 获取所需属性');
        return null;
    }

    return (
        <Context.Provider
            value={{
                initData, tabsField, tabsValue, formState, listState,
                dataToFormData, formDataToData, willClearEmptyField
            }}
        >
            <div className={cx('pro-table', className)} style={style}>
                {children}
            </div>
        </Context.Provider>
    );
};

ProTable.displayName = 'ProTable';

export default ProTable;
