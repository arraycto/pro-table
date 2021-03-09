# @share/pro-table

## 背景

这是我在厦门畅享信息技术有限公司开发的一个通用组件，组件基于公司内部组件库开发的，只有公司内网才能安装模块，这边只能看代码，不能下载运行，放 Github 是为了记录我做过的一些还可以的项目。

## 示例图片

![示例](./docs/images/example.jpg)

## 功能简介

组件主要用于快速开发带有增、删、改、查功能的简要列表页面。

组件借鉴 antd ProComponent 系列 [ProTable](https://procomponents.ant.design/components/table) 的开发理念，基于 [@share/form@2.x.x](http://192.168.0.62:4002/share-form/) 和 [@share/list@1.x.x](http://192.168.0.62:4002/share-list/) 做了一层逻辑封装和组件扩展。

主要解决的问题：

- 让表单、表格、标签三块内容的逻辑变成一个整体，使其三方的数据和视图表现始终保持一致，让开发者不再为其三者的关联逻辑所困惑，提高代码质量。

- 提供一系列预设行为和逻辑，简化表格和列表的写法，降低开发成本；

## 组件文档

- [快速入门](./docs/quick-start.md)
- [代码模板配置](./docs/code-template-config.md)
- [使用教程](./docs/tutorial.md)
- [API](./docs/api.md)

## 变更记录

请看 [CHANGELOG.md](./CHANGELOG.md)