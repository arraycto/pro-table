import React, { FC, useCallback, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { cx } from '../utils';

/** 消息类型 */
export type IconType = 'success' | 'error' | 'warn' | 'info'
export interface NoticeProps {
    type: IconType
    content: string
    duration?: number
    onClose: () => void
}

/* eslint-disable max-len */
const mapTypeToIcon: Record<IconType, string> = {
    success: 'M512.697383 63.443961c-247.539816 0-448.208115 200.668299-448.208115 448.208115 0 247.539816 200.668299 448.208115 448.208115 448.208115 247.539816 0 448.208115-200.668299 448.208115-448.208115C960.905498 264.11226 760.237199 63.443961 512.697383 63.443961zM782.650675 386.324696 472.510102 703.184297c-1.057075 1.586125-2.233877 3.100618-3.620457 4.504594-12.155854 12.346189-31.861662 12.346189-44.025703 0L270.811334 551.265282c-12.146645-12.347213-12.146645-32.354895 0-44.683688 12.154831-12.347213 31.860638-12.347213 44.016493 0L446.411701 640.173195l292.213271-298.549583c12.165064-12.346189 31.861662-12.346189 44.025703 0C794.797319 353.9698 794.797319 373.97646 782.650675 386.324696z',
    error: 'M512 102.4c-225.28 0-409.6 184.32-409.6 409.6s184.32 409.6 409.6 409.6 409.6-184.32 409.6-409.6-184.32-409.6-409.6-409.6z m184.32 542.72c15.36 15.36 15.36 35.84 0 51.2s-35.84 15.36-51.2 0l-133.12-133.12-133.12 133.12c-15.36 15.36-35.84 15.36-51.2 0s-15.36-35.84 0-51.2l133.12-133.12-133.12-133.12c-15.36-15.36-15.36-35.84 0-51.2s35.84-15.36 51.2 0l133.12 133.12 133.12-133.12c15.36-15.36 35.84-15.36 51.2 0s15.36 35.84 0 51.2l-133.12 133.12 133.12 133.12z',
    warn: 'M506.5 64C264.6 64 64 264.6 64 517.5 64 759.4 264.6 960 506.5 960 759.4 960 960 759.4 960 517.5 960 264.6 759.4 64 506.5 64z m-23.7 226.3c5.4-5.6 12.9-8.8 20.7-8.7h17c16.5 0 29.4 13.3 28.8 29.8l-11.1 284.3c-0.3 8.3-7.1 14.9-15.4 15h-21.6c-8.3-0.1-15-6.7-15.4-15l-11-284.3c-0.4-7.8 2.5-15.5 8-21.1zM512 729.6c-21.2 0-38.4-16.3-38.4-36.5 0-20.1 17.2-36.5 38.4-36.5s38.4 16.3 38.4 36.5-17.2 36.5-38.4 36.5z',
    info: 'M512 51.2c-253.952 0-460.8 206.848-460.8 460.8s206.848 460.8 460.8 460.8S972.8 765.952 972.8 512s-206.848-460.8-460.8-460.8z m4.096 727.04c0 12.288-10.24 22.528-22.528 22.528s-22.528-10.24-22.528-22.528v-327.68c0-12.288 10.24-22.528 22.528-22.528s22.528 10.24 22.528 22.528v327.68z m0-430.08c0 12.288-10.24 22.528-22.528 22.528s-22.528-10.24-22.528-22.528v-61.44c0-12.288 10.24-22.528 22.528-22.528s22.528 10.24 22.528 22.528v61.44z'
};
/* eslint-able max-len */

/** 通知信息视图部分 */
const Notice: FC<NoticeProps> = ({ type, content, duration, onClose }) => {
    const timer = useRef<null | NodeJS.Timeout>(null);

    const startCloseTimer = useCallback(() => {
        timer.current = setTimeout(onClose, duration || 3000);
    }, [onClose, duration]);
    const clearCloseTimer = useCallback(() => {
        timer.current && clearTimeout(timer.current);
    }, []);

    useEffect(() => {
        startCloseTimer();
        return clearCloseTimer;
    }, [startCloseTimer, clearCloseTimer]);

    return (
        <div
            className="pro-table-message-notice-content"
            onMouseEnter={clearCloseTimer}
            onMouseLeave={startCloseTimer}
        >
            <svg
                viewBox="0 0 1024 1024"
                className={cx('pro-table-message-icon', `pro-table-message-icon-${type}`)}
            >
                <path d={mapTypeToIcon[type]} />
            </svg>
            {content}
        </div>
    );
};

/** 仿 antd 的 message */
export class Message {
    container
    constructor (container?: HTMLElement) {
        if (container) {
            this.container = container;
        } else {
            const div = document.createElement('div');

            div.setAttribute('class', 'pro-table-message');
            document.body.appendChild(div);
            this.container = div;
        }
    }
    render (type: IconType, content: string, duration?: number): void {
        const notice = document.createElement('div');

        notice.setAttribute('class', 'pro-table-message-notice');
        this.container.appendChild(notice);

        ReactDOM.render(
            <Notice
                type={type}
                content={content}
                duration={duration}
                onClose={() => {
                    notice.classList.add('leave');
                    setTimeout(() => {
                        if (!notice) return;
                        ReactDOM.unmountComponentAtNode(notice);
                        notice.remove();
                    }, 300);
                }}
            />,
            notice
        );
    }
    success (content: string, duration?: number): void {
        this.render('success', content, duration);
    }
    error (content: string, duration?: number): void {
        this.render('error', content, duration);
    }
    warn (content: string, duration?: number): void {
        this.render('warn', content, duration);
    }
    info (content: string, duration?: number): void {
        this.render('info', content, duration);
    }
}

export const message = new Message();
