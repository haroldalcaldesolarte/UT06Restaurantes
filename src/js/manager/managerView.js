import { newDishValidation, newCategoryValidation } from './validation.js';

class ManagerView {
  constructor(){
    this.main = document.getElementById('principal');
    this.aside = document.getElementById('menu_lateral');
    this.menu = document.getElementById('navbar-nav');
  }

  init(categories, dishes) {//en este init debo recoger las categorias y listarlas antes se debe hacer en OnLoad
    this.main.replaceChildren();
    this.aside.replaceChildren();
    let asideContent = '';
    for (const category of categories){
      const position = categories.indexOf(category);
      this.main.insertAdjacentHTML('beforeend',
      `<div class="card" style="width: 30rem;">
        <div class="card-body">
          <h5 class="card-title">${category.getName()}</h5>
          <p class="card-text">${category.getDescription()}</p>
          <a href="#" data-serial="${position}" data-name="${category.getName()}" class="card-link ver-categoria">Ver Categoria</a>
          <a href="#" data-serial="${position}" data-name="${category.getName()}" class="card-link ver-platos">Ver Platos</a>
        </div>
      </div>`);
      asideContent += `<li><a href="#" data-serial="${position}" data-name="${category.getName()}">${category.getName()}</a></li>`;
    }

    this.main.insertAdjacentHTML('beforeend', `<hr><br>`);
    for(const dish of dishes){
      const position = dishes.indexOf(dish);
      this.main.insertAdjacentHTML('beforeend',`<div class="card" style="width: 30rem;">
      <div class="card-body">
        <h5 class="card-title">${dish.dish.getName()}</h5>
        <p class="card-text">${dish.dish.getDescription()}</p>
        <a href="#" data-serial="${position}" data-name="${dish.dish.getName()}" class="card-link ver-plato">Información</a>
      </div>
    </div>`);
    }

    this.aside.innerHTML = `<h5>Categorias</h5><ul>${asideContent}</ul>`;
  }

  listDishes(dishes, CategoryName) {
    let asideContent = '';
    this.main.replaceChildren();
    this.main.insertAdjacentHTML('beforeend',`<h4>Categoria: ${CategoryName}</h4>`);
    for(const dish of dishes){
      const position = dishes.indexOf(dish);
      this.main.insertAdjacentHTML('beforeend',`<div class="card" style="width: 70rem;">
      <div class="card-body">
        <h5 class="card-title">${dish.name}</h5>
        <p class="card-text">${dish.description}</p>
        <a href="#" data-serial="${position}" data-name="${dish.name}" class="card-link ver-plato">Información</a>
      </div>
    </div>`);
    asideContent += `<li><a href="#" data-serial="${position}" data-name="${dish.name}">${dish.name}</a></li>`;
    }
    this.aside.innerHTML = `<h5>Platos</h5><ul>${asideContent}</ul>`;
  }

  showRestaurantsInMenu(restaurants) {
    const dropdownMenu = document.getElementById('nav-restaurants');
    if (dropdownMenu === null) {
      const li = document.createElement('li');
      li.classList.add('nav-item');
      li.classList.add('dropdown');
      li.insertAdjacentHTML('beforeend', `<a class="dropdown-toggle" href="#" id="nav-restaurants" role="button"
        data-bs-toggle="dropdown" aria-expanded="false">Restaurantes</a>`);
      const container = document.createElement('ul');
      container.classList.add('dropdown-menu');

      for (const restaurant of restaurants) {
        container.insertAdjacentHTML('beforeend', `<li><a data-name="${restaurant.restaurant.name}" class="dropdown-item" href="#product-list">${restaurant.restaurant.name}</a></li>`);
      }
      li.append(container);
      this.menu.append(li);
    }
  }

  ShowOptionRestaurants(){ //Pensaba que el dropdown ya tenia esto tampoco vi nada parecido en el ejemplo
    const dropdownMenu = document.getElementById('nav-restaurants');
    const listMenu = dropdownMenu.nextElementSibling;

    if (dropdownMenu.classList.contains('show') && listMenu.classList.contains('show')){
      dropdownMenu.classList.remove('show');
      listMenu.classList.remove('show');
    }else {
      dropdownMenu.classList.add('show');
      listMenu.classList.add('show');
    }
  }

