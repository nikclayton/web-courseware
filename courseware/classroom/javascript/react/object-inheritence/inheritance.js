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

  toString() {
    return `${this.firstname} ${this.lastname} Has ${this.interests.length} interests`;
  }
}


class Student extends Person {
  constructor(firstname, lastname, interests, canton) {
    super(firstname, lastname, interests);
    this.canton = canton;
  }

  greet() {
    super.greet();
    console.log(`I know where you live! ${this.canton}`);
  }
}


class Teacher extends Person {
  constructor(firstname, lastname, interests, skills) {
    super(firstname, lastname, interests);
    this.skills = skills;
  }

  greet() {
    super.greet();
    this.can_do();
  }

  can_do() {
    console.log(`You can do: ${this.skills.join(', ')}.`);
  }
}
