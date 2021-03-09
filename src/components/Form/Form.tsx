import React, { FC } from 'react';
import { getComponents } from './shareFormAdapter';
import { usePTContext } from '../../context';

const { Form: OriginForm } = getComponents('table-query');

export const Form: FC = ({ children, ...restProps }) => {
    const { formState } = usePTContext();

    return <OriginForm formState={formState} {...restProps}>{children}</OriginForm>;
};

Form.displayName = 'Form';

export * from './components/Input';
export * from './components/FormItem';
export const {
    Compose, FieldItem, Row,
    Radio, RadioGroup, Calendar, CalendarRange, Checkbox, CheckboxGroup, Select
} = getComponents('table-query');
