import { FC, createElement } from 'react';
import { Button } from '@share/shareui';
import { reset } from '../../../utils/operation';
import { usePTContext } from '../../../context';

export const Reset: FC<{ tag?: string | React.FC }> = ({ tag = Button, children = '重置', ...restProps }) => {
    const PTContext = usePTContext();

    return (
        createElement(
            tag,
            {
                onClick: () => reset(PTContext),
                ...restProps
            },
            children
        )
    );
};

Reset.displayName = 'ActionReset';

export default Reset;
