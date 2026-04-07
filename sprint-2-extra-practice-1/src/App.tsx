import { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';

export type todolistsType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export type FilterValuesType = 'all' | 'active' | 'completed';

export const App = () => {
    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ]);

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false }, // это все list
            { id: v1(), title: 'Rest API', isDone: false },
            { id: v1(), title: 'GraphQL', isDone: false },
        ], //а это все tasks
        [todolistID2]: [
            { id: v1(), title: 'HTML&CSS2', isDone: true },
            { id: v1(), title: 'JS2', isDone: true },
            { id: v1(), title: 'ReactJS2', isDone: false },
            { id: v1(), title: 'Rest API2', isDone: false },
            { id: v1(), title: 'GraphQL2', isDone: false },
        ],
    });

    function removeTask(id: string, todolistId: string) {
        let filteredTasks = tasks[todolistId].filter((t) => t.id != id);
        setTasks({ ...tasks, [todolistId]: filteredTasks });
    }

    function addTask(title: string, todolistId: string) {
        let newTask = { id: v1(), title: title, isDone: false };
        let newTasks = [newTask, ...tasks[todolistId]];
        setTasks({ ...tasks, [todolistId]: newTasks });
    }

    //tasks[todolistId].map вохвращает новый массив '[]'  в котром лежат объекты '{}' task со значениями {id: , title: , isDone: }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const taskToChangeStatus = tasks[todolistId].map((task) => {
            return task.id === taskId ? { ...task, isDone } : task; // isDone: isDone || создаем новый объект в него высыпаем все значения (id, title, isDone)
            // и переприсваеваtм isDone
        });

        setTasks({ ...tasks, [todolistId]: taskToChangeStatus });
    }

    function changeFilter(filter: FilterValuesType, todolistId: string) {
        console.log(todolistId);
        console.log(filter);

        const newTodoList = todolists.map((list) => {
            return list.id === todolistId ? { ...list, filter } : list; //filter: filter
        });
        setTodolists(newTodoList);
    }

    return (
        <div className='App'>
            {todolists.map((list) => {
                let tasksForTodolist = tasks[list.id];

                if (list.filter === 'active') {
                    tasksForTodolist = tasks[list.id].filter(
                        (t) => t.isDone === false,
                    );
                }
                if (list.filter === 'completed') {
                    tasksForTodolist = tasks[list.id].filter(
                        (t) => t.isDone === true,
                    );
                }
                return (
                    <Todolist
                        key={list.id}
                        todolist={list}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                    />
                );
            })}
        </div>
    );
};
