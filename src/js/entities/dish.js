class Dish {
  constructor(name, description, ingredients, image) {
    this.name = name;
    this.description = description || '';
    this.ingredients = ingredients || [];
    this.image = image || '';
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getDescription() {
    return this.description;
  }

  setDescription(description) {
    this.description = description;
  }

  getIngredients() {
    return this.ingredients;
  }

  setIngredients(ingredients) {
    this.ingredients = ingredients;
  }

  getImage() {
    return this.image;
  }

  setImage(image) {
    this.image = image;
  }

  toString() {
    return 'Dish ' + this.name + ':' + this.description + '. ' + 'Ingredientes: ' + this.ingredients.toString();
  }
}

export {Dish};
