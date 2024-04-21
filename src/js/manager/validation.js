function showFeedBack(input, valid, message) {
  const validClass = (valid) ? 'is-valid' : 'is-invalid';
  const messageDiv = (valid) ? input.parentElement.querySelector('div.valid-feedback') : input.parentElement.querySelector('div.invalid-feedback');
  for (const div of input.parentElement.getElementsByTagName('div')) {
    div.classList.remove('d-block');
  }
  messageDiv.classList.remove('d-none');
  messageDiv.classList.add('d-block');
  input.classList.remove('is-valid');
  input.classList.remove('is-invalid');
  input.classList.add(validClass);
  if (message) {
    messageDiv.innerHTML = message;
  }
}

function defaultCheckElement(event) {
  this.value = this.value.trim();
  if (!this.checkValidity()) {
    showFeedBack(this, false);
  } else {
    showFeedBack(this, true);
  }
}

function newDishValidation(handler) {
  const form = document.forms.fNewDish;
  form.setAttribute('novalidate', true);
  form.addEventListener('submit', function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    if (!this.ncDescription.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncDescription, false);
      firstInvalidElement = this.ncDescription;
    } else {
      showFeedBack(this.ncDescription, true);
    }

    if (!this.ncUrl.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncUrl, false);
      firstInvalidElement = this.ncUrl;
    } else {
      showFeedBack(this.ncUrl, true);
    }

    if (!this.ncNombre.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncNombre, false);
      firstInvalidElement = this.ncNombre;
    } else {
      showFeedBack(this.ncNombre, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      //Obtener arrays con los nombres de las categorias y alergenos ?
      let CategoriesChecked = getCategoriesChecked();
      let AllergensChecked = getAllergensChecked();
      handler(this.ncNombre.value, this.ncUrl.value, this.ncDescription.value, CategoriesChecked, AllergensChecked);
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.ncNombre.addEventListener('change', defaultCheckElement);
  form.ncUrl.addEventListener('change', defaultCheckElement);
  form.ncDescription.addEventListener('change', defaultCheckElement);
}

function getCategoriesChecked(){
  const categoriesDiv = document.getElementById('categories-checkboxes');
  const checkboxes = categoriesDiv.querySelectorAll('input[type="checkbox"][name="categories"]');

  let opcionesMarcadas = [];

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      opcionesMarcadas.push(checkbox.value);
    }
  });
  return opcionesMarcadas;
}

function getAllergensChecked(){
  const categoriesDiv = document.getElementById('allergens-checkboxes');
  const checkboxes = categoriesDiv.querySelectorAll('input[type="checkbox"][name="allergens"]');

  let opcionesMarcadas = [];

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      opcionesMarcadas.push(checkbox.value);
    }
  });
  return opcionesMarcadas;
}

function newCategoryValidation(handler){
  const form = document.forms.fNewCategory;
  form.setAttribute('novalidate', true);
  form.addEventListener('submit', function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    if (!this.ncDescription.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncDescription, false);
      firstInvalidElement = this.ncDescription;
    } else {
      showFeedBack(this.ncDescription, true);
    }

    if (!this.ncNombre.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncNombre, false);
      firstInvalidElement = this.ncNombre;
    } else {
      showFeedBack(this.ncNombre, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      handler(this.ncNombre.value,this.ncDescription.value);
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.ncNombre.addEventListener('change', defaultCheckElement);
  form.ncDescription.addEventListener('change', defaultCheckElement);
}

function newRestaurantValidation(handler){
  const form = document.forms.fNewRestaurant;
  form.setAttribute('novalidate', true);
  form.addEventListener('submit', function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    if (!this.ncLatitud.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncLatitud, false);
      firstInvalidElement = this.ncLatitud;
    } else {
      showFeedBack(this.ncLatitud, true);
    }

    if (!this.ncLongitud.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncLongitud, false);
      firstInvalidElement = this.ncLongitud;
    } else {
      showFeedBack(this.ncLongitud, true);
    }

    if (!this.ncDescription.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncDescription, false);
      firstInvalidElement = this.ncDescription;
    } else {
      showFeedBack(this.ncDescription, true);
    }

    if (!this.ncNombre.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncNombre, false);
      firstInvalidElement = this.ncNombre;
    } else {
      showFeedBack(this.ncNombre, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      handler(this.ncNombre.value,this.ncDescription.value,this.ncLatitud.value, this.ncLongitud.value);
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.ncNombre.addEventListener('change', defaultCheckElement);
  form.ncDescription.addEventListener('change', defaultCheckElement);
}

export { newDishValidation, newCategoryValidation, newRestaurantValidation };