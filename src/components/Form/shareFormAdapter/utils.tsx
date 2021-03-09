import React, { Component, FC, ReactNode } from 'react';
import { FormItemProps } from './types';

/** @share/form 摘抄过来的方法 */
export function debounce(
    fn: (...args: any[]) => void,
    wait?: number
): (...args: any[]) => void {
    let timer: number | null = null;

    return (...args) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(...args);
        }, wait);
    };
}


/** @share/form 摘抄过来的方法 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getValueBySelect2Event(e?: any): any {
    if (e === null) {
        return '';
    }
    if (Array.isArray(e)){
        return e;
    }
    if (typeof e === 'object'){
        return e.value;
    }
    return e;
}
interface debounceInputWrapProps extends FormItemProps {
    async?: boolean
    sync?: boolean
}

export function debounceInputWrap(
    ViewComponent: FC<debounceInputWrapProps>,
    waitTime = 800
): ReactNode {
    return class DebounceWrap extends Component<debounceInputWrapProps>{

        state = {
            value: this.props.value,
            async: this.props.async === true,
        };

        componentWillReceiveProps(nextProps: debounceInputWrapProps){
            if (!this.state.async){
                return;
            }
            const { value }  = nextProps;

            if (value !== this.state.value){
                this.setState({ value });
            }
        }

        onChange = (e: { target: { value: any } }) => {
            if (!this.state.async){
                this.props.onChange(e);
                return;
            }
            this.setState({ value: e.target.value });
            this.propsOnChangeWrap(e.target.value);
        };

        getValue = () => {
            if (!this.state.async) return this.props.value;
            return this.state.value;
        };

        propsOnChangeWrap = debounce((value: any) => {
            const { onChange } = this.props;

            onChange({
                target: {
                    value
                }
            });
        }, waitTime);

        render(){
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { sync, async, onChange, value, ...otherProps } = this.props;
            const inputValue = this.getValue();

            /* eslint-disabled-next-line */
            return <ViewComponent {...otherProps} value={inputValue} onChange={this.onChange} />;
        }
    };
}
