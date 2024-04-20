import Allergen from "./Allergen.js";
import Dish from "./Dish.js";
import Category from "./Category.js";
import Menu from "./Menu.js";
import Restaurant from "./Restaurant.js";
import Coordinate from "./Coordinate.js";

const Manager = (function () {
  let instantiated;
  class RestaurantsManager {
    constructor(systemName) {
      this.systemName = systemName;
      this.categories = [];
      this.allergens = [];
      this.dishes = [];
      this.menus = [];
      this.restaurants = [];
    }

    getCategories() {
      const array = this.categories;
      return {
        * [Symbol.iterator]() {
          for (const arrayCat of array) {
            yield arrayCat;
          }
        },
      };
    }

    getMenus() {
      const array = this.menus;
      return {
        * [Symbol.iterator]() {
          for (const arrayMenu of array) {
            yield arrayMenu;
          }
        },
      };
    }

    getAllergens() {
      const array = this.allergens;
      return {
        * [Symbol.iterator]() {
          for (const arrayAllergen of array) {
            yield arrayAllergen;
          }
        },
      };
    }

    getRestaurants() {
      const array = this.restaurants;
      return {
        * [Symbol.iterator]() {
          for (const arrayRestaurant of array) {
            yield arrayRestaurant;
          }
        },
      };
    }
  
    // Métodos Añadir
    addCategory(...categories) {//se le puede pasar una categoria o varias
      for (const category of categories) {
        if (!category || !(category instanceof Category)) {
          throw new Error('No es un objeto válido, es null o no es Category.');
        }
        
        if (this.#getCategoryPosition(category) !== -1) {
          throw new Error('La categoría ya existe.');
        }
        this.categories.push(category);
      }
      return this;
    }

    #getCategoryPosition(category){//metodo para obtener el indice si existe la categoria en las categorias globales
      return this.categories.findIndex((element) => element.name === category.name);
    }

    removeCategory(...categories){//Eliminar de las categorias globales y de las del dish, recorrer todos los dishes
      for (const category of categories) {
        if (!category || !(category instanceof Category)) {
          throw new Error('No es un objeto válido, es null o no es Category.');
        }

        const position = this.#getCategoryPosition(category);//posicion en el array global de categorias

        if (position !== -1) {
          const storedCategory = this.categories[position];//guardamos la categoria que vamos a borrar para buscarla en los platos
          for (const dish of this.dishes) {
            const pCategory = this.#getCategoryPositionInDish(storedCategory, dish);
            if (pCategory !== -1) {
              dish.categories.splice(pCategory, 1);
            }
          }
          this.categories.splice(position, 1);
        } else {
          throw new Error('La categoria no existe en el sistema.');
        }
      }
      return this;
    }

    addAllergen(...allergens) {
      for (const allergen of allergens) {
        if (!allergen || !(allergen instanceof Allergen)) {
          throw new Error('No es un objeto válido, es null o no es Allergen.');
        }
        
        if (this.#getAllergenPosition(allergen) !== -1) {
          throw new Error('El alergeno ya existe.');
        }
        this.allergens.push(allergen);
      }
      return this;
    }

    #getAllergenPosition(allergen){
      return this.allergens.findIndex((element) => element.name === allergen.name);
    }

    removeAllergen(...allergens){
      for (const allergen of allergens) {
        if (!allergen || !(allergen instanceof Allergen)) {
          throw new Error('No es un objeto válido, es null o no es Allergen.');
        }

        const position = this.#getAllergenPosition(allergen);

        if (position !== -1) {
          const storedAllergen = this.allergens[position];
          for (const dish of this.dishes) {
            const pAllergen = this.#getAllergenPositionInDish(storedAllergen, dish);
            if (pAllergen !== -1) {
              dish.allergens.splice(pAllergen, 1);
            }
          }
          this.allergens.splice(position, 1);
        } else {
          throw new Error('El alergeno no existe en el sistema.');
        }
      }
      return this;
    }

    addDish(...dishes) {
      for (const dish of dishes) {
        if (!dish || !(dish instanceof Dish)) {
          throw new Error('No es un objeto válido, es null o no es Dish.');
        }
        
        if (this.#getDishPosition(dish) !== -1) {
          throw new Error('El plato ya existe.');
        }

        this.dishes.push({
          dish,
          categories: [],
          allergens: []
        });
      }
      return this;
    }

    #getDishPosition(dish){
      return this.dishes.findIndex((element) => element.dish.name === dish.name);
    }

    removeDish(...dishes){
      for (const dish of dishes) {
        if (!dish || !(dish instanceof Dish)) {
          throw new Error('No es un objeto válido, es null o no es Dish.');
        }

        const position = this.#getDishPosition(dish);

        if (position !== -1) {
          const storedDish = this.dishes[position];
          for (const menu of this.menus) {
            const pDish = this.#getDishPositionInMenu(storedDish.dish, menu);
            if (pDish !== -1) {
              menu.dishes.splice(pDish, 1);
            }
          }
          this.dishes.splice(position, 1);
        } else {
          throw new Error('El plato no existe en el sistema.');
        }
      }
      return this;
    }

    addMenu(...menus) {
      for (const menu of menus) {
        if (!menu || !(menu instanceof Menu)) {
          throw new Error('No es un objeto válido, es null o no es Menu.');
        }
        
        if (this.#getMenuPosition(menu) !== -1) {
          throw new Error('El menu ya existe.');
        }
        this.menus.push({//Un menu tiene varios platos
          menu,
          dishes: []
        });
      }
      return this;//Se devuelve el objeto RestaurantManager para poder encadenar llamadas
    }

    #getMenuPosition(menu){
      return this.menus.findIndex((element) => element.menu.name === menu.name);
    }

    removeMenu(...menus){
      for (const menu of menus) {
        if (!menu || !(menu instanceof Menu)) {
          throw new Error('No es un objeto válido, es null o no es Menu.');
        }

        const position = this.#getMenuPosition(menu);

        if (position !== -1) {
          this.menus.splice(position, 1);
        } else {
          throw new Error('El menu no existe en el sistema.');
        }
      }
      return this;
    }

    addRestaurant(...restaurants){
      for (const restaurant of restaurants) {
        if (!restaurant || !(restaurant instanceof Restaurant)) {
          throw new Error('No es un objeto válido, es null o no es Restaurant.');
        }
        
        if (this.#getRestaurantPosition(restaurant) !== -1) {
          throw new Error('El restaurante ya existe.');
        }
        this.restaurants.push({
          restaurant
        });
      }
      return this;
    }

    #getRestaurantPosition(restaurant){
      return this.restaurants.findIndex((element) => element.restaurant.name === restaurant.name);
    }

    removeRestaurant(...restaurants){
      for (const restaurant of restaurants) {
        if (!restaurant || !(restaurant instanceof Restaurant)) {
          throw new Error('No es un objeto válido, es null o no es Restaurant.');
        }

        const position = this.#getRestaurantPosition(restaurant);
        if (position !== -1) {
          this.restaurants.splice(position,1);
        }else{
          throw new Error('El restaurante no existe en el sistema.');
        }
      }
      return this;
    }

    //Metodos de asignar y desasignar
    assignCategoryToDish(dish, ...categories) {
      if (!dish || !(dish instanceof Dish)) {
        throw new Error('No es un objeto válido, es null o no es Dish.');
      }

      let pDish = this.#getDishPosition(dish);
      if (pDish === -1) { //comprobamos que existe o no en el sistema y añadimos el plato
        this.addDish(dish);
        pDish = this.#getDishPosition(dish);
      }

      for (const category of categories) {
        if (!category || !(category instanceof Category)) {
          throw new Error('No es un objeto válido, es null o no es Category.');
        }
  
        let pCategory = this.#getCategoryPosition(category);
        if (pCategory === -1) {//comprobamos que existe o no en el sistema y añadimos la categoria
          this.addCategory(category);
          pCategory = this.#getCategoryPosition(category);
        }
  
        //Ahora añadimos la categoria al plato
        const position = this.#getCategoryPositionInDish(category, this.dishes[pDish]);
        if (position === -1) {
          this.dishes[pDish].categories.push(this.categories[pCategory]);
        } else {
          throw new Error('Ya esta asignada la categoria en el plato.');
        }
      }
      return this;
    }

    deassignCategoryToDish(dish, ...categories) {
      if (!dish || !(dish instanceof Dish)) {
        throw new Error('No es un objeto válido, es null o no es Dish.');
      }

      const pDish = this.#getDishPosition(dish);
      if (pDish !== -1) {
        for (const category of categories) {
          if (!category || !(category instanceof Category)) {
            throw new Error('No es un objeto válido, es null o no es Category.');
          }
          const pCategory = this.#getCategoryPositionInDish(category, this.dishes[pDish]);
          if (pCategory !== -1) {
            this.dishes[pDish].categories.splice(pCategory, 1);
          } else {
            throw new Error('No existe la categoria en el Dish.');
          }
        }
      } else {
        throw new Error('El plato no existe en el sistema.');
      }
      return this;
    }

    #getCategoryPositionInDish(category, dish) {
      //Comprobar que en el array de categorias del plato ya esta añadida la categoria
        return dish.categories.findIndex((element) => element.name === category.name);
    }

    assignAllergenToDish(dish, ...allergens) {
      if (!dish || !(dish instanceof Dish)) {
        throw new Error('No es un objeto válido, es null o no es Dish.');
      }

      let pDish = this.#getDishPosition(dish);
      if (pDish === -1) { //comprobamos que existe o no en el sistema y añadimos el plato
        this.addDish(dish);
        pDish = this.#getDishPosition(dish);
      }

      for (const allergen of allergens){
        if (!allergen || !(allergen instanceof Allergen)) {
          throw new Error('No es un objeto válido, es null o no es Allergen.');
        }
  
        let pAllergen = this.#getAllergenPosition(allergen);
        if (pAllergen === -1) {//comprobamos que existe o no en el sistema y añadimos el alergeno
          this.addAllergen(allergen);
          pAllergen = this.#getAllergenPosition(allergen);
        }
  
        //Ahora añadimos el alergeno al plato
        const position = this.#getAllergenPositionInDish(allergen, this.dishes[pDish]);
        if (position === -1) {
          this.dishes[pDish].allergens.push(this.allergens[pAllergen]);
        } else {
          throw new Error('Ya esta asignado el alergeno en el plato.');
        }
      }
      return this;
    }

    deassignAllergenToDish(dish, ...allergens) {
      if (!dish || !(dish instanceof Dish)) {
        throw new Error('No es un objeto válido, es null o no es Dish.');
      }

      const pDish = this.#getDishPosition(dish);
      if (pDish !== -1) {
        for (const allergen of allergens) {
          if (!allergen || !(allergen instanceof Allergen)) {
            throw new Error('No es un objeto válido, es null o no es Allergen.');
          }
          const pAllergen = this.#getAllergenPositionInDish(allergen, this.dishes[pDish]);
          if (pAllergen !== -1) {
            this.dishes[pDish].allergens.splice(pAllergen, 1);
          } else {
            throw new Error('No existe el alergeno en el Dish.');
          }
        }
      } else {
        throw new Error('El plato no existe en el sistema.');
      }
      return this;
    }

    #getAllergenPositionInDish(allergen, dish) {
      //Comprobar que en el array de categorias del plato ya esta añadida la categoria
        return dish.allergens.findIndex((element) => element.name === allergen.name);
    }

    assignDishToMenu(menu, ...dishes) {
      if (!menu || !(menu instanceof Menu)) {
        throw new Error('No es un objeto válido, es null o no es Menu.');
      }

      let pMenu = this.#getMenuPosition(menu);
      if (pMenu === -1) { //comprobamos que existe o no en el sistema y añadimos el menu
        this.addMenu(menu);
        pMenu = this.#getMenuPosition(menu);
      }

      for (const dish of dishes){
        if (!dish || !(dish instanceof Dish)) {
          throw new Error('No es un objeto válido, es null o no es Dish.');
        }
  
        let pDish = this.#getDishPosition(dish);
        if (pDish === -1) {//comprobamos que existe o no en el sistema y añadimos el alergeno
          this.addDish(dish);
          pDish = this.#getDishPosition(dish);
        }
  
        //Ahora añadimos el plato al menu
        const position = this.#getDishPositionInMenu(dish, this.menus[pMenu]);
        if (position === -1) {
          this.menus[pMenu].dishes.push(this.dishes[pDish]);
        } else {
          throw new Error('Ya esta asignado el plato en el menu.');
        }
      }

      return this;
    }

    deassignDishToMenu(menu, ...dishes) {
      if (!menu || !(menu instanceof Menu)) {
        throw new Error('No es un objeto válido, es null o no es Menu.');
      }

      let pMenu = this.#getMenuPosition(menu);
      if (pMenu !== -1) { //comprobamos que existe o no en el sistema y añadimos el menu
        pMenu = this.#getMenuPosition(menu);
        for (const dish of dishes){
          if (!dish || !(dish instanceof Dish)) {
            throw new Error('No es un objeto válido, es null o no es Dish.');
          }
          const pDish = this.#getDishPositionInMenu(dish, this.menus[pMenu]);
          if (pDish !== -1) {
            this.menus[pMenu].dishes.splice(pDish,1);
          }else{
            throw new Error('No existe el plato en el Menu');
          }
        }
      } else {
        throw new Error('El menu no existe en el sistema.');
      }
      return this;
    }

    #getDishPositionInMenu(dish, menu) {
      //Comprobar que en el array de categorias del plato ya esta añadida la categoria
      return menu.dishes.findIndex((element) => element.dish.name === dish.name);
    }

    changeDishesPositionsInMenu(menu, dish1, dish2) {
      const menuPosition = this.#getMenuPosition(menu);
      if (!menu || !(menu instanceof Menu) || menuPosition === -1) {
        throw new Error('Menu es null o no está registrado.');
      }

      if (!dish1 || !(dish1 instanceof Dish) || this.#getDishPosition(dish1) === -1) {
        throw new Error('Dish1 es null o no está registrado.');
      }
    
      if (!dish2 || !(dish2 instanceof Dish) || this.#getDishPosition(dish2) === -1) {
        throw new Error('Dish2 es null o no está registrado.');
      }

      const dish1Position = this.#getDishPositionInMenu(dish1, this.menus[menuPosition]);
      const dish2Position = this.#getDishPositionInMenu(dish2, this.menus[menuPosition]);

      if (dish1Position === -1 || dish2Position === -1) { //Comprobar que los dos platos están en el menu
        throw new Error('Uno o ambos platos no están en el menú.');
      }
      
      const aux = this.menus[menuPosition].dishes[dish1Position];
      this.menus[menuPosition].dishes[dish1Position] = this.menus[menuPosition].dishes[dish2Position];
      this.menus[menuPosition].dishes[dish2Position] = aux;

      return this;
    }

    getDishesInCategory(category, filterFunction) {
      if (!category || !(category instanceof Category)) {
        throw new Error('No es un objeto válido, es null o no es Category.');
      }

      if (typeof filterFunction !== 'function') {
        throw new Error('La función de filtro no es válida.');
      }

      const position = this.#getCategoryPosition(category);
      const dishesInCategory = [];
      if (position !== -1){

        for (const dishInfo of this.dishes) {
          const dish = dishInfo.dish;
          const categories = dishInfo.categories;
      
          if (categories.some(cat => cat.name === category.name)) {
            dishesInCategory.push(dish);
          }
        }
      } else {
        throw new Error('Categoria no registrada en el sistema.');
      }
      return dishesInCategory
    }

    getDishesWithAllergen(allergen, filterFunction) {
      if (!allergen || !(allergen instanceof Allergen)) {
        throw new Error('No es un objeto válido, es null o no es Allergen.');
      }

      if (typeof filterFunction !== 'function') {
        throw new Error('La función de filtro no es válida.');
      }

      const position = this.#getAllergenPosition(allergen);
      const dishesWithAllergen = [];
      if (position !== -1){

        for (const dishInfo of this.dishes) {
          const dish = dishInfo.dish;
          const allergens = dishInfo.allergens;
      
          if (allergens.some(allerg => allerg.name === allergen.name)) {
            dishesWithAllergen.push(dish);
          }
        }
      } else {
        throw new Error('Alergeno no registrado en el sistema.');
      }
      return dishesWithAllergen;
    }

    findDishes(dish, function1, function2) {
      if (!dish || !(dish instanceof Dish) || this.#getDishPosition(dish) === -1) {
        throw new Error('Dish es null o no está registrado.');
      }
    
      if (typeof function1 !== 'function' || typeof function2 !== 'function') {
        throw new Error('Las funciones no son válidas.');
      }
    
      //No entiendo que tengo que hacer con las funciones
    }

    createDish(name,description,ingredients,image){
      let newDish = this.dishes.find(d => d.dish.name === name);
      if (!newDish) {
        newDish = new Dish(name,description,ingredients,image);
        this.dishes.push({ dish: newDish, categories: [], allergens: [] });
      } else {
        newDish = newDish.dish;
      }
      return newDish;
    }

    createMenu(name,description){
      let newMenu = this.menus.find(m => m.menu.name === name);
      if (!newMenu) {
        newMenu = new Menu(name,description);
        this.menus.push({ menu: newMenu, dishes: []});
      } else {
        newMenu = newMenu.menu;
      }
      return newMenu;
    }

    createAllergen(name,description){
      let newAllergen = this.allergens.find(a => a.name === name); // comprobamos si ya existe una con el mismo nombre
      if (!newAllergen) {
        newAllergen = new Allergen(name,description);
        this.allergens.push(newAllergen);
      }
      return newAllergen;
    }

    createCategory(name,description){
      let newCategory = this.categories.find(c => c.name === name); // comprobamos si ya existe una con el mismo nombre
      if (!newCategory) {
        newCategory = new Category(name,description);
        this.categories.push(newCategory);
      }
      return newCategory;
    }

    createRestaurant(name,description,location){
      let newRestaurant = this.restaurants.find(r => r.restaurant.name === name);
      if (!newRestaurant) {
        newRestaurant = new Restaurant(name,description,location);
        this.restaurants.push({restaurant: newRestaurant});
      } else {
        newRestaurant = newRestaurant.restaurant;
      }
      return newRestaurant;
    }

    reset() {
      console.log('reset');
      this.categories.length = 0;
      this.allergens.length = 0;
      this.dishes.length = 0;
      this.menus.length = 0;
      this.restaurants.length = 0;
    }
  }
  
  function init() {
    const rm = new RestaurantsManager('HAS');
    Object.freeze(rm);
    return rm;   
  }

  return{
    getInstance(){
      if (!instantiated){
        instantiated = init();
      }
      return instantiated;
    }
  };
})();

export {Manager};