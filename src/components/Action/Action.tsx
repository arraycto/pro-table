import React, { FC, Attributes, ReactNode, createElement } from 'react';
import ReactDOM from 'react-dom';
import { Link, useHistory } from 'react-router-dom';
import { ModalTool, Spin, Button } from '@share/shareui';
import { LocationDescriptor, LocationState } from 'history';
import { usePTContext } from '../../context';
import { Query } from './components/Query';
import { Reset } from './components/Reset';
import { message } from '../../utils/message';

const defaultConfirmFn = (msg: string) => new Promise(resolve => {
    /* eslint-disable-next-line */
    new ModalTool({
        title: '提示',
        content: msg,
        bsStyle: 'warning',
        onOk: resolve
    });
});

export interface ActionProps {

    /** 节点类型，默认 a 标签 */
    tag?: string | React.FC,

    /** 传了 to 之后就会转化为 `<Link>` 标签，将作为 `<Link>` 的 to 属性 */
    to?: string | LocationDescriptor<LocationState>

    /** 提示信息配置 */
    tipInfo?: {

        /** 二次确认时展示的文本，默认 "确定要[children]？" */
        confirmText?: string,

        /** 加载中展示的文本，默认 "[children]中..." */
        loadingText?: string,

        /** 操作成功后展示的文本， 默认 "[children]成功" */
        successText?: string
    }

    /** 是否需要在点击时做二次确认，如果要自定义弹窗可以传入函数 */
    confirm?: boolean | ((msg: string) => Promise<undefined | 'ok' | 'cancel'>)

    /** 是否需要在点击时弹窗出模态框，传入模态框组件 */
    modal?: ReactNode

    /** 模态框属性，将传入模态框组件里 */
    modalProps?: Omit<Record<string, any>, 'onConfirm' | 'onClose'>

    /** 弹窗模块框前触发的事件，事件函数返回 `false` 或 `Promise<false>` 可阻止后续操作 */
    onShowModalBefore?: () => boolean | undefined | Promise<boolean | void>

    onClick?: (modalData: any) => any
    children?: React.ReactNode
    [key: string]: any
}

export interface ActionType {
    (props: ActionProps): JSX.Element
    displayName: string
    Button: FC<ActionProps>
    Query: typeof Query
    Reset: typeof Reset
}

export const Action: ActionType = props => {
    const {
        tag = 'a', to, tipInfo = {}, confirm = false,
        modal, modalProps = {}, onShowModalBefore, onClick, children, ...restProps
    } = props;
    const { listState } = usePTContext();
    const history = useHistory();

    if (to) {
        if (tag === 'a') {
            return <Link to={to} {...restProps}>{children}</Link>;
        } else {
            return createElement(
                tag,
                {
                    onClick: () => history.push(to),
                    ...restProps
                } as Attributes,
                children
            );
        }
    }

    const refresh = listState.refresh || (() => true);
    let { confirmText, loadingText, successText } = tipInfo;

    confirmText = confirmText || (children ? `确定要${children}？` : '');
    loadingText = loadingText || (children ? `${children}中...` : '');
    successText = successText || (children ? `${children}成功` : '');

    const update = async (modalData?: any, clickCallback?: () => void) => {
        if (typeof onClick === 'function') {
            loadingText && Spin.show(loadingText);
            try {
                await onClick(modalData);
            } finally {
                Spin.hide();
            }
            clickCallback && clickCallback();
            await refresh();
            successText && message.success(successText);
        }
    };
    const handleClick = async () => {
        if (typeof modal === 'function') {
            // modal优先级最高，有值且是函数（组件）时使用

            if (typeof onShowModalBefore === 'function') {
                Spin.show('打开模态框中...');
                try {
                    const res = await onShowModalBefore();

                    if (res === false) {
                        return;
                    }
                } finally {
                    Spin.hide();
                }
            }

            const className = 'table-operation-modal';
            let container = document.querySelector(`.${className}`);

            if (!container) {
                container = document.createElement('div');

                container.className = className;
                top.document.body.appendChild(container);
            }

            ReactDOM.render(
                createElement(modal as FC, {
                    onConfirm: async (modalData: any) => {
                        await update(modalData, () => {
                            ReactDOM.unmountComponentAtNode(container!);
                        });
                    },
                    onClose: () => ReactDOM.unmountComponentAtNode(container!),
                    ...modalProps
                } as Attributes),
                container
            );
        } else if (confirm && confirmText) {
            // confirm有值且含有提示文本时使用，有默认确认框，也可以传入自己的确认框
            try {
                const fn = typeof confirm === 'function' ? confirm : defaultConfirmFn;
                const rs = await fn(confirmText);

                // 返回 'cancel' (点了取消)不做任何操作
                if (rs === 'cancel') return;
                update(rs);
            } catch (e) {
                // 有些弹窗方法点击取消是调用 reject
            }
        } else {
            update();
        }
    };

    return React.createElement(tag, { onClick: handleClick, ...restProps } as Attributes, children);
};

Action.displayName = 'Action';

Action.Button = props => <Action tag={Button} bsStyle="primary" {...props} />;
Action.Button.displayName = 'ActionButton';

Action.Query = Query;
Action.Reset = Reset;
