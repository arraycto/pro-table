import { FC, createElement } from 'react';
import { Button } from '@share/shareui';
import { query } from '../../../utils/operation';
import { usePTContext } from '../../../context';

export const Query: FC<{ tag?: string | React.FC }> = ({ tag = Button, children = '查询', ...restProps }) => {
    const PTContext = usePTContext();

    return (
        createElement(
            tag,
            {
                onClick: () => query(PTContext),
                ...(tag !== Button ? {} : { bsStyle: 'primary' }),
                ...restProps
            },
            children
        )
    );
};

Query.displayName = 'ActionQuery';

export default Query;
