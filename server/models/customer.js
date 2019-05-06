/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */

export default class Customer {
  constructor(data) {
    const {
      id,
      firstname,
      lastname,
      phone,
    } = data;

    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.phone = phone;
  }
}
