
class Restaurant {
  constructor(name, description, location) {
    this.name = name;
    this.description = description || '';
    this.location = location || new Coordinate(0, 0);
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

  getLocation() {
    return this.location;
  }

  setLocation(location) {
    this.location = location;
  }

  toString() {
    return 'Restaurante ' + this.name + ': ' + this.description + '('+ this.location.toString() + ')';
  }
}

export {Restaurant};
