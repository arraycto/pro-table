import { AsyncApi, SyncApi } from '@share/list';
import { ReactNode } from 'react';

export interface ValidError {

    /** 当前校验字段 */
    field: string

    /** 校验信息 */
    errorMessage: Error

    /** 校验时机 */
    timing: number

    /** 字段对应的 DOM 元素 */
    element: Element | null | Text
}

export interface IFormState {
    children: ReactNode[]

    getFieldError: (field: string) => any
    getFieldErrors: (fields: string[]) => any
    setValidError: (field:string, message: string) => void

    /** 清除校验信息 */
    cleanValidError: (field?: string) => void

    /** 表单校验 */
    valid: (arg1?: string | Array<string> | number, arg2?: number) => Promise<Array<true | ValidError>>
    validator: any

    /** 获取字段对应的表单属性 */
    getFieldProps: (field: string) => any

    /** 获取字段值 */
    getFieldValue: (field: string | string[] | { [alias: string]: string }) => any

    /** 批量获取字段值 */
    getFieldValues: (fields: string[]) => any

    /** 设置字段值 */
    setFieldValue: (field: string, value: any) => void

    /** 批量设置字段值 */
    setFieldValues: (values: Record<string, any>) => void

    /** 重置表单数据 */
    reset: () => void

    /** 表单初始数据 */
    initData: Record<string, any>

    /** 获取当前表单数据 */
    formData: Record<string, any>

    /** 获取深拷贝后的表单数据 */
    getFormData: () => any

    /** 设置表单数据 */
    setFormData: (formData: any) => void

    /** 获取浅拷贝 formState */
    shallowCopy: () => IFormState

    formDataChange: (e: IFormState) => void
    update: (callback?: () => void) => any
}

export interface IMapField {
    [key: string]: string | IMapField | (() => string)
}
export interface ProTableContext<Condition = any, RowEntity = any> {

    /** 表单 FormState 初始数据 + 表格 autoLoad.data 数据 + Tabs 初始数据 */
    initData: Record<string, any>

    /** Tabs 绑定的字段 */
    tabsField?: string,

    /** tabsField 对应的值 */
    tabsValue: string | number
    formState: IFormState
    listState: AsyncApi<Condition, RowEntity> | SyncApi<Condition, RowEntity>

    /** 查询列表时，是否将查询条件里空的数据清除掉 */
    willClearEmptyField: boolean

    /** 接口数据结构转化为表单数据结构 */
    dataToFormData: (v: Record<string, any>) => Record<string, any>

    /** 表单数据结构转化为表格数据结构 */
    formDataToData: (v: Record<string, any>) => Record<string, any>
}
export type PTContext<Condition = any, RowEntity = any> = ProTableContext<Condition, RowEntity>;

export interface ProTableState<Condition = any, RowEntity = any> extends PTContext<Condition, RowEntity> {
    refresh: () => Promise<void>
    query: () => Promise<void>
    reset: () => Promise<void>
    tabsSwitch: (newValue: string | number, resetForm?: boolean, refreshTable?: boolean) => Promise<void>
}
export type PTState<Condition = any, RowEntity = any> = ProTableState<Condition, RowEntity>
