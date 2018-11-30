import {Component, Input, OnInit} from '@angular/core';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  sendToShoppingList() {
    this.recipeService.addIngredientsToShList(this.recipe.ingredients);
  }
}
