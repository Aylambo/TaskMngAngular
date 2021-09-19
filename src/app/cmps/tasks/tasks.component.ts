import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { TaskService } from '../../services/task.service';
import { LoadTasks, RemoveTask, SaveTask, LoadTask } from 'src/app/store/actions/task.actions';
import { Task } from 'src/app/model/Task'
import {Store} from '@ngrx/store'
import { State } from 'src/app/store/store';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  
  tasks$: Observable<Task[]>;
  task$: Observable<Task | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;
  addingNew = false;
  filterBy: string = ''
  taskService: any;
  tasks: any;


  constructor( private store: Store<State>) { 
    this.tasks$ = this.store.select('taskState').pipe(pluck('tasks'));
    this.task$ = this.store.select('taskState').pipe(pluck('task'));
    this.isLoading$ = this.store.select('taskState').pipe(pluck('isLoading'));
    this.error$ = this.store.select('taskState').pipe(pluck('error'));
  }

  ngOnInit(): void {
    // this.taskService.query().subscribe((tasks) => { this.tasks = tasks })
    this.store.dispatch(new LoadTasks(this.filterBy))
  }

  removeTask(taskId: string) {
    // console.log('waka', taskId)
    console.log('itemApp: dispatching remove', taskId);

    // this.taskService.removeTesk(taskId).subscribe(() => {
    //   this.tasks$ = this.tasks$.filter((task) => task.id !== taskId)
    // })
    this.store.dispatch(new RemoveTask(taskId))
    
  }
  
  toggleReminder(task: Task) {
    task.reminder = !task.reminder
    this.taskService.updateTaskRemider(task).subscribe()
    // this.store.dispatch(new LoadTask())
  }
  
  // addTask(task: Task) {
  //   // console.log(task)
  //   this.store.dispatch(new SaveTask(task))
  //   // this.taskService.addTask(task).subscribe((task) => (this.tasks.push(task)))
  // }

  editTask(taskId: string) {
    this.store.dispatch(new LoadTask(taskId))
  }


}
