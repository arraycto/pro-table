import { Column, ColumnConfig } from '@share/list';
import { cx } from '../../../utils';

export class ActionColumn<RowEntity = any> extends Column<RowEntity> {
    static getConfig = (props: ColumnConfig): ColumnConfig => {
        const { field, label, className } = props;

        return {
            ...props,
            field: field ?? '_action',
            label: label ?? '操作',
            className: cx('action-col', className)
        };
    }
}
