import React, { FC } from 'react';
import { cx } from '../../../utils';

interface FormProps {
    filter?: boolean
    className?: string
}
const Form: FC<FormProps> = ({ children, filter, className, ...restProps }) => {
    return (
        <div
            className={cx(
                'panel',
                filter ? 'form-rule-3-filter' : 'form-rule-3',
                className
            )}
            {...restProps}
        >
            {children}
        </div>
    );
};

export default Form;
