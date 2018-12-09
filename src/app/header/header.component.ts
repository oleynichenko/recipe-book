import {Component} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService) {}

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe((response: Response) => {
      }, (error: Error) => {
        console.log('Can not connect to server');
      });
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }
}
