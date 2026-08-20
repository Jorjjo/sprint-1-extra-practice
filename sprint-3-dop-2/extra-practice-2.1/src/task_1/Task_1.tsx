import { ChangeEvent, FC, useState } from 'react';

const CONTAINER_STYLES = { display: 'flex', flexDirection: 'column', gap: 10 };

export const Task_1 = () => {
    console.log('task_1');
    return (
        <div style={{ ...CONTAINER_STYLES } as any}>
            <Input />
            <Title title='Я title' />
        </div>
    );
};

const Title = (props: { title: string }) => {
    console.log('Title');
    return <h3>{props.title}</h3>;
};

const Input: FC = () => {
    const [value, setValue] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };
    return (
        <input
            type='text'
            placeholder='Placeholder'
            value={value}
            onChange={handleInputChange}
        />
    );
};
