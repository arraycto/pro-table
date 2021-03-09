import React, { FC } from 'react';
import { CheckboxGroup as OriginCheckboxGroup } from '@share/shareui';
import { FormItemProps } from './types';

export const CheckboxGroup: FC<FormItemProps> = props => {
    const { onChange, ...otherProps } = props;

    const onChangeWrap  = (value: any, option: any) => {
        onChange({ target: { value }, option });
    };

    return <OriginCheckboxGroup {...otherProps} onChange={onChangeWrap} />;
};
