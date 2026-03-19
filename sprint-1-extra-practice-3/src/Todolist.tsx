import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import { FilterValuesType } from './App';

type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskId: string) => void;
    changeFilter: (value: FilterValuesType) => void;
    addTask: (title: string) => void;
    children: React.ReactNode;
};

export const Todolist = (props: PropsType) => {
    // let [title, setTitle] = useState('');

    // const addTask = () => {
    //     props.addTask(title);
    //     setTitle('');
    // };

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value);
    // };

    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //   if (e.key === 'Enter') {
    //     addTask();
    //   }
    // }

    const inputRef = useRef<HTMLInputElement>(null);
    console.log(inputRef.current?.value);

    const onAllClickHandler = () => props.changeFilter('all');
    const onActiveClickHandler = () => props.changeFilter('active');
    const onCompletedClickHandler = () => props.changeFilter('completed');

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    ref={inputRef}
                    // value={title}
                    // onChange={onChangeHandler}
                    // onKeyPress={onKeyPressHandler}
                />
                <button
                    onClick={() => {
                        if (inputRef.current) {
                            props.addTask(inputRef.current.value);
                            inputRef.current.value = '';
                        }
                    }}
                >
                    +
                </button>
            </div>
            <ul>
                {props.tasks.map((t) => {
                    const onClickHandler = () => props.removeTask(t.id);

                    return (
                        <li key={t.id}>
                            <input type='checkbox' checked={t.isDone} />
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    );
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
            {props.children}
        </div>
    );
};
