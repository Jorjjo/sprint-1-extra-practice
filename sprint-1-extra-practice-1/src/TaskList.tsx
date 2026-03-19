type TaskListProps = {
    title: string;
    tasks: Array<Tasks>;
    students: Array<string>;
};

type Tasks = {
    taskId: number;
    title: string;
    isDone: boolean;
};

export const TaskList = (props: TaskListProps) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <ul>
                {props.tasks.map((el) => {
                    return (
                        <li>
                            <span>{el.taskId}</span>
                            <span>{el.title}</span>
                            <span>{el.isDone}</span>
                        </li>
                    );
                })}
            </ul>

            <ul>
                {props.students.map((el) => {
                    return <li>{el}</li>;
                })}
            </ul>
        </div>
    );
};
