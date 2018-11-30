import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  @Output() pageChanged = new EventEmitter();

  onMenuClick(page) {
    this.pageChanged.emit(page);
  }
}
