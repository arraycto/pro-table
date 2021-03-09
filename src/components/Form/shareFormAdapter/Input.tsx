import React, { FC } from 'react';
import { FormControl as OriginFormControl } from '@share/shareui';
import { debounceInputWrap } from './utils';
import { FormItemProps } from './types';

interface FormControlProps extends FormItemProps {
    type?: string
}

const FormControl: FC<FormControlProps> = ({
    label, placeholder = `请输入${label ? `${label}关键字` : '...'}`,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type, errorMessage,
    ...props
}) => (
    <OriginFormControl label={label} placeholder={placeholder} {...props} />
);

export const Input = debounceInputWrap(FormControl);
