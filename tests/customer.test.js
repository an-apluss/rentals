/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server/server';

chai.use(chaiHttp);
chai.should();
describe('Customer', () => {
  describe('GET /api/v1/customer', () => {
    it('should fetch all customers when this endpoint is hit', (done) => {
      chai
        .request(app)
        .get('/api/v1/customer')
        .end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.be.an('object');
          res.body.should.have.property('data').to.be.an('array');
        });
      done();
    });
  });
  describe('POST /api/v1/customer', () => {
    it('should return error message if customer firstname is not string', (done) => {
      const customer = {
        firstname: 111, lastname: 'Akinseye', phone: '08134326603',
      };
      chai
        .request(app)
        .post('/api/v1/customer')
        .send(customer)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
        });
      done();
    });
    it('should return error message if customer firstname is empty', (done) => {
      const customer = {
        firstname: '', lastname: 'Akinseye', phone: '08134326603',
      };
      chai
        .request(app)
        .post('/api/v1/customer')
        .send(customer)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
        });
      done();
    });
    it('should return error message if customer lastname is not string', (done) => {
      const customer = {
        firstname: 'Anuoluwapo', lastname: 1111, phone: '08134326603',
      };
      chai
        .request(app)
        .post('/api/v1/customer')
        .send(customer)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
        });
      done();
    });
    it('should return error message if customer lastname is empty', (done) => {
      const customer = {
        firstname: 'Anuoluwapo', lastname: '', phone: '08134326603',
      };
      chai
        .request(app)
        .post('/api/v1/customer')
        .send(customer)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
        });
      done();
    });
    it('should return error message if customer phone number is empty', (done) => {
      const customer = {
        firstname: 'Anuoluwapo', lastname: '', phone: '',
      };
      chai
        .request(app)
        .post('/api/v1/customer')
        .send(customer)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
        });
      done();
    });
    it('should return error message if customer phone number is not numeric string', (done) => {
      const customer = {
        firstname: 'Anuoluwapo', lastname: '', phone: 'abcd',
      };
      chai
        .request(app)
        .post('/api/v1/customer')
        .send(customer)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
          res.body.should.have.property('error');
        });
      done();
    });
    it('should insert new customer if data are valid', (done) => {
      const customer = {
        firstname: 'Anuoluwapo', lastname: 'Akinseye', phone: '08134326603',
      };
      chai
        .request(app)
        .post('/api/v1/customer')
        .send(customer)
        .end((err, res) => {
          res.body.should.have.property('status').eql(201);
          res.body.should.be.an('object');
          res.body.should.have.property('message').to.be.eql('customer successfully added');
        });
      done();
    });
  });
  describe('GET /api/v1/customer/', () => {
    it('should return error message if customer ID does not exist', (done) => {
      chai
        .request(app)
        .get('/api/v1/customer/meee')
        .end((err, res) => {
          res.body.should.have.property('status').eql(404);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('should fetch customer data if customer ID exist', (done) => {
      chai
        .request(app)
        .get('/api/v1/customer/1')
        .end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.be.an('object');
        });
      done();
    });
  });
  describe('DELETE /api/v1/customer', () => {
    it('should return error message if customer ID is invalid', (done) => {
      chai
        .request(app)
        .delete('/api/v1/customer/meee')
        .end((err, res) => {
          res.body.should.have.property('status').eql(404);
          res.body.should.have.property('error');
        });
      done();
    });
    it('should delete customer if ID exist', (done) => {
      chai
        .request(app)
        .delete('/api/v1/customer/1')
        .end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').to.be.eql('customer deleted successfully');
        });
      done();
    });
  });
  describe('PUT /api/v1/customer', () => {
    it('should return error message if customer ID is not valid', (done) => {
      chai
        .request(app)
        .put('/api/v1/customer/20000000023')
        .send({ firstname: 'Bolanle' })
        .end((err, res) => {
          res.body.should.have.property('status').eql(404);
          res.body.should.have.property('error');
        });
      done();
    });
    it('should return error message if customer firstname is not string', (done) => {
      chai
        .request(app)
        .put('/api/v1/customer/3')
        .send({ firstname: 11999, lastname: 'funke', phone: '8134326603' })
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
        });
      done();
    });
    it('should return error message if customer lastname is not string', (done) => {
      chai
        .request(app)
        .put('/api/v1/customer/2')
        .send({ firstname: 'funke', lastname: 1112, phone: '8134326603' })
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
        });
      done();
    });
    it('should return error message if customer phone number is not a numeric string', (done) => {
      chai
        .request(app)
        .put('/api/v1/customer/2')
        .send({ firstname: 'funke', lastname: 'kelani', phone: 'abcd' })
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
        });
      done();
    });
    it('should update customer data if is valid', (done) => {
      chai
        .request(app)
        .put('/api/v1/customer/2')
        .send({ firstname: 'funke', lastname: 'kelani', phone: '8134326603' })
        .end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').to.be.eql('Customer updated successfully');
        });
      done();
    });
  });
});
