import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType, todolistsType } from './App';

type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PropsType = {
    todolist: todolistsType;
    tasks: Array<TaskType>;
    removeTask: (taskId: string, todolistId: string) => void;
    changeFilter: (filter: FilterValuesType, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    changeTaskStatus: (
        taskId: string,
        isDone: boolean,
        todolistId: string,
    ) => void;
};

export const Todolist = (props: PropsType) => {
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null);

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim(), props.todolist.id);
            setTitle('');
        } else {
            setError('Title is required');
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    };

    const onAllClickHandler = () =>
        props.changeFilter('all', props.todolist.id);
    const onActiveClickHandler = () =>
        props.changeFilter('active', props.todolist.id);
    const onCompletedClickHandler = () =>
        props.changeFilter('completed', props.todolist.id);

    return (
        <div>
            <h3>{props.todolist.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((t) => {
                    const onClickHandler = () =>
                        props.removeTask(t.id, props.todolist.id);
                    const onChangeHandler = (
                        e: ChangeEvent<HTMLInputElement>,
                    ) => {
                        props.changeTaskStatus(
                            t.id,
                            e.currentTarget.checked,
                            props.todolist.id,
                        );
                    };

                    return (
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input
                                type='checkbox'
                                onChange={onChangeHandler}
                                checked={t.isDone}
                            />
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    );
                })}
            </ul>
            <div>
                <button
                    className={
                        props.todolist.filter === 'all' ? 'active-filter' : ''
                    }
                    onClick={onAllClickHandler}
                >
                    All
                </button>
                <button
                    className={
                        props.todolist.filter === 'active'
                            ? 'active-filter'
                            : ''
                    }
                    onClick={onActiveClickHandler}
                >
                    Active
                </button>
                <button
                    className={
                        props.todolist.filter === 'completed'
                            ? 'active-filter'
                            : ''
                    }
                    onClick={onCompletedClickHandler}
                >
                    Completed
                </button>
            </div>
        </div>
    );
};
