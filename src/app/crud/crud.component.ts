import { Component, OnInit } from '@angular/core';

//Create Class for the Recipe Data
class recipeData {
  constructor(
    public recipeType: string = '',
    public recipeName: string = '',
    public recipeIngredients: string = '',
    public recipeSteps: string = ''
  ) { }
}

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})

export class CrudComponent implements OnInit {
  //recipetypes.json
  recipeTypes: { [key: number]: string } = {
    1: 'Vegetarian',
    2: 'Fast Food',
    3: 'Healthy',
    4: 'No-Cook',
    5: 'Make Ahead'
  };

  //Maintain the list of RecipeData
  recipeDataList: recipeData[] = [];

  //Maintain RecipeData Model
  recipeDataModel: recipeData;

  //Maintain RecipeData form display status. Set default to false
  showRecipeData: Boolean = false;

  //Maintain RecipeDataDetail table display. Set default to false
  showDetailRecipeData: Boolean = false;

  //Save or Update Operation
  submitRecipeData: string = 'Save';

  //Maintain table row index based on selection
  selectedRow: number;

  constructor() {
    //Add Default Data (complying with recipetypes.json)
    this.recipeDataList.push(new recipeData(this.recipeTypes[1], 'Vegetable Tortilla Soup', 'Vegetable Oil, Avocado, Pepper, Garlic, Tomatoes, Tortilla Chips, Cheese', '1. Heat the oil in a large pot over medium heat. Stir in the pepper and onion stir fry mix, garlic, and cumin, and cook 5 minutes, until vegetables are tender. Mix in the tomatoes and chile peppers. Pour in the broth, and season with salt and pepper. Bring to a boil, reduce heat to low, and simmer 30 minutes. 2. Mix corn into the soup, and continue cooking 5 minutes. Serve in bowls over equal amounts of tortilla chips. Top with cheese and avocado.'));
    this.recipeDataList.push(new recipeData(this.recipeTypes[2], 'Burger', 'Egg, Onion, Salt, Bread, Salt, Beef', '1. Preheat an outdoor grill for high heat and lightly oil grate. 2. In a medium bowl, whisk together egg, salt and pepper. Place ground beef and bread crumbs into the mixture. With hands or a fork, mix until well blended. Form into 4 patties approximately 3/4 inch thick. 3. Place patties on the prepared grill. Cover and cook 6 to 8 minutes per side, or to desired doneness.'));
    this.recipeDataList.push(new recipeData(this.recipeTypes[3], 'Basic Chicken Salad', 'Mayonnaise, Lemon Juice, Black Pepper, Chicken Meat, Slivered Almonds, Celery', '1. Place almonds in a frying pan. Toast over medium-high heat, shaking frequently. Watch carefully, as they burn easily. 2. In a medium bowl, mix together mayonnaise, lemon juice, and pepper. Toss with chicken, almonds, and celery.'));
  }

  ngOnInit() {
  }

  //Method associate to New Recipe Data Button
  onNew() {
    //Initiate new Recipe Data
    this.recipeDataModel = new recipeData();
    //Change submitRecipeData to 'Save'
    this.submitRecipeData = 'Save';
    //Display form entry section
    this.showRecipeData = true;
  }

  //Method associate to Save Recipe Data
  onSave() {
    if (this.submitRecipeData === 'Save') {
      //Perform Form Validation
      if (this.recipeDataModel.recipeType === "") {
        window.alert("Please Select Recipe Type!");
      } else if (this.recipeDataModel.recipeName === "") {
        window.alert("Please Insert Recipe Name!");
      } else if (this.recipeDataModel.recipeIngredients === "") {
        window.alert("Please Insert Recipe Ingredients!");
      } else if (this.recipeDataModel.recipeSteps === "") {
        window.alert("Please Insert Recipe Steps!");
      } else {
        //Push the model object to recipeDataList
        this.recipeDataList.push(this.recipeDataModel);
      }
    } else {
      //Update the existing properties values based on the model
      this.recipeDataList[this.selectedRow].recipeType = this.recipeDataModel.recipeType;
      this.recipeDataList[this.selectedRow].recipeName = this.recipeDataModel.recipeName;
      this.recipeDataList[this.selectedRow].recipeIngredients = this.recipeDataModel.recipeIngredients;
      this.recipeDataList[this.selectedRow].recipeSteps = this.recipeDataModel.recipeSteps;
    }
    //Hide form entry section
    this.showRecipeData = false;
  }

  //Method associate with the Edit Button
  onEdit(index: number) {
    //Assign selected table row index
    this.selectedRow = index;
    //Initiate new recipeData
    this.recipeDataModel = new recipeData();
    //Retrieve selected recipeData from list and assign to model
    this.recipeDataModel = Object.assign({}, this.recipeDataList[this.selectedRow]);
    //Change submitRecipeData  to Update
    this.submitRecipeData = 'Update';
    //Display form entry section
    this.showRecipeData = true;
  }

  //Method associate with the Delete Button
  onDelete(index: number) {
    //Delete the corresponding recipeData from the list
    this.recipeDataList.splice(index, 1);
  }

  //Method associate with Cancel Button
  onCancel() {
    //Hide form entry section
    this.showRecipeData = false;
  }

  //Method associate with View Button
  onView(index: number) {
    //Assign selected table row index
    this.selectedRow = index;
    //Initiate new recipeData
    this.recipeDataModel = new recipeData();
    //Retrieve selected recipeData from list and assign to model
    this.recipeDataModel = Object.assign({}, this.recipeDataList[this.selectedRow]);
    //Display form entry section
    this.showRecipeData = false;
    //Dsiplay Recipe Detail
    this.showDetailRecipeData = true;
  }

  //Method associate with Back to Index Button
  resetView(){
    window.location.reload();
  }

  //Method associate with Dropdown
  onSelect(val) {
    // console.log(val);
    this.recipeDataList.filter(x => x.recipeType == val)
    //Display form entry section
    this.showRecipeData = false;
  }

  //Method associate to Bootstrap dropdown selection change
  onChangeRecipeType(recipeType: string) {
    //Assign corresponding selected recipeType to model.
    console.log(recipeType);
    this.recipeDataModel.recipeType = recipeType;
  }

}
