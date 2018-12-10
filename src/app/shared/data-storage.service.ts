import {Injectable} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  storageUrl = 'https://recipe-1650c.firebaseio.com/recipes.json?auth=';

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) { }

  storeRecipes() {
    const url = this._getUrl();
    const recipes = this.recipeService.getRecipes();

    return this.http.put(url, recipes);
  }

  getRecipes() {
    const url = this._getUrl();

    this.http.get(url).pipe(
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

  private _getUrl(): string {
    const token = this.authService.getToken();
    return this.storageUrl + token;
  }
}
