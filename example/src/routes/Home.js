import React, { Fragment }  from 'react';
import {
    ProTable, usePT, Tabs, Caption, Action,
    Form, Input, FormItem, CalendarRange,
    Table, Column, ActionColumn, FakeRequest
} from '../../..';

const STATUS = { WAIT: '0', PASS: '1', FAIL: '2' };
const fake = new FakeRequest([
    // eslint-disable-next-line max-len
    { id: '01', name: 'aa', company: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', status: STATUS.PASS, statusName: '审批通过', updatedTime: '2020-08-04 10:18' },
    { id: '02', name: 'bb', company: 'bbbbbbb', status: STATUS.FAIL, statusName: '审批不通过', updatedTime: '2020-08-03 10:05' },
    { id: '03', name: 'cc', company: 'ccccccc', status: STATUS.WAIT, statusName: '待审批', updatedTime: '2020-06-02 10:05' },
    { id: '04', name: 'dd', company: 'ddddddd', status: STATUS.WAIT, statusName: '待审批', updatedTime: '2020-05-23 10:05' },
    { id: '05', name: 'ee', company: 'eeeeeee', status: STATUS.WAIT, statusName: '待审批', updatedTime: '2020-05-16 10:05' },
    { id: '06', name: 'ff', company: 'fffffff', status: STATUS.PASS, statusName: '审批通过', updatedTime: '2020-05-15 18:05' },
    { id: '07', name: 'gg', company: 'ggggggg', status: STATUS.FAIL, statusName: '审批不通过', updatedTime: '2020-05-15 10:05' },
    { id: '08', name: 'hh', company: 'hhhhhhh', status: STATUS.FAIL, statusName: '审批不通过', updatedTime: '2020-05-15 10:05' },
    { id: '09', name: 'ii', company: 'iiiiiii', status: STATUS.WAIT, statusName: '待审批', updatedTime: '2020-05-15 10:05' },
    { id: '10', name: 'jj', company: 'jjjjjjj', status: STATUS.WAIT, statusName: '待审批', updatedTime: '2020-05-15 10:05' },
    { id: '11', name: 'kk', company: 'kkkkkkk', status: STATUS.PASS, statusName: '审批通过', updatedTime: '2020-05-15 10:05' },
    { id: '12', name: 'll', company: 'lllllll', status: STATUS.WAIT, statusName: '待审批', updatedTime: '2020-05-15 10:05' },
    { id: '13', name: 'mm', company: 'mmmmmmm', status: STATUS.WAIT, statusName: '待审批', updatedTime: '2020-05-15 10:05' },
    { id: '14', name: 'nn', company: 'nnnnnnn', status: STATUS.FAIL, statusName: '审批不通过', updatedTime: '2020-05-15 10:05' },
])
const statusOptions = [
    { value: '', label: '全部' },
    { value: STATUS.WAIT, label: '待审批' },
    { value: STATUS.PASS, label: '审批通过' },
    { value: STATUS.FAIL, label: '审批不通过' },
];


const Home = () => {
    const pt = usePT({
        tabsField: 'status',
        initData: { name: '', company: '', status: '', updatedTime: { start: '', end: '' } },
        mapField: {
            updatedTime: {
                start: 'createdTimeState',
                end: 'createdTimeEnd',
            }
        },
        dataSource: fake.findData
    });

    return (
        <ProTable {...pt}>
            <Tabs options={statusOptions} />
            
            <Form>
                <Input label="姓名" field="name" />
                <CalendarRange label="更新时间" field="updatedTime" />
                <FormItem>
                    <Action.Query />
                    <Action.Reset />
                </FormItem>
            </Form>

            <Caption>
                <Caption.Title>标题</Caption.Title>
                <Caption.Description>描述</Caption.Description>
                <Caption.Extra>
                    <Action.Button to="/add">新增用户</Action.Button>
                </Caption.Extra>
            </Caption>

            <Table>
                <Column label="姓名" field="name">
                    {(value, row) => <Action to={`/detail?id=${row.id}`}>{value}</Action>}
                </Column>
                <Column label="所在单位" field="company" ellipsis />
                <Column label="审批状态" field="statusName" />
                <Column label="更新时间" field="updatedTime" sort />
                <ActionColumn>
                    {(_, row) => (
                        <Fragment>
                            <Action to={`/edit?id=${row.id}`}>编辑</Action>
                            <Action confirm onClick={() => fake.deleteItem(row.id)}>删除</Action>
                        </Fragment>
                    )}
                </ActionColumn>
            </Table>
        </ProTable>
    );
}

export default Home;
