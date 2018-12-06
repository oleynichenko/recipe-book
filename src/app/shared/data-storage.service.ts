import {Injectable} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Recipe} from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  storageUrl = 'https://recipe-1650c.firebaseio.com/recipes.json';

  constructor(private http: HttpClient,
              private recipeService: RecipeService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    return this.http.put(this.storageUrl, recipes);
  }

  getRecipes() {
    this.http.get(this.storageUrl).pipe(
      map((recipes: Recipe[]) => {
          for (const recipe of recipes) {
            if (!recipe.ingredients) {
              recipe.ingredients = [];
            }
          }

          return recipes;
      })
    )
    .subscribe((recipes) => {
      console.log(recipes);
      this.recipeService.setRecipes(recipes);
    });
  }
}
