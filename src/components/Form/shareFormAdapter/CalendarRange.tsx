import React, { FC } from 'react';
import { CalendarRange as OriginCalendarRange, Calendar } from '@share/shareui';
import { FormItemProps } from './types';

interface CalendarRangeWrapProps extends FormItemProps {
    inputProps?: Record<string, any>
    format?: {
        data?: string,
        display?: string
    }
}

export const CalendarRange: FC<CalendarRangeWrapProps> = ({ value, onChange, format, ...props }) => {
    return (
        <OriginCalendarRange
            format={{
                data: Calendar.DATE_DIS_FORMAT,
                display: Calendar.DATE_DIS_FORMAT,
                ...(format || {})
            }}
            value={value}
            onChange={(e: any) => {
                if (typeof e.target.value !== 'object') {
                    e.target.value = {
                        ...value,
                        [e.target.field]: e.target.value
                    };
                }

                onChange(e);
            }}
            {...props}
        />
    );
};
