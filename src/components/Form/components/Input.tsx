import React, { FC } from 'react';
import { Button, Icon } from '@share/shareui';
import { getComponents } from '../shareFormAdapter';
import { usePTContext } from '../../../context';
import { query } from '../../../utils/operation';

const { Input: OriginInput, FormItem } = getComponents('table-query');

type Rule = (
    value: any, formData: any, field:string, timing:number, otherProps: any
) => true | Error | Promise<true | Error>

export interface InputProps {
    label?: string
    type?: string
    field?: string
    rule?: undefined | string | Rule | Array<string | Rule>
    required?: boolean
    placeholder?: string
    col?: string | number
}

// 增加了带有搜索按钮的功能
export const Input: FC<InputProps> = ({ label, type, ...restProps }) => {
    const ptContext = usePTContext();

    if (type === 'search') {
        return (
            <FormItem label={label} {...restProps}>
                {(props: Record<string, any>) => (
                    <div className="search-input">
                        <OriginInput.View
                            {...props}
                            onKeyDown={(e: KeyboardEvent) => e.keyCode === 13 && query(ptContext)}
                        />
                        <Button bsStyle="primary" onClick={() => query(ptContext)}>
                            <Icon className="si si-com_search" />
                        </Button>
                    </div>
                )}
            </FormItem>
        );
    }
    if (label) {
        return <OriginInput label={label} {...restProps} />;
    }
    return (
        <FormItem {...restProps}>
            {(props: Record<string, any>) => <OriginInput.View {...props} />}
        </FormItem>
    );
};

Input.displayName = 'FormItem(Input)';
