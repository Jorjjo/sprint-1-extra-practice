import { RootStoreType } from 'store/store';

export const selectUsersCount = (state: RootStoreType): number =>
    state.userCount.count;
