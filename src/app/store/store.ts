import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as taskModule from './reducers/task.reducer';

import { environment } from '../../environments/environment';

export interface State {
  taskState: taskModule.TaskState;
}

export const reducers: ActionReducerMap<State> = {
  taskState: taskModule.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
