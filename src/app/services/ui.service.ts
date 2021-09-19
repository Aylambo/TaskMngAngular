import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddTesk: boolean = false;
  private subject = new Subject<any>();
  constructor() { }

  toggleAddTesk(): void {
    this.showAddTesk = !this.showAddTesk;
    this.subject.next(this.showAddTesk);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
