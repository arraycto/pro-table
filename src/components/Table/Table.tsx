import React, { ReactNode } from 'react';
import { ShareList } from '@share/list';
import { usePTContext } from '../../context';

// IShareListProps 类型在使用的时候存在问题，暂时不设置类型，也不建议在这组件上传属性
// export type TableProps<Condition, RowEntity> = IShareListProps<Condition, RowEntity>

export interface TableProps {
    className?: string
    children?: ReactNode
    [prop: string]: any
}

/** 与 ShareList 用法一样，只是不需要传 listState */
export function Table ({ children, ...restProps }: TableProps): JSX.Element {
    const { listState } = usePTContext();

    return <ShareList listState={listState} {...restProps}>{children}</ShareList>;
}

Table.displayName = 'Table';

export { Column, NumberColumn, CheckColumn } from '@share/list';
export * from './components/ActionColumn';
