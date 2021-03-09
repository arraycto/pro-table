import React, { CSSProperties, FC, ReactNode } from 'react';
import { getComponents } from '../shareFormAdapter';
import { IFormState } from '../../../types';
import { usePTContext } from '../../../context';
import { cx } from '../../../utils';
import { LayoutViewProps } from '../shareFormAdapter/LayoutView';

const { FormItem: OriginFormItem } = getComponents('table-query');

interface FormItemChildrenProps {
    className?: string
    'data-has-error': boolean
    errorMessage: string
    field?: string | boolean
    style?: CSSProperties
    onChange: (e: { target: { value: any } }) => void
    value: any
}

export interface FormItemProps extends LayoutViewProps {

    /** 栅格化所占的格数，总共 12 格 */
    col?: string | number
    className?: string
    style?: CSSProperties,
    children?: Omit<ReactNode, 'function'> | ((
        formProps: FormItemChildrenProps & {
            formState: IFormState
        }
    ) => ReactNode)
}

// 重写 FormItem ，处理子元素传非函数时不显示的问题
export const FormItem: FC<FormItemProps> = ({ className, style, children, ...restProps }) => {
    const { formState } = usePTContext();

    return (
        typeof children === 'function' ?
            <OriginFormItem field className={className} style={style} {...restProps}>
                {(formProps: FormItemChildrenProps) => children({ ...formProps, formState })}
            </OriginFormItem> :
            <OriginFormItem field {...restProps}>
                {() => (
                    <div className={cx('form-item item', className)} style={style}>
                        {children}
                    </div>
                )}
            </OriginFormItem>
    );
};

FormItem.displayName = 'FormItem';
