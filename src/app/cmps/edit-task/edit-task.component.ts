
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Observable, Subscription } from 'rxjs';
import { Task } from 'src/app/model/Task';
import { State } from 'src/app/store/store';
import { Store } from '@ngrx/store';
import { pluck } from 'rxjs/operators';
import { SaveTask } from 'src/app/store/actions/task.actions';


@Component({
  selector: 'edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  task$: Observable<Task | null>
  task: Task
  @Output() savedTask = new EventEmitter()
  subscription: Subscription | null = null
  showAddTesk: boolean;

  constructor(private store: Store<State>, private uiService: UiService) {
    this.task$ = this.store.select('taskState').pipe(pluck('task'))
    this.subscription = this.uiService.onToggle().subscribe((value) => (this.showAddTesk = value))

  }
  get taskEditState() {
    return (this.task.id) ? 'Update' : 'Add'
  }
  ngOnInit(): void {
    this.subscription = this.task$.subscribe(task => {
      console.log('Got task to edit', task);
      if (task) this.task = JSON.parse(JSON.stringify(task))
      // else this.saved.emit() // This fails due to Angular behavior (problem with the intial emit)
      else this.task = this.getEmptyTask()
    })
  }
  getEmptyTask() {
    return { text: '', day: '', reminder: false }
  }
  saveTask() {
    this.store.dispatch(new SaveTask(this.task))
    console.log('Saving', this.task)
    // TODO: Figure a way to know that saving was done before closing here
    this.savedTask.emit()
    this.uiService.toggleAddTesk()
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}