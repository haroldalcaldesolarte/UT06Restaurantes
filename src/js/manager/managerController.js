const MODEL = Symbol('ManagerModel');
const VIEW = Symbol('ManagerView');

class ManagerController{
  constructor(modelManager, viewManager){
    this[MODEL] = modelManager;
    this[VIEW] = viewManager;

    this[VIEW].bindInit(this.handleInit); //dar funcionalidad a un elemento HTML
  }

  onInit = () => {
    this[VIEW].init(this[MODEL].categories, this[MODEL].dishes);
    this[VIEW].showRestaurantsInMenu(this[MODEL].restaurants);
    this[VIEW].bindShowHideOptionRestaurants(this.handleShowOptionRestaurants);
    this[VIEW].bindShowRestaurant(this.handleShowRestaurant);
    this[VIEW].bindDishesOfCategoryList(this.handleShowDishesOfCategory);
    this[VIEW].bindDishesofCategoryAside(this.handleShowDishesOfCategory);
    this[VIEW].bindShowCategory(this.handleShowCategory);
    this[VIEW].bindShowDish(this.handleShowDish);
    this[VIEW].bindAllergenDishes(this.handleShowAllergens);
    this[VIEW].bindDishesMenu(this.handleShowMenus);
    this[VIEW].bindShowDishesOnMenu(this.handleShowDishesOnMenu);
  };

  handleInit = () => {
    this.onInit();
  }

  handleShowOptionRestaurants = () => {
    this[VIEW].ShowOptionRestaurants();
  }

  handleShowDishesOfCategory = (serial) => {
    const category = this[MODEL].categories[serial];
    this[VIEW].listDishes(this[MODEL].getDishesInCategory(category), category.getName());
    this[VIEW].bindShowDish(this.handleShowDish);
    this[VIEW].bindInfoDishAside(this.handleShowDish);
  }

  handleShowCategory = (serial) => {
    const category = this[MODEL].categories[serial]
    this[VIEW].showCategory(category);
  }

  handleShowRestaurant = (RestaurantName) => {
    const restaurant = this[MODEL].restaurants.find(restaurant => restaurant.restaurant.name === RestaurantName);
    this[VIEW].showRestaurant(restaurant.restaurant);
  }

  /*handleShowDish = (serial) => {
    const dish = this[MODEL].dishes[serial];
    this[VIEW].showDish(dish);
  }*/

  handleShowDish = (DishName) => {
    const dish = this[MODEL].dishes.find(dish => dish.dish.name === DishName);
    this[VIEW].showDish(dish);
  }

  handleShowAllergens = () => {
    this[VIEW].showAllergens(this[MODEL].allergens);
    this[VIEW].bindShowDishesWithAllergen(this.handleShowDishesWithAllergen);
  }

  handleShowMenus = () => {
    this[VIEW].showMenus(this[MODEL].menus);
    this[VIEW].bindShowDishesOnMenu(this.handleShowDishesOnMenu);
  }

  handleShowDishesWithAllergen = (serial) => {
    const allergen = this[MODEL].allergens[serial];
    this[VIEW].listDishesAllergen(this[MODEL].getDishesWithAllergen(allergen), allergen.getName());
    this[VIEW].bindShowDish(this.handleShowDish);
  }

  handleShowDishesOnMenu = (MenuName) => {
    const menu = this[MODEL].menus.find(menu => menu.menu.name === MenuName);
    this[VIEW].listDishesMenu(menu.dishes, menu.menu.name);
    this[VIEW].bindShowDish(this.handleShowDish);
  }

  onLoad = (categories, allergens, dishes, menus, restaurants) => {
    //Añadir todos los elementos
    for(const category of categories){
      this[MODEL].addCategory(category);
    }
    for (const allergen of allergens){
      this[MODEL].addAllergen(allergen);
    }

    for(const dish of dishes){
      this[MODEL].addDish(dish);
    }

    for (const menu of menus){
      this[MODEL].addMenu(menu);
    }

    for (const restaurant of restaurants){
      this[MODEL].addRestaurant(restaurant);
    }
    //Asignaciones de elementos
    this[MODEL].assignCategoryToDish(dishes[0], categories[0], categories[1], categories[2]);
    this[MODEL].assignCategoryToDish(dishes[1], categories[0], categories[1], categories[2], categories[3], categories[4]);
    this[MODEL].assignCategoryToDish(dishes[2], categories[0], categories[3], categories[4]);
    this[MODEL].assignCategoryToDish(dishes[3], categories[0], categories[1], categories[2]);
    this[MODEL].assignCategoryToDish(dishes[4], categories[1], categories[3], categories[2]);

    this[MODEL].assignAllergenToDish(dishes[0], allergens[1],allergens[2],allergens[3]);
    this[MODEL].assignAllergenToDish(dishes[1], allergens[2],allergens[3],allergens[4]);
    this[MODEL].assignAllergenToDish(dishes[2], allergens[0],allergens[2],allergens[4]);
    this[MODEL].assignAllergenToDish(dishes[3], allergens[0],allergens[1],allergens[4]);
    this[MODEL].assignAllergenToDish(dishes[4], allergens[3],allergens[4]);

    this[MODEL].assignDishToMenu(menus[0], dishes[0], dishes [1], dishes[2]);
    this[MODEL].assignDishToMenu(menus[1], dishes[2], dishes [3], dishes[4]);
    this[MODEL].assignDishToMenu(menus[2], dishes[1], dishes [2], dishes[4]);
    this[MODEL].assignDishToMenu(menus[3], dishes[0], dishes [1], dishes[4]);
    this[MODEL].assignDishToMenu(menus[4], dishes[0], dishes [2], dishes[3]);
    //Cargar vista
    this.onInit();//Genera HTML
  }
}

export default ManagerController;