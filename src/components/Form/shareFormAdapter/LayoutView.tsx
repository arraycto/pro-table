import React, { CSSProperties, FC, ReactNode } from 'react';
import { FormItem, TextTip, OverlayTrigger, Tooltip } from '@share/shareui';
import { cx } from '../../../utils';

function getColClass(col: string | number) {
    if (!col) return '';
    return `col-xs-${col} col-sm-${col} col-md-${col} col-lg-${col}`;
}

export interface LayoutViewProps {
    label?: ReactNode
    required?: boolean
    errorMessage?: string | null
    longText?: string
    col?: string | number
    tip?: ReactNode
    labelClassName?: string
    labelStyle?: CSSProperties
    unit?: ReactNode
    unitClassName?: string
    ['data-has-error']?: boolean
}
export const LayoutView: FC<LayoutViewProps> = props => {
    const {
        label = null, required, errorMessage, children, longText,
        labelClassName, labelStyle,
        col = '4', tip, unit, unitClassName
    } = props;

    const hasError = props['data-has-error'];
    const hasTip = !!tip;
    const hasUnit = !!unit;

    const validationState = hasError ? 'error' : '';
    const colClass = getColClass(col);

    return (
        <div className={colClass}>
            <FormItem className={'form-item'}>
                {label !== null && (
                    <FormItem.Label
                        required={required}
                        longText={longText}
                        className={cx(
                            { [labelClassName || '']: !!labelClassName },
                            'label-item'
                        )}
                        style={labelStyle}
                    >
                        {label}
                    </FormItem.Label>
                )}
                <FormItem.Content validationState={validationState}>
                    <div className="dis-table">
                        {React.Children.map(children, item => (
                            <div className={'dis-tableCell'}>{item}</div>
                        ))}
                        {hasUnit && (
                            <div className={cx('form-item-custom dis-tableCell', unitClassName)}>
                                <span className="help-tip">{unit}</span>
                            </div>
                        )}
                        {hasTip && (
                            <OverlayTrigger
                                placement="right"
                                overlay={(
                                    <Tooltip placement="right" className="in" id="tooltip-right">
                                        {tip}
                                    </Tooltip>
                                )}
                            >
                                <span
                                    style={{ width: '17px' }}
                                    className="fa fa fa-question-circle dis-tableCell text-primary"
                                />
                            </OverlayTrigger>
                        )}
                    </div>
                    {hasError && (
                        <TextTip>{errorMessage}</TextTip>
                    )}
                </FormItem.Content>
            </FormItem>
        </div>
    );
};
