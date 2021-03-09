# API

## 组件

### ProTable

| 属性名            | 类型                         | 默认值    | 属性说明                                                     |
| ----------------- | ---------------------------- | --------- | ------------------------------------------------------------ |
| initData          | object                       | {}        | 初始数据                                                     |
| tabsField         | string                       | undefined | 标签绑定的数据字段                                           |
| listState         | ListState                    |           | share/list 状态，具体查看 [useList](http://192.168.0.62:4002/share-list/api.html#uselist) |
| formState         | FormState                    |           | share/form 状态，具体查看 [FormState](http://192.168.0.62:4002/share-form/api/api-shareui#formstate-%E8%A1%A8%E5%8D%95%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1) |
| dataToFormData    | (data: object) => object     | v => v    | 表格数据转为表单数据，一般不自己实现，由 pt 获取                 |
| formDataToData    | (formData: object) => object | v => v    | 表单数据转为表格数据，一般不自己实现，由 pt 获取                 |
| willClearEmptyField | boolean                      | true      | 是否清除空数据字段                                           |

### Form

无属性

#### FormItem

| 属性名         | 类型                                        | 默认值 | 属性说明                               |
| -------------- | ------------------------------------------- | ------ | -------------------------------------- |
| label          | string \| null                              | null   | 表单前面的文本，为 null 时不显示       |
| field          | string \| boolean                           | true   | 表单数据绑定的字段，布尔值时不绑定数据 |
| col            | string \| number                            | '4'    | 栅格化系统所占的格数，一共12格         |
| labelClassName | string                                      |        | label className                        |
| labelStyle     | object                                      |        | label style                            |
| tip            | string                                      |        | 帮助提示文本，位于表单后面问号         |
| unit           | string                                      |        | 单位文本                               |
| unitClassName  | string                                      |        | 单位区域的 className                   |

#### Input

[FormItem](#FormItem) 所有属性都适用

| 属性名 | 类型   | 默认值 | 属性说明                                                     |
| ------ | ------ | ------ | ------------------------------------------------------------ |
| type   | string | 'text' | 在 [原生 type](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input) 的基础上，重写了 `search` 值，在输入框后面添加搜索按钮，和回车自带搜索功能 |

#### 其他表单控件

[FormItem](#FormItem) 所有属性都适用，其他属性查看 @share/shareui 文档

[Radio](http://192.168.0.62:4002/shareui/styleguide/index.html#/%E6%95%B0%E6%8D%AE%E5%BD%95%E5%85%A5/Radio)、[RadioGroup](http://192.168.0.62:4002/shareui/styleguide/index.html#/%E6%95%B0%E6%8D%AE%E5%BD%95%E5%85%A5/RadioGroup)、[Calendar](http://192.168.0.62:4002/shareui/styleguide/index.html#/%E6%95%B0%E6%8D%AE%E5%BD%95%E5%85%A5/Calendar)、[CalendarRange](http://192.168.0.62:4002/shareui/styleguide/index.html#/%E6%95%B0%E6%8D%AE%E5%BD%95%E5%85%A5/CalendarRange)、[Checkbox](http://192.168.0.62:4002/shareui/styleguide/index.html#/%E6%95%B0%E6%8D%AE%E5%BD%95%E5%85%A5/Checkbox)、[CheckboxGroup](http://192.168.0.62:4002/shareui/styleguide/index.html#/%E6%95%B0%E6%8D%AE%E5%BD%95%E5%85%A5/CheckboxGroup)、[Select](http://192.168.0.62:4002/shareui/styleguide/index.html#/%E6%95%B0%E6%8D%AE%E5%BD%95%E5%85%A5/Select)、[Textarea](http://192.168.0.62:4002/shareui/styleguide/index.html#/%E6%95%B0%E6%8D%AE%E5%BD%95%E5%85%A5/Textarea)

### Table

无需传属性，但也可以传其他属性，参考 `@share/list` 的 [ShareList](http://192.168.0.62:4002/share-list/api.html#sharlist%E7%BB%84%E4%BB%B6) 的属性一致。

#### 列组件

关于列组件文档可以参考 @share/list 的 [Column](http://192.168.0.62:4002/share-list/api.html#column%E7%BB%84%E4%BB%B6) 、[NumberColumn](http://192.168.0.62:4002/share-list/api.html#numbercolumn)、[CheckColumn](http://192.168.0.62:4002/share-list/api.html#checkcolumn)


#### ActionColumn

这个与 @share/list 的 `ActionColumn` 不同，更像是 `Column` ，只是设置了一些默认值和默认样式。

| 属性名  | 类型                                        | 默认值    | 属性说明                             |
| ------- | ------------------------------------------- | --------- | ------------------------------------ |
| label   | ReactNode                                   | '操作'    | 表头名称                             |
| field   | string                                      | '_action' | 字段名                               |

#### Caption

无属性

#### Caption.Title

无属性

#### Caption.Description

无属性

#### Caption.Extra

无属性

### Tabs

| 属性名         | 类型                               | 默认值 | 属性说明                   |
| -------------- | ---------------------------------- | ------ | -------------------------- |
| options        | { label: string, value: string }[] | []     | 选项数据                   |
| resetForm    | boolean                            | true   | 切换标签时是否重置表单     |
| refreshTable | boolean                            | true   | 切换标签时是否刷新表格数据 |

### Action

| 属性名            | 类型                                                         | 默认值                                                       | 属性说明                                                     |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| tag               | string\|React.FC                                             | 'a'                                                          | 标签名或组件名                                               |
| to                | string \| LocationState                                      |                                                              | 跳转地址                                                     |
| tipInfo           | {<br />  confirmText?: string,<br />  loadingText?: string,<br />  successText?: string<br />} | {<br />  confirmText: \`确定要${children}\`,<br />  loadingText: \`${children}中\`,<br />  successText: \`${children}成功\`<br />} | 提示文本。<br />confirmText 二次确认文本<br />loadingText 加载中文本<br />successText 操作成功文本 |
| confirm           | boolean \| (*msg*: string) => Promise<undefined \| 'ok' \| 'cancel'> | false                                                        | 是否需要二次确认，传函数时表示自定义弹窗方法                 |
| modal             | ReactNode                                                    |                                                              | 模态框组件                                                   |
| modalProps        | Omit<Record<string, any>, 'onConfirm' \| 'onClose'>          | {}                                                           | 传入模态框组件额外属性                                       |
| onShowModalBefore | () => boolean \| undefined \| Promise<boolean \| void>       |                                                              | 模态框弹出前触发的事件，若事件函数返回 false或者Promise 的 resolve 值是 false，则模态框不弹出 |
| onClick           | (*modalData*: any) => any                                    |                                                              | 操作最终执行的事件函数                                       |

## 方法

### usePT

也可以用全称 `useProTable`

基于 @share/list 的 [useList](http://192.168.0.62:4002/share-list/api.html#uselist) 做的扩展。

用法：

```js
import { usePT } from '@share/pro-table';

usePT({
    initData: {},
    dataSource: [],
    // ...
});
```

入参：

| 属性名   | 类型   | 默认值 | 属性说明                             |
| -------- | ------ | ------ | ------------------------------------ |
| initData | object | {}     | 初始数据 |
| initPage | object |        | 初始分页信息 |
| initSort | object |        | 初始排序信息 |
| tabsField | string |        | 标签绑定的数据字段 |
| mapField | object |        | 映射字段配置，具体查看 [mapField](#mapField) |
| willClearEmptyField | boolean                      | true      | 是否清除空数据字段   |
| autoLoad | boolean |        | 重置 useList 的 autoLoad，这边只能传 true 和 false，为 true 时取 initData、initPage、initSort 的值组合 |

出参：

| 属性名   | 类型   | 属性说明                             |
| -------- | ------ | ------------------------------------ |
| initData | object | 初始数据 |
| tabsField | string | 标签绑定的数据字段 |
| tabsValue | string \| number | 标签对应的字段值 |
| dataToFormData    | (data: object) => object     | 表格数据转为表单数据 |
| formDataToData    | (formData: object) => object | 表单数据转为表格数据 |
| willClearEmptyField | boolean                      | 是否清除空数据字段   |
| listState | ListState | share/list 状态，具体查看 [useList](http://192.168.0.62:4002/share-list/api.html#uselist) |
| formState | FormState | share/form 状态，具体查看 [FormState](http://192.168.0.62:4002/share-form/api/api-shareui#formstate-%E8%A1%A8%E5%8D%95%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1) |
| refresh | () => Promise<void> | 刷新方法 |
| query | () => Promise<void> | 查询方法 |
| reset | () => Promise<void> | 重置方法 |
| tabsSwitch | (newValue: string \| number, resetForm?: boolean, refreshTable?: boolean) => Promise<void> | 切换标签方法 |

### usePTContext

只能在被 `<ProTable>` 包裹的组件内使用

用法：

```js
import { usePT } from '@share/pro-table';

const ptContext = usePTContext();
```

入参：

无

出参：

| 属性名   | 类型   | 属性说明                             |
| -------- | ------ | ------------------------------------ |
| initData | object | 初始数据 |
| tabsField | string | 标签绑定的数据字段 |
| dataToFormData    | (data: object) => object     | 表格数据转为表单数据 |
| formDataToData    | (formData: object) => object | 表单数据转为表格数据 |
| willClearEmptyField | boolean                      | 是否清除空数据字段   |
| listState | ListState | share/list 状态，具体查看 [useList](http://192.168.0.62:4002/share-list/api.html#uselist) |
| formState | FormState | share/form 状态，具体查看 [FormState](http://192.168.0.62:4002/share-form/api/api-shareui#formstate-%E8%A1%A8%E5%8D%95%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1) |

### clearEmptyField

清除空数据字段，参见 [数据格式转化](#数据格式转化) 章节里的 [clearEmptyField](#clearEmptyField)

用法：

```js
import { clearEmptyField } from '@share/pro-table';

const data = clearEmptyField({
    a: '',
    b: [],
    c: {},
    d: {
        e: '',
        f: []
    },
    g: { i: '1' }
})
// data === { i: '1' }
```

### useFormState

获取 `FormState` 的 Hook 方法。

用法：

```js
import { clearEmptyField } from '@share/pro-table';

const formState = useFormState({
    name: '',
    company: '',
    // ...
})
```

入参：

表单初始数据

出参：

具体查看 [FormState](http://192.168.0.62:4002/share-form/api/api-shareui#formstate-%E8%A1%A8%E5%8D%95%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1)

### message

仿 antd 的 `message` 实现的轻提示。

用法：

```js
import { message } from '@share/pro-table';

message.success('成功');
message.error('异常');
message.warn('警告');
message.info('信息');
```

一共四个方法，语法都一样：

```ts
message.success(msg: string, duration?: number = 3000): void
```
