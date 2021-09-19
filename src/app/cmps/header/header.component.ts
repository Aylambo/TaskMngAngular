import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service'
import { Subscription } from 'rxjs'
import {Router} from '@angular/router'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title: string = 'Tesk Manager';
  showAddTesk: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService, private router: Router) { 
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTesk = value)
  }

  ngOnInit(): void {
  }
  toggleAddTesk() {
    this.uiService.toggleAddTesk()
  }

  hasRoute(route: string){
    return this.router.url === route;
  }
}
