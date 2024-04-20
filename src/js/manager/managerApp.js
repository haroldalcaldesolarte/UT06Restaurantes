import { Allergen, Category, Dish, Menu, Restaurant, Coordinate} from './managerModel.js';
import {Manager} from './managerModel.js';
import ManagerController from './managerController.js';
import ManagerView from './managerView.js';

const ManagerControllerApp = new ManagerController(Manager.getInstance(), new ManagerView());

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

const dish1 = new Dish('D1', 'Dish1', ['tomate', 'cebolla', 'pasta']);
const dish2 = new Dish('D2', 'Dish2', ['tomate', 'cebolla', 'arroz']);
const dish3 = new Dish('D3', 'Dish3', ['queso', 'albahaca','pepino']);
const dish4 = new Dish('D4', 'Dish4', ['lomo', 'patatas', 'champiñones']);
const dish5 = new Dish('D5', 'Dish5', ['huevo', 'patatas', 'cebolla']);

const restaurant1 = new Restaurant('R1','Restaurant1', new Coordinate(2,5));
const restaurant2 = new Restaurant('R2','Restaurant2', new Coordinate(4,15));
const restaurant3 = new Restaurant('R3','Restaurant3', new Coordinate(6,25));
const restaurant4 = new Restaurant('R4','Restaurant4', new Coordinate(8,40));
const restaurant5 = new Restaurant('R5','Restaurant5', new Coordinate(10,35));

ManagerControllerApp.onLoad([category1,category2,category3,category4,category5],
                           [allergen1, allergen2, allergen3, allergen4, allergen5],
                           [dish1, dish2, dish3, dish4, dish5],
                           [menu1, menu2, menu3,menu4,menu5],
                           [restaurant1, restaurant2, restaurant3, restaurant4, restaurant5]);

export default ManagerControllerApp;