import { Injectable } from '@angular/core';
import {Observable, of, from} from 'rxjs'
import {TASKS} from '../mock-tasks'
import {Task} from '../model/Task'
import { storageService } from './async-storage.service';


const ENTITY = 'task'
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { 
    const tasks = JSON.parse(localStorage.getItem(ENTITY) || 'null');
    if (!tasks || tasks.length === 0) {
      // console.log('BUU');
      localStorage.setItem(ENTITY, JSON.stringify(TASKS))
    }
  }

  query(filterBy = '') {
    // this.store.dispatch(new LoadingTasks());
    // console.log('TaskService: Return Tasks ===> effect');
    return from(storageService.query(ENTITY) as unknown as Promise<Task[]>)
    // return new Observable((observer) => observer.next(tasks));
  }
  removeTesk(taskId: string): Observable<Boolean> {
    return from(storageService.remove(ENTITY, taskId))
  }

  updateTaskRemider(task:  Task): Observable<Task> {
    return from(storageService.put(ENTITY, task))

  }

  addTask(task: Task): Observable<Task> {
    return from(storageService.post(ENTITY, task))
  }

  getById(taskId: string): Observable<Task> {
    console.log('TaskService: Return Task ===> effect');
    return from(storageService.get(ENTITY, taskId) as Promise<Task>)
  }
  remove(taskId: string): Observable<boolean> {
    console.log('TaskService: Removing Tasks ===> effect');
    return from(storageService.remove(ENTITY, taskId))
  }


  save(task: Task): Observable<Task> {
    const method = (task.id) ? 'put' : 'post'
    const prmSavedTask = storageService[method](ENTITY, task)
    console.log('TaskService: Saving Task ===> effect');
    return from(prmSavedTask) as Observable<Task>
  }

  // private createTasks(): Task[] {
  //   return ['Vue', 'Angular', 'React', 'Redux', 'NGRX', 'Vuex']
  //     .map(txt => ({id: storageService.makeId(), txt}))
  // }
  // get emptyTask(): Task {
  //   return {
  //     id: '',
  //     txt: ''
  //   }
  // }

  
}
