import { ChangeEvent, useState, KeyboardEvent } from 'react';
import { FilterValuesType } from './App';

export type TaskType = {
    taskId: string;
    title: string;
    isDone: boolean;
};

type PropsType = {
    todolistId: string;
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskId: string, todolistId: string) => void;
    changeFilter: (payload: {
        filter: FilterValuesType;
        todolistId: string;
    }) => void;
    addTask: (title: string, todolistId: string) => void;
    changeTaskStatus: (payload: {
        taskId: string;
        isDone: boolean;
        todolistId: string;
    }) => void;
    removeTodolist: (id: string) => void;
    filter: FilterValuesType;
};

export const Todolist = (props: PropsType) => {
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null);

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== '') {
            props.addTask(newTitle, props.todolistId);
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

    const removeTodolist = () => props.removeTodolist(props.todolistId);

    const onAllClickHandler = () =>
        props.changeFilter({ filter: 'all', todolistId: props.todolistId });
    const onActiveClickHandler = () =>
        props.changeFilter({ filter: 'active', todolistId: props.todolistId });
    const onCompletedClickHandler = () =>
        props.changeFilter({
            filter: 'completed',
            todolistId: props.todolistId,
        });

    return (
        <div>
            <h3>
                {' '}
                {props.title}
                <button onClick={removeTodolist}>x</button>
            </h3>
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
                        props.removeTask(t.taskId, props.todolistId);
                    const onChangeHandler = (
                        e: ChangeEvent<HTMLInputElement>,
                    ) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus({
                            taskId: t.taskId,
                            isDone: newIsDoneValue,
                            todolistId: props.todolistId,
                        });
                    };

                    return (
                        <li
                            key={t.taskId}
                            className={t.isDone ? 'is-done' : ''}
                        >
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
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}
                >
                    All
                </button>
                <button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}
                >
                    Active
                </button>
                <button
                    className={
                        props.filter === 'completed' ? 'active-filter' : ''
                    }
                    onClick={onCompletedClickHandler}
                >
                    Completed
                </button>
            </div>
        </div>
    );
};
