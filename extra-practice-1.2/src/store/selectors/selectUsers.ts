import { UserType } from 'types';
import { RootStoreType } from '../store';

export const selectUsers = (state: RootStoreType): UserType[] =>
    state.usersData.users;
