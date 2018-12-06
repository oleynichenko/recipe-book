import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;

  subscription: Subscription;
  editedItem: Ingredient;
  editedItemIndex: number;
  editMode = false;

  constructor(private shopListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shopListService.startedEditing
      .subscribe((id) => {
        this.editMode = true;
        this.editedItemIndex = id;
        this.editedItem = this.shopListService.getIngredient(id);

        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(slForm: NgForm) {
    const ingName = slForm.value.name;
    const ingAmount = slForm.value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);

    if (this.editMode) {
      this.shopListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shopListService.addIngredient(newIngredient);
    }

    this.editMode = false;
    this.slForm.reset();
  }

  onDelete() {
    this.shopListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }
}
