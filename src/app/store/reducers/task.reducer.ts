import { SET_LOADING, LOADED_TASKS, REMOVED_TASK, ADDED_TASK, UPDATED_TASK, LOADED_TASK, SET_ERROR } from '../actions/task.actions';
import { Task } from 'src/app/model/Task';

export interface TaskState {
  tasks: Task[];
  task: Task | null;
  isLoading: boolean;
  error: string;
}

const initialState: TaskState = {
  tasks: [],
  task: null,
  isLoading: false,
  error: ''
};

export function reducer(state: TaskState = initialState, action: any): TaskState {
  switch (action.type) {
    case SET_LOADING: {
      const { isLoading } = action;
      console.log(`Reducer: Setting isLoading to ${isLoading}`);
      return { ...state, isLoading, error: '' };
    } case SET_ERROR: {
      const { error } = action;
      console.log(`Reducer: Setting task error`, error);
      return { ...state, error, isLoading: false };
    } case LOADED_TASKS: {
      const { tasks } = action;
      console.log(`Reducer: Setting loaded tasks (${tasks.length}) tasks`);
      return { ...state, tasks, isLoading: false, error: '' };
    } case LOADED_TASK: {
      const { task } = action;
      console.log(`Reducer: Setting loaded task ${task.id}`);
      return { ...state, task, error: '' };
    } case REMOVED_TASK: {
      const { taskId } = action;
      console.log('Reducer: Removing task:', taskId);
      const tasks = state.tasks.filter(task => task.id !== taskId)
      return { ...state, tasks, error: '' };
    } case ADDED_TASK: {
      const { task } = action;
      console.log('Reducer: Adding task:', task);
      const tasks = [...state.tasks, task]
      return { ...state, tasks, error: '' };
    } case UPDATED_TASK: {
      const { task } = action;
      console.log('Reducer: Updating task:', task);
      const tasks = state.tasks.map(currTask => (currTask.id === task.id) ? task : currTask)
      return { ...state, tasks, task: null, error: '' };
    } default:
      return state;
  }
}
