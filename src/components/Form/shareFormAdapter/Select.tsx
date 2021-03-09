import React, { FC } from 'react';
import { getValueBySelect2Event } from './utils';
import { Select as OriginSelect } from '@share/shareui';
import { FormItemProps } from './types';

interface SelectWrapProps extends FormItemProps {
    options?: { label: string, value: string }[]
}
export const Select: FC<SelectWrapProps> = props => {
    const { onChange, options, label, placeholder = `请选择${label || '...'}`, ...restProps } = props;
    const onChangeWrap = (e: any) => {
        const value = getValueBySelect2Event(e);

        onChange({ target: { value } });
    };

    return (
        <OriginSelect
            options={options || []}
            onChange={onChangeWrap}
            label={label}
            placeholder={placeholder}
            {...restProps}
        />
    );
};
