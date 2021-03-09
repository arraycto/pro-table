import React, { FC } from 'react';
import { Radio as OriginRadio } from '@share/shareui';
import { FormItemProps } from './types';

export const Radio: FC<FormItemProps> = props => {
    const { value, onChange } = props;
    const checked = !!value;
    const onChangeWrap = () => {
        onChange({ target: { value: !checked } });
    };

    return <OriginRadio {...props} onChange={onChangeWrap} checked={checked} />;
};
