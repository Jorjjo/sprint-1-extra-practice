import { FC, memo, useCallback, useState } from 'react';

const FIRST_BUTTON_BACKGROUND = { background: 'tomato' };
const CONTAINER_STYLES = { display: 'flex', flexDirection: 'column', gap: 10 };
const BUTTON_STYLES = {
    border: 'none',
    outline: 'none',
    color: 'white',
    borderRadius: 5,
};

export const Task_2 = () => {
    const [firstCount, setFirstCount] = useState(0);

    const handlePlusCountValueClick = useCallback(
        () => setFirstCount((prevFirstCount) => prevFirstCount + 1),
        [],
    );

    return (
        <div style={{ ...CONTAINER_STYLES } as any}>
            <div>{`Счётчик равен: ${firstCount}`}</div>
            <Button onPlusCountValueClick={handlePlusCountValueClick} />
            <Checkbox />
        </div>
    );
};

export const Button: FC<{ onPlusCountValueClick: () => void }> = memo(
    ({ onPlusCountValueClick }) => {
        console.log('button');

        return (
            <div>
                <button
                    style={{ ...FIRST_BUTTON_BACKGROUND, ...BUTTON_STYLES }}
                    onClick={onPlusCountValueClick}
                >
                    Plus first counter
                </button>
            </div>
        );
    },
);

export const Checkbox: FC = memo(() => {
    const [isChecked, setIsChecked] = useState(false);

    const onSetIsChecked = () => setIsChecked((prev) => !prev);
    console.log('checkBox', isChecked);
    return (
        <input type='checkbox' checked={isChecked} onChange={onSetIsChecked} />
    );
});
