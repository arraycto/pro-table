import { useState, useReducer } from 'react';
import { FormState } from '../components/Form/shareFormAdapter';
import { IFormState } from '../types';

/** hook 的方式获取 formState */
export function useFormState (initData = {}): IFormState {
    // update 强制重新渲染方法
    const [, update] = useReducer((n: number) => (n + 1) % 1e6, 0);

    // 创建 formState 对象
    const [formState, setFormState] = useState<IFormState>(() => (
        new FormState(initData, (nextState: IFormState) => {
            setFormState(nextState);
            // 这边需要手动重新渲染，否则某种视图不更新
            update();
        })
    ));

    return formState;
}
