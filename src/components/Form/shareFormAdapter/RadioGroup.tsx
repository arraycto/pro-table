import React, { FC } from 'react';
import { RadioGroup as OriginRadioGroup } from '@share/shareui';
import { FormItemProps } from './types';

export const RadioGroup: FC<FormItemProps> = props => {
    const { onChange, ...otherProps } = props;
    const onChangeWrap  = (value: any, option: any) => {
        onChange({ target: { value }, option });
    };

    return <OriginRadioGroup {...otherProps} onChange={onChangeWrap} />;
};
