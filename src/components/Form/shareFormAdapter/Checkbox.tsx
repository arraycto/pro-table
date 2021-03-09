import React, { FC } from 'react';
import { Checkbox as OriginCheckbox } from '@share/shareui';
import { FormItemProps } from './types';

export const Checkbox: FC<FormItemProps> = props => {
    const { value, onChange } = props;
    const checked = !!value;
    const onChangeWrap = () => {
        onChange({ target: { value: !checked } });
    };

    return <OriginCheckbox {...props} onChange={onChangeWrap} checked={checked} />;
};
