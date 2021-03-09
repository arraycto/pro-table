# 日志

## v1.0.0-beta.5

`2021-03-09`

- refactor: 调整 `example` 里的文件结构和代码，删除没用部分

## v1.0.0-beta.4

`2021-03-09`

- refactor: `isClearEmptyField` 改为 `willClearEmptyField`
- refactor: `isRestForm` 改为 `restForm`
- refactor: `isRefreshTable` 改为 `refreshTable`
- refactor: `<Tabs>` 标签鼠标悬浮时颜色改变
- feat: `usePT` 参数移除 `dataToFormData` 和 `formDataToData`
- feat: `usePT` 参数 `mapField` 的值增加函数的情况
- feat: `usePT` 参数增加 `initPage`、`initSort`，移除 `autoLoad` 对象值的用法

## v1.0.0-beta.3

`2021-03-05`

- refactor: shareFormAdapter 代码与文件结构优化
- refactor: 组件入口导出代码调整

## v1.0.0-beta.2

`2021-03-03`

- refactor: 移除 `<TabCase>` 属性和 `tabCase` 属性，整合样式文件，调整组件组织结构

## v1.0.0-beta.1

`2021-03-02`

- refactor: `<Action>` 里的 `<Query>` 和 `<Reset>` 抽离到单独文件
- refactor: 补充代码注释

## v1.0.0-beta.0

`2021-02-25` 发布 beta 版

## v0.5.3

`2021-02-05`

- refactor: 调整 `<CalendarRange>` 和 `<Calendar>` 的 `format` 默认值

## v0.5.2

`2021-02-03`

- fix: `<Table>` 代码逻辑优化，修复类型问题

## v0.5.1

`2021-02-02`

- refactor: `tabsValue` 从 `PTState` 转移到 `PTContext`, 调整相关代码

## v0.5.0

`2021-02-01`

- docs: 完善 README.md，增加 code-template-config.md 文档
- feat: `PTState` 增加 `tabsValue` 属性
- feat: 增加 `fakeRequest`
- fix: 修复部分类型问题，调整导出成员

## v0.4.9

`2021-01-28`

- refactor: 重构 `mapField` 相关代码逻辑

## v0.4.8

`2021-01-26`

- chore: 调整 rollup 配置，调整构建目录结构
- refactor: 调整类型名称，补充 `FormState` 类型
- feat: `formState` 状态改为同步获取，初始就有值，导出 `useFormState`
- refactor: 修改 `<Input>` 的 `displayName`

## v0.4.7

`2021-01-25`

- chore: 去除 react-router 依赖，调整 package.json 依赖
- fix: 解决 `mapField` 初始化时无效问题
- fix: 解决 `<Table>` 子元素是数组遍历时报错

## v0.4.6

`2021-01-20`

- chore: 升级 @share/form, 调整 package.json 依赖

## v0.4.5

`2021-01-13`

- docs: 调整 README.md 文档，调整 package.json 依赖

## v0.4.4

`2021-01-12`

- docs: 加入 README.md 文档

## v0.4.3

`2021-01-12`

- feat: 调整 `tabsSwitch` 方法的默认值
- fix: 部分 `<a>` 鼠标没有手型，`<Tabs>` 鼠标没有手型

## v0.4.2

`2021-01-12`

- feat: `usePT` 返回值加入 `tabsSwitch` 方法，调整 `<Tabs>` 组件

## v0.4.1

`2021-01-11`

- refactor: `<ProTable>` 属性值改成只有 `listState`、`formState` 是必填

## v0.4.0

`2021-01-09`

- feat: 新增 `message` 对象
- feat: 增加 `usePTContext` 方法
- feat: `initData` 数据合并到 `autoLoad` 的 `requestData` 里
- refactor: 移除 react-use 依赖，调整相关代码
- refactor: 移除 classnames 依赖，调整相关代码
- refactor: 移除 antd 依赖，优化 form 适配
- refactor: `PTContext` 里的 `tabs` 属性名变更为 `tabsField`

## v0.3.1

`2021-01-06`

- fix: 修复 ts 类型问题

## v0.3.0

`2021-01-05`

- feat: `<Action>` 增加 `onShowModalBefore` 属性

## v0.2.2

`2021-01-04`

- fix: 删除打印日志

## v0.2.1

`2021-01-04`

- fix: 在入口文件显式导出所有成员，解决编译器自动导入失败有误的问题

## v0.2.0

`2021-01-04`

- feat: 平铺 `Form` 和 `Table` 相关组件，并移除挂载组件上面的二级组件
- fix: `<FormItem>` 子元素传函数时展示不出来, 函数参数增加属性值 `formState`
- feat: `<Action>` 增加 `modalProps` 属性，用于给 `modal` 组件传额外属性

## v0.1.3

`2020-12-30`

- chore: `peerDependencies` 补充 `@share/shareui-html`
- fix: `<Caption.Extra>` 设置 `className` 会覆盖原有的样式

## v0.1.2

`2020-12-30`

- fix: 没使用 `<Tabs>` 时 `<Form>` 和 `<Table>` 展示不出来

## v0.1.1

`2020-12-28`

- fix: 类型提示失效问题

## v0.1.0

`2020-12-27`

- feat: 第一个版本，改造 `RichTable` ，调整 API
