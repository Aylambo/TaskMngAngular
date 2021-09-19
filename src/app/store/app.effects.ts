import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { TaskService } from '../services/task.service';
import { TaskAction, SAVE_TASK, ADDED_TASK, UPDATED_TASK, LOAD_TASKS, LOADED_TASKS, REMOVE_TASK, REMOVED_TASK, LOAD_TASK, LOADED_TASK, SET_ERROR } from './actions/task.actions';

// Nice way to test error handling? localStorage.clear() after tasks are presented 
@Injectable()
export class AppEffects {

  loadTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOAD_TASKS),
      tap(() => console.log('Effects: load tasks ==> service')),
      switchMap((action) =>
        this.taskService.query(action.filterBy).pipe(
          tap(() => console.log('Effects: Got tasks from service, send it to ===> Reducer')),
          map((tasks) => ({
            type: LOADED_TASKS,
            tasks,
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      )
    );
  });
  loadTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOAD_TASK),
      tap(() => console.log('Effects: load task ==> service')),
      switchMap((action) =>
        this.taskService.getById(action.taskId).pipe(
          tap(() => console.log('Effects: Got task from service ===> Reducer')),
          map((task) => ({
            type: LOADED_TASK,
            task,
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      ),
    );
  });
  removeTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(REMOVE_TASK),
      switchMap((action) =>
        this.taskService.remove(action.taskId).pipe(
          tap(() => console.log('Effects: Task removed by service ===> Reducer')),
          map(() => ({
            type: REMOVED_TASK,
            taskId: action.taskId,
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      ),
    );
  })
  saveTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SAVE_TASK),
      switchMap((action) =>
        this.taskService.save(action.task).pipe(
          tap(() => console.log('Effects: Task saved by service, inform the ===> Reducer')),
          map((savedTask) => ({
            type: (action.task.id) ? UPDATED_TASK : ADDED_TASK,
            task: savedTask,
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })

        )
      )
    );
  })
  constructor(
    private actions$: Actions<TaskAction>,
    private taskService: TaskService
  ) { }
}
