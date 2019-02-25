class Person {
  constructor(firstname, lastname, interests) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.interests = interests;
  }

  greet() {
    console.log(`Hello ${this.firstname} ${this.lastname}.`);
    console.log(`You like: ${this.interests.join(', ')}.`);
  }
}

class Student extends Person {
  constructor(firstname, lastname, interests, canton) {
    super(firstname, lastname, interests);
    this.canton = canton;
  }

  home() {
    console.log(`You live in ${this.canton}.`)
  }
}

class Teacher extends Person {
  constructor(firstname, lastname, interests, skills) {
    super(firstname, lastname, interests);
    this.skills = skills;
  }

  can_do() {
    console.log(`You can do: ${this.skills.join(', ')}.`);
  }
}
