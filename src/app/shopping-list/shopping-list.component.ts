import {Component, OnDestroy, OnInit} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  subcription: Subscription;

  constructor(private shopListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shopListService.getIngredients();
    this.subcription = this.shopListService.ingredientsChanged.subscribe((ingredients) => this.ingredients = ingredients);
  }

  onEditItem(i) {
    this.shopListService.startedEditing.next(i);
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
