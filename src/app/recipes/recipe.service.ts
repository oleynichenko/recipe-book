import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  // @ts-ignore
  private recipes: Recipe[] = [
    new Recipe(
      'Mexican Burger',
      'Juicy beef mexican cheeseburgers served with homemade, creamy guacamole and fresh pico de gallo is the ultimate weekend treat and perfect for serving a crowd.',
      'https://images.matprat.no/z74n564tu4-jumbotron/xsmall',
      [
        new Ingredient('Beef mince', 1),
        new Ingredient('Ground coriander', 0.5),
        new Ingredient('Ground coriander', 0.5),
      ]
    ),
    new Recipe(
      'Sugar Potato',
      'Cinnamon sugar sweet potato fries with caramel dipping sauce',
      'https://cdn.bluefoot.com/starvin/images/Sweet-Potato-Fries/sweet-potato-caramel-drizzle.png',
      [
        new Ingredient('Salt', 0.05),
        new Ingredient('Potatoes', 2),
        new Ingredient('Sunflower oil', 0.2),
      ]
    )
  ];

  constructor(private shoppingListService:  ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShList(ingredients) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
