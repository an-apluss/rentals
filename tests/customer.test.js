/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server';

chai.use(chaiHttp);
chai.should();
describe('Customer', () => {
  it('get all available customers when this endpoint is hit', (done) => {
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
  it('insert new customer when this endpoint is hit', (done) => {
    const customer = {
      id: 1, firstname: 'Anuoluwapo', lastname: 'Akinseye', phone: '08134326603',
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
