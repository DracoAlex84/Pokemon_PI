const validate = (input) => {
    let errors = {};
    let validateUrl =
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  
    if (
      !input.name.trim() ||
      input.name.length > 12 ||
      input.name.includes(" ")
    ) {
      errors.name = "Invalid name";
    }
    if (
      !input.image.trim() ||
      !validateUrl.test(input.image) ||
      input.image.includes(" ")
    ) {
      errors.image = "Invalid url";
    }
    if (input.hp > 250 || input.hp < 0) {
      errors.hp = `Invalid HP`;
    }
    if (input.speed > 250 || input.speed < 0) {
      errors.speed = `Invalid speed`;
    }
    if (input.attack > 250 || input.attack < 0) {
      errors.attack = `Invalid attack`;
    }
    if (input.defense > 250 || input.defense < 0) {
      errors.defense = `Invalid defense`;
    }
    if (input.height > 500 || input.height < 0) {
      errors.height = `Invalid height`;
    }
    if (input.weight > 500 || input.weight < 0) {
      errors.weight = `Invalid weight`;
    }
  
    return errors;
  };
  
  export default validate;
  