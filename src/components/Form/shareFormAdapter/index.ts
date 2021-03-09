
// 适配组件由 share/shareui-form 拷贝过来做部分调整修改，后续可能会移除掉，改为直接引用

import { Input } from './Input';
import { Select } from './Select';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';
import { Checkbox } from './Checkbox';
import { CheckboxGroup } from './CheckboxGroup';
import { Calendar } from './Calendar';
import { CalendarRange } from './CalendarRange';
import Row from './Row';
import Form from './Form';

import { adapt } from '@share/form';
import { LayoutView }  from './LayoutView';

const tableQueryAdapt = adapt({
    defNamespace: 'table-query',
    layout: [
        {
            namespace: 'table-query',
            LayoutView,
            Form,
            Row,
        }
    ],
    components: {
        Input, Select, Radio, RadioGroup, Checkbox, CheckboxGroup, Calendar, CalendarRange
    }
});

export default tableQueryAdapt;
export const {
    FormState,
    getComponent,
    getComponents,
    hasComponent,
    mapToViewProps,
    registerComponent,
    registerComponents,
    registerForm,
    registerRow,
    setLayoutView,
} = tableQueryAdapt;
