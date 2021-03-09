import React, { FC } from 'react';
import { cx } from '../../../utils';

interface RowProps {
    className?: string
}
const Row: FC<RowProps> = ({ children, className, ...restProps }) => {
    return <div className={cx('row', className)} {...restProps}>{children}</div>;
};

export default Row;
