/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */

export default class User {
  constructor(data) {
    const {
      id,
      firstname,
      lastname,
      password,
      email,
      type,
    } = data;

    this.id = id;
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
    this.type = type;
  }
}