  bindShowHideOptionRestaurants(handler){
    const dropdownMenu = document.getElementById('nav-restaurants');
    dropdownMenu.addEventListener('click', (event) => {
      handler();
    });
  }

  showRestaurant(restaurant){
    this.main.replaceChildren();
    this.main.insertAdjacentHTML('beforeend',
      `<div class="card" style="width: 70rem;">
        <div class="card-body">
          <h5 class="card-title">Nombre: ${restaurant.name}</h5>
          <p class="card-text">Descripción: ${restaurant.description}</p>
          <p class="card-text">${restaurant.location}</p>
        </div>
      </div>`);
  }

  bindShowRestaurant(handler){
    const navCats = document.getElementById('nav-restaurants');
    const links = navCats.nextSibling.querySelectorAll('a');
    for (const link of links){
      link.addEventListener('click', (event) => {
        handler(event.currentTarget.dataset.name);
      });
    }
  }

  bindDishesOfCategoryList(handler){
    const verPlatosLinks = this.main.querySelectorAll('.ver-platos');
    for (const link of verPlatosLinks){
      link.addEventListener('click', (event) => {
        handler(event.currentTarget.dataset.serial);
      });
    }
  }

  bindDishesofCategoryAside(handler){
    const categoriaLinksAside = this.aside.querySelectorAll('a');
    for (const link of categoriaLinksAside){
      link.addEventListener('click', (event) => {
        handler(event.currentTarget.dataset.serial);
      });
    }
  }

  showCategory(category){
    this.main.replaceChildren();
    this.main.insertAdjacentHTML('beforeend',
      `<div class="card" style="width: 70rem;">
        <div class="card-body">
          <h5 class="card-title">Nombre: ${category.name}</h5>
          <p class="card-text">Descripción: ${category.description}</p>
        </div>
      </div>`);
  }

  bindShowCategory(handler){
    const linkCategoria = this.main.querySelectorAll('.ver-categoria');
    for (const link of linkCategoria){
      link.addEventListener('click', (event) => {
        handler(event.currentTarget.dataset.serial);
      });
    }
  }

  showDish(dish){
    this.main.replaceChildren();
    if (dish.dish.ingredients.length > 0){
      this.main.insertAdjacentHTML('beforeend',
      `<div class="card" style="width: 70rem;">
      <div class="card-body">
      <h5 class="card-title">Nombre: ${dish.dish.name}</h5>
      <p class="card-text">Descripción: ${dish.dish.description}</p>
      <p class="card-text"> Ingredientes: ${dish.dish.ingredients.toString()}</p>
      </div>
      </div>`);
    }else {
      this.main.insertAdjacentHTML('beforeend',
      `<div class="card" style="width: 70rem;">
      <div class="card-body">
      <h5 class="card-title">Nombre: ${dish.dish.name}</h5>
      <p class="card-text">Descripción: ${dish.dish.description}</p>
      </div>
      </div>`);
    }
  }

  bindShowDish(handler){
    const linkPlato = this.main.querySelectorAll('.ver-plato');
    for (const link of linkPlato){
      link.addEventListener('click', (event) => {
        handler(event.currentTarget.dataset.name);
      });
    }
  }

  bindInfoDishAside(handler){
    const platosLinksAside = this.aside.querySelectorAll('a');
    for (const link of platosLinksAside){
      link.addEventListener('click', (event) => {
        handler(event.currentTarget.dataset.name);
      });
    }
  }

  showAllergens(allergens){
    this.main.replaceChildren();
    for(const allergen of allergens){
      const position = allergens.indexOf(allergen);
      this.main.insertAdjacentHTML('beforeend',`<div class="card" style="width: 70rem;">
      <div class="card-body">
        <h5 class="card-title">${allergen.getName()}</h5>
        <p class="card-text">${allergen.getDescription()}</p>
        <a href="#" data-serial="${position}" data-name="${allergen.getName()}" class="card-link ver-plato-alergeno">Platos con este alergeno</a>
      </div>
    </div>`);
    }
  }

