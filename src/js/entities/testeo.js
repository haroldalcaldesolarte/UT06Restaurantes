import {Manager} from './restaurantsManager.js';
import Category from './Category.js';
import Allergen from './Allergen.js';
import Dish from './Dish.js';
import Menu from './Menu.js';
import Restaurant from './Restaurant.js';
import Coordinate from './Coordinate.js';

function test() {
  const outputDiv = document.getElementById('output');
  const rm = Manager.getInstance();
  rm.reset(); // Cada vez que se ejecuta se hace un reset de todo para que no haya ningun problema
  const category1 = new Category('C1', 'Categoria1');
  const category2 = new Category('C2', 'Categoria2');
  const category3 = new Category('C3', 'Categoria3');
  const category4 = new Category('C4', 'Categoria4');
  const category5 = new Category('C5', 'Categoria5');

  const menu1 = new Menu('M1', 'Menu1');
  const menu2 = new Menu('M2', 'Menu2');
  const menu3 = new Menu('M3', 'Menu3');
  const menu4 = new Menu('M4', 'Menu4');
  const menu5 = new Menu('M5', 'Menu5');

  const allergen1 = new Allergen('A1','Allergen1');
  const allergen2 = new Allergen('A2','Allergen2');
  const allergen3 = new Allergen('A3','Allergen3');
  const allergen4 = new Allergen('A4','Allergen4');
  const allergen5 = new Allergen('A5','Allergen5');

  const dish1 = new Dish('D1', 'Dish1');
  const dish2 = new Dish('D2', 'Dish2', ['tomate', 'cebolla', 'Arroz']);
  const dish3 = new Dish('D3', 'Dish3');
  const dish4 = new Dish('D4', 'Dish4');
  const dish5 = new Dish('D5', 'Dish5');

  const restaurant1 = new Restaurant('R1','Restaurant1', new Coordinate(2,5));
  const restaurant2 = new Restaurant('R2','Restaurant2', new Coordinate(4,15));
  const restaurant3 = new Restaurant('R3','Restaurant3', new Coordinate(6,25));
  const restaurant4 = new Restaurant('R4','Restaurant4', new Coordinate(8,40));
  const restaurant5 = new Restaurant('R5','Restaurant5', new Coordinate(10,35));

  rm.addAllergen(allergen1);
  rm.addRestaurant(restaurant1).addRestaurant(restaurant2,restaurant3);
  rm.addDish(dish1);
  rm.addDish(dish2);
  rm.addCategory(category1, category5);
  rm.addMenu(menu1,menu2,menu5);
  rm.assignCategoryToDish(dish3, category3,category4,category1,category5).assignCategoryToDish(dish3, category2);
  rm.assignCategoryToDish(dish2,category1);
  rm.assignAllergenToDish(dish3, allergen1,allergen2,allergen3,allergen4,allergen5).assignAllergenToDish(dish1, allergen1);
  rm.assignDishToMenu(menu1, dish1,dish2,dish3,dish4).assignDishToMenu(menu2,dish5);
  rm.changeDishesPositionsInMenu(menu1,dish1,dish4);
  //Iteradores Simples
  const categoriesIterator = rm.getCategories();
  const menusIterator = rm.getMenus();
  const allergensIterator = rm.getAllergens();
  const restaurantsIterator = rm.getRestaurants();

  for (const category of categoriesIterator) {
    console.log(category.toString());
  }

  for (const menu of menusIterator) {
    console.log(menu.menu.toString());
  }

  for (const allergen of allergensIterator) {
    console.log(allergen.toString());
  }
  for (const restaurant of restaurantsIterator) {
    console.log(restaurant.restaurant.toString());
  }
  outputDiv.innerHTML += `<hr>`;
  outputDiv.innerHTML += 'NOMBRE DEL SISTEMA:' + rm.systemName; 
  outputDiv.innerHTML += `<hr>`;
  outputDiv.innerHTML += `<h3>Iterador getDishesInCategory</h3>`;
  const iteratorgetDishesInCategory = rm.getDishesInCategory(category1, dish => dish.name.includes('Pasta'));
  for (const dish of iteratorgetDishesInCategory) {
    outputDiv.innerHTML += `<p>- ${dish.toString()}</p>`;
  }

  outputDiv.innerHTML += `<h3>Iterador getDishesWithAllergen</h3>`;
  const iteratorgetDishesWithAllergen = rm.getDishesWithAllergen(allergen1, dish => dish.name.includes('Arroz'));
  for (const dish of iteratorgetDishesWithAllergen) {
    outputDiv.innerHTML += `<p>- ${dish.toString()}</p>`;
  }
  outputDiv.innerHTML += `<hr>`;
  outputDiv.innerHTML += rm.systemName; 
  outputDiv.innerHTML += `<h3>Restaurantes Añadidos:</h3>`;
  rm.restaurants.forEach(restaurant => {
      outputDiv.innerHTML += `<p><strong>${restaurant.restaurant.name}</strong></p>`;
      outputDiv.innerHTML += `<p>${restaurant.restaurant.description}</p>`;
      outputDiv.innerHTML += `<p>Ubicación: Latitud ${restaurant.restaurant.location.latitude}, Longitud ${restaurant.restaurant.location.longitude}</p>`;
      outputDiv.innerHTML += `<hr>`;
  });
  outputDiv.innerHTML += `<h3>Categorías Añadidas:</h3>`;
  rm.categories.forEach(category => outputDiv.innerHTML += `<p>${category.toString()}</p>`);
  outputDiv.innerHTML += `<h3>Menus Añadidos:</h3>`;
  rm.menus.forEach(menu => {
    outputDiv.innerHTML += `<p>${menu.menu.toString()}</p>`;
    menu.dishes.forEach(dish => {
        outputDiv.innerHTML += `<p> - ${dish.dish.toString()}</p>`;
    });
    outputDiv.innerHTML += `<hr>`;
  });
  outputDiv.innerHTML += `<h3>Alergenos Añadidos:</h3>`;
  rm.allergens.forEach(allergen => outputDiv.innerHTML += `<p>${allergen.toString()}</p>`);
  outputDiv.innerHTML += `<h3>Platos Añadidos:</h3>`;
  rm.dishes.forEach(dish => {
    outputDiv.innerHTML += `<p>- ${dish.dish.toString()}</p>`;
    outputDiv.innerHTML += `<p> - ${dish.categories.toString()}</p>`;
    outputDiv.innerHTML += `<p> - ${dish.allergens.toString()}</p>`;
    outputDiv.innerHTML += `<hr>`;
  });

  rm.deassignCategoryToDish(dish3, category3);
  rm.deassignCategoryToDish(dish3, category2);
  rm.deassignAllergenToDish(dish3, allergen1);
  rm.deassignDishToMenu(menu1,dish2);
  rm.removeCategory(category4).removeCategory(category1);
  rm.removeAllergen(allergen1,allergen2).removeAllergen(allergen3);
  rm.removeDish(dish1).removeDish(dish4);
  rm.removeMenu(menu1);
  rm.removeRestaurant(restaurant3).removeRestaurant(restaurant2);

 outputDiv.innerHTML += `<h3>Restaurantes Añadidos:</h3>`;
  rm.restaurants.forEach(restaurant => {
      outputDiv.innerHTML += `<p><strong>${restaurant.restaurant.name}</strong></p>`;
      outputDiv.innerHTML += `<p>${restaurant.restaurant.description}</p>`;
      outputDiv.innerHTML += `<p>Ubicación: Latitud ${restaurant.restaurant.location.latitude}, Longitud ${restaurant.restaurant.location.longitude}</p>`;
      outputDiv.innerHTML += `<hr>`;
  });
  outputDiv.innerHTML += `<h3>Menus Añadidos:</h3>`;
  rm.menus.forEach(menu => {
    outputDiv.innerHTML += `<p>${menu.menu.toString()}</p>`;
    menu.dishes.forEach(dish => {
        outputDiv.innerHTML += `<p> - ${dish.dish.toString()}</p>`;
    });
    outputDiv.innerHTML += `<hr>`;
  });
  outputDiv.innerHTML += `<h3>Platos Añadidos:</h3>`;
  rm.dishes.forEach(dish => {
    outputDiv.innerHTML += `<p>- ${dish.dish.toString()}</p>`;
    outputDiv.innerHTML += `<p>- ${dish.categories.toString()}</p>`;
    outputDiv.innerHTML += `<p>- ${dish.allergens.toString()}</p>`;
    outputDiv.innerHTML += `<hr>`;
  });
  outputDiv.innerHTML += `<h3>Categorías Añadidas:</h3>`;
  rm.categories.forEach(category => outputDiv.innerHTML += `<p>${category.toString()}</p>`);
  rm.addCategory(category1);
  rm.assignCategoryToDish(dish1,category1);
  rm.assignCategoryToDish(dish2,category1);
  outputDiv.innerHTML += `<hr>`;
  const rm2 = Manager.getInstance(); //Probando el sigleton, se obtiene la misma instancia del principio
  outputDiv.innerHTML += `<h3>Platos Añadidos:</h3>`;
  rm2.dishes.forEach(dish => {
    outputDiv.innerHTML += `<p>- ${dish.dish.toString()}</p>`;
    outputDiv.innerHTML += `<p>- ${dish.categories.toString()}</p>`;
    outputDiv.innerHTML += `<p>- ${dish.allergens.toString()}</p>`;
    outputDiv.innerHTML += `<hr>`;
  });
  let dish6 = rm.createDish('D6','dish6',[],'');
  console.log(dish6.toString());

  let menu6 = rm.createMenu('M5', 'Menu5');//Guarda el mismo objeto
  console.log('-----------');
  console.log(menu6.toString());
  let menu7 = rm.createMenu('M7', 'Menu7'); //Crea uno nuevo
  console.log('-----------');
  console.log(menu7.toString());
  rm.assignDishToMenu(menu7,dish6);
  outputDiv.innerHTML += `<h3>Menus Añadidos:</h3>`;
  rm.menus.forEach(menu => {
    outputDiv.innerHTML += `<p>${menu.menu.toString()}</p>`;
    menu.dishes.forEach(dish => {
        outputDiv.innerHTML += `<p> - ${dish.dish.toString()}</p>`;
    });
    outputDiv.innerHTML += `<hr>`;
  });
  rm.addAllergen(allergen1);
  let allergenUno = rm.createAllergen('A1','Allergen1Duplicado'); // asigna en allergenUno el objeto almacenado en allergen1
  console.log("Nuevo Alergeno:" + allergenUno.toString());
  let allergen6 = rm.createAllergen('A6','Allergen6');
  console.log("Nuevo Alergeno:" + allergen6.toString());
  let cat5 = rm.createCategory('C5', 'Categoria55555');
  console.log("Nuevo Categoria:" + cat5.toString());
  let cat7 = rm.createCategory('C7', 'Categoria7');
  console.log("Nuevo Categoria:" + cat7.toString());
  let res1 = rm.createRestaurant('R1','Restaurant1Duplicado',  new Coordinate(2,5));
  console.log("Nuevo Restaurante:" + res1.toString());
  let res90 = rm.createRestaurant('R90','Restaurant90', new Coordinate(30,46));
  console.log("Nuevo Restaurante:" + res90.toString());
  outputDiv.innerHTML += `<h3>Restaurantes Añadidos3:</h3>`;
  rm.restaurants.forEach(restaurant => {
      outputDiv.innerHTML += `<p><strong>${restaurant.restaurant.name}</strong></p>`;
      outputDiv.innerHTML += `<p>${restaurant.restaurant.description}</p>`;
      outputDiv.innerHTML += `<p>Ubicación: Latitud ${restaurant.restaurant.location.latitude}, Longitud ${restaurant.restaurant.location.longitude}</p>`;
      outputDiv.innerHTML += `<hr>`;
  });
  try {
    rm.addAllergen(dish1);//Intentamos añadir un plato al array de alergenos
  } catch (error) {
    outputDiv.innerHTML += `<p><strong>${error.message}</strong></p>`;
  }
  try {  // En este caso no existe el menu1 ya que lo eliminamos previamente
    let dish10 = new Dish('D10', 'Dish10');
    rm.deassignDishToMenu(menu1,dish10);
  } catch (error) {
    outputDiv.innerHTML += `<p><strong>${error.message}</strong></p>`;
  }
  try { //Intentamos borrar el D10 del menu1 que acabamos de añadir y no tiene platos
    let dish10 = new Dish('D10', 'Dish10');
    rm.addMenu(menu1);
    rm.deassignDishToMenu(menu1,dish10);
  } catch (error) {
    outputDiv.innerHTML += `<p><strong>${error.message}</strong></p>`;
  }
}

export {test};
window.test = test;
