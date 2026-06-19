import { TodolistType } from '../App';
import { AppRootStateType } from './store';

export const selectTodoList = (state: AppRootStateType): TodolistType[] => {
    return state.todolists;
};
