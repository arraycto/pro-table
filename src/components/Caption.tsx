import React, { FC, CSSProperties, ReactNode } from 'react';
import { cx } from '../utils';

export interface CaptionProps {
    className?: string
    style?: CSSProperties
    children?: ReactNode
}

export interface CaptionType {
    (props: CaptionProps): JSX.Element
    displayName: string
    Title: FC
    Description: FC
    Extra: FC<{ className?: string }>
}

export const Caption: CaptionType = ({ children, className, style }) => {
    let titleComp, descriptionComp, extraComp;

    React.Children.forEach(children, (comp: any) => {
        switch (comp?.type?.displayName) {
        case 'CaptionTitle':
            titleComp = comp;
            break;
        case 'CaptionDescription':
            descriptionComp = comp;
            break;
        case 'CaptionExtra':
            extraComp = comp;
            break;
        default:
        }
    });

    return (
        <div className={cx('pro-table-caption', className)} style={style}>
            <div className="left-box">
                {titleComp}
                {descriptionComp}
            </div>
            {extraComp}
        </div>
    );
};

Caption.displayName = 'TableCaption';
Caption.Title = ({ children, ...resetProps }) => (
    <>{children && <h3 {...resetProps}>{children}</h3>}</>
);
Caption.Title.displayName = 'CaptionTitle';

Caption.Description = ({ children, ...resetProps }) => (
    <>{children && <p {...resetProps}>{children}</p>}</>
);
Caption.Description.displayName = 'CaptionDescription';

Caption.Extra = ({ children, className, ...resetProps }) => (
    <>
        {children && (
            <div className={cx('right-box', className)} {...resetProps}>
                <div className="extra">{children}</div>
            </div>
        )}
    </>
);
Caption.Extra.displayName = 'CaptionExtra';


