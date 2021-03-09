import React, { FC } from 'react';
import { Calendar as OriginCalendar } from '@share/shareui';
import { FormItemProps } from './types';

interface CalendarProps extends FormItemProps {
    inputProps?: Record<string, any>
    format?: {
        data?: string,
        display?: string
    }
}

export const Calendar: FC<CalendarProps> = ({ inputProps, format, ...props }) => (
    <OriginCalendar
        inputProps={{ placeholder: '请选择日期', ...(inputProps || {}) }}
        format={{
            data: OriginCalendar.DATE_DIS_FORMAT,
            display: OriginCalendar.DATE_DIS_FORMAT,
            ...(format || {})
        }}
        {...props}
    />
);