  showMenus(menus){
    this.main.replaceChildren();
    for(const menu of menus){
      const position = menus.indexOf(menu);
      this.main.insertAdjacentHTML('beforeend',`<div class="card" style="width: 70rem;">
      <div class="card-body">
        <h5 class="card-title">${menu.menu.name}</h5>
        <p class="card-text">${menu.menu.description}</p>
        <a href="#" data-serial="${position}" data-name="${menu.menu.name}" class="card-link ver-plato-menu">Platos del menu</a>
      </div>
    </div>`);
    }
  }

  listDishesAllergen(dishes, AllergenName) {
    let asideContent = '';
    this.main.replaceChildren();
    this.main.insertAdjacentHTML('beforeend',`<h4>Alergeno: ${AllergenName}</h4>`);
    for(const dish of dishes){
      const position = dishes.indexOf(dish);
      this.main.insertAdjacentHTML('beforeend',`<div class="card" style="width: 70rem;">
      <div class="card-body">
        <h5 class="card-title">${dish.name}</h5>
        <p class="card-text">${dish.description}</p>
        <a href="#" data-serial="${position}" data-name="${dish.name}" class="card-link ver-plato">Información</a>
      </div>
    </div>`);
    asideContent += `<li><a href="#" data-serial="${position}" data-name="${dish.name}">${dish.name}</a></li>`;
    }
    this.aside.innerHTML = `<h5>Platos</h5><ul>${asideContent}</ul>`;
  }

  listDishesMenu(dishes, MenuName) {
    let asideContent = '';
    this.main.replaceChildren();
    this.main.insertAdjacentHTML('beforeend',`<h4>Menu: ${MenuName}</h4>`);
    for(const dish of dishes){
      const position = dishes.indexOf(dish);
      this.main.insertAdjacentHTML('beforeend',`<div class="card" style="width: 70rem;">
      <div class="card-body">
        <h5 class="card-title">${dish.dish.name}</h5>
        <p class="card-text">${dish.dish.description}</p>
        <a href="#" data-serial="${position}" data-name="${dish.dish.name}" class="card-link ver-plato">Información</a>
      </div>
    </div>`);
    asideContent += `<li><a href="#" data-serial="${position}" data-name="${dish.dish.name}">${dish.dish.name}</a></li>`;
    }
    this.aside.innerHTML = `<h5>Platos</h5><ul>${asideContent}</ul>`;
  }

  //Formulario Categoria

  showNewCategoryForm(){
    this.main.replaceChildren();
    this.aside.replaceChildren();
    this.main.style.width = '80%';
    this.aside.style.width = '20%';

    const container = document.createElement('div');
    container.classList.add('container');
    container.classList.add('my-3');
    container.id = 'new-category';

    container.insertAdjacentHTML(
      'afterbegin',
      '<h1 class="display-5">Nueva Categoria</h1>',
    );
    container.insertAdjacentHTML(
      'beforeend',
      `<form name="fNewCategory" role="form" class="row g-3" novalidate>
			<div class="col-md-12 mb-3">
				<label class="form-label" for="ncNombre">Nombre *</label>
				<div class="input-group">
					<input type="text" class="form-control" id="ncNombre" name="ncNombre"
						placeholder="Nombre de la categoria" value="" required>
					<div class="invalid-feedback">El nombre es obligatorio.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="col-md-12 mb-3">
				<label class="form-label" for="ncDescription">Descripción *</label>
				<div class="input-group">
					<input type="text" class="form-control" id="ncDescription" name="ncDescription" value="" required>
					<div class="invalid-feedback">La descripción no es válida.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="mb-12">
				<button class="btn btn-primary" type="submit">Enviar</button>
				<button class="btn btn-danger" type="reset">Cancelar</button>
			</div>
		</form>`,
    );

    this.main.append(container);
  }

  bindNewCategoryForm(handler){
    newCategoryValidation(handler);
  }

