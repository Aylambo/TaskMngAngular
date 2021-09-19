import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import {Task} from 'src/app/model/Task'
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import {TasksComponent} from '../tasks/tasks.component';
import { Subscription } from 'rxjs'
import { UiService } from '../../services/ui.service'



@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task
  @Output() onRemoveTask: EventEmitter<Task> = new EventEmitter()
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter()
  @Output() onEditeTask: EventEmitter<Task> = new EventEmitter()

  showAddTesk: boolean;
  subscription: Subscription;

  faTimes = faTimes;
  faEdit = faEdit;
  constructor(private taskList: TasksComponent, private uiService: UiService ) { }

  ngOnInit(): void {}

  onRemove() {
    this.onRemoveTask.emit()
  }
  onToggle(task) {
    this.onToggleReminder.emit(task)
  }

  onEdit() {
    this.onEditeTask.emit()
  }

  toggleAddTesk() {
    this.uiService.toggleAddTesk()
  }
}
