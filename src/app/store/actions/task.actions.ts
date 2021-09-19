import { Action } from '@ngrx/store';
import { Task } from 'src/app/model/Task';

export const SET_LOADING = '[task]s loading';
export const SET_ERROR = '[task]s error';
export const LOAD_TASKS = '[task]s load';
export const LOAD_TASK = '[task] load';
export const LOADED_TASK = '[task] loaded';
export const LOADED_TASKS = '[task]s loaded';
export const REMOVE_TASK = '[task] remove';
export const REMOVED_TASK = '[task] removed';
export const SAVE_TASK = '[task] saved';
export const ADDED_TASK = '[task] added';
export const UPDATED_TASK = '[task] updated';

export type TaskAction = LoadTasks | LoadTask | RemoveTask | SaveTask

export class LoadTasks implements Action {
  readonly type = LOAD_TASKS;
  constructor(public filterBy: string = '') {}
}
export class LoadTask implements Action {
  readonly type = LOAD_TASK;
  constructor(public taskId: string = '') {}
}
export class RemoveTask implements Action {
  readonly type = REMOVE_TASK;
  constructor(public taskId: string) {}
}
export class LoadedTasks implements Action {
  readonly type = LOADED_TASKS;
  constructor(public tasks: Task[] = []) {}
}
export class LoadedTask implements Action {
  readonly type = LOADED_TASK;
  constructor(public task: Task) {}
}
export class RemovedTask implements Action {
  readonly type = REMOVED_TASK;
  constructor(public taskId: string) {}
}
export class SaveTask implements Action {
  readonly type = SAVE_TASK;
  constructor(public task: Task) {}
}
export class AddedTask implements Action {
  readonly type = ADDED_TASK;
  constructor(public task: Task) {}
}
export class UpdatedTask implements Action {
  readonly type = UPDATED_TASK;
  constructor(public task: Task) {}
}
export class LoadingTasks implements Action {
  readonly type = SET_LOADING;
  constructor(public isLoading: boolean = true) {}
}
export class TaskError implements Action {
  readonly type = SET_ERROR;
  constructor(public error: string) {}
}