  showNewCategoryModal(done, cat, error) {
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');

    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Nueva Categoría';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML('afterbegin', `<div class="p-3">La categoría <strong>${cat.name}</strong> ha sido creada correctamente.</div>`);
    } else {
      body.insertAdjacentHTML(
        'afterbegin',
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> La categoría <strong>${cat.name}</strong> ya está creada.</div>`,
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewCategory.reset();
      }
      document.fNewCategory.ncNombre.focus();
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  }

  //Formulario Plato

  showNewDishForm(categories, allergens){
    this.main.replaceChildren();
    this.aside.replaceChildren();
    this.aside.style.width = '20%';

    const container = document.createElement('div');
    container.classList.add('container');
    container.classList.add('my-3');
    container.id = 'new-dish';

    container.insertAdjacentHTML(
      'afterbegin',
      '<h1 class="display-5">Nuevo Plato</h1>',
    );
    container.insertAdjacentHTML(
      'beforeend',
      `<form name="fNewDish" role="form" class="row g-3" novalidate>
			<div class="col-md-6 mb-3">
				<label class="form-label" for="ncNombre">Nombre *</label>
				<div class="input-group">
					<input type="text" class="form-control" id="ncNombre" name="ncNombre"
						placeholder="Nombre del plato" value="" required>
					<div class="invalid-feedback">El nombre es obligatorio.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="col-md-6 mb-3">
				<label class="form-label" for="ncUrl">URL de la imagen *</label>
				<div class="input-group">
					<input type="url" class="form-control" id="ncUrl" name="ncUrl" placeholder="URL de la imagen"
						value="" required>
					<div class="invalid-feedback">La URL no es válida.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="col-md-12 mb-3">
				<label class="form-label" for="ncDescription">Descripción *</label>
				<div class="input-group">
					<input type="text" class="form-control" id="ncDescription" name="ncDescription" value="" required>
					<div class="invalid-feedback">La descripción no es válida.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
      <div class="col-md-6 mb-3">
        <label class="form-label" for="ncCategorias">Categorias</label>
        <div id="categories-checkboxes">
        </div>
      </div>
      <div class="col-md-6 mb-3">
        <label class="form-label" for="ncAlergenos">Alergenos</label>
        <div id="allergens-checkboxes">
        </div>
      </div>
			<div class="mb-12">
				<button class="btn btn-primary" type="submit">Enviar</button>
				<button class="btn btn-danger" type="reset">Cancelar</button>
			</div>
		</form>`,
    );
    const categoriesCheckboxesContainer = container.querySelector('#categories-checkboxes');
    categories.forEach(category => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = 'categories';
      checkbox.value = category.getName();
      const label = document.createElement('label');
      label.textContent = category.getName();

      categoriesCheckboxesContainer.appendChild(checkbox);
      categoriesCheckboxesContainer.appendChild(label);
      categoriesCheckboxesContainer.appendChild(document.createElement('br'));
    });

    const allergensCheckboxesContainer = container.querySelector('#allergens-checkboxes');
    allergens.forEach(allergen => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = 'allergens';
      checkbox.value = allergen.getName();
      const label = document.createElement('label');
      label.textContent = allergen.getName();

      allergensCheckboxesContainer.appendChild(checkbox);
      allergensCheckboxesContainer.appendChild(label);
      allergensCheckboxesContainer.appendChild(document.createElement('br'));
    });

    this.main.append(container);
  }

  bindNewDishForm(handler){
    newDishValidation(handler);
  }

  bindAllergenDishes(handler){
    document.getElementById('nav-alergenos').addEventListener('click', (event) => {
      handler();
    });
  }

  bindDishesMenu(handler){
    document.getElementById('nav-menus').addEventListener('click', (event) => {
      handler();
    });
  }

  bindShowDishesWithAllergen(handler){
    const verPlatosLinks = this.main.querySelectorAll('.ver-plato-alergeno');
    for (const link of verPlatosLinks){
      link.addEventListener('click', (event) => {
        handler(event.currentTarget.dataset.serial);
      });
    }
  }

  bindShowDishesOnMenu(handler){
    const verPlatosLinks = this.main.querySelectorAll('.ver-plato-menu');
    for (const link of verPlatosLinks){
      link.addEventListener('click', (event) => {
        handler(event.currentTarget.dataset.name);
      });
    }
  }

  bindShowNewDish(handler){
    document.getElementById('btn-add-dish').addEventListener('click', (event) => { 
      handler();
    });
  }

  bindShowNewCategory(handler){
    document.getElementById('btn-add-cat').addEventListener('click', (event) => { 
      handler();
    });
  }

  bindInit(handler){
    document.getElementById('inicio').addEventListener('click', (event) => {
      handler();
    });
    document.getElementById('nav-categories').addEventListener('click', (event) => {
      handler();
    });
  }
}

export default ManagerView;