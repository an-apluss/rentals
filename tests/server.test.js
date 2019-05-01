/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server/server';

chai.use(chaiHttp);
chai.should();
describe('Rental', () => {
  describe('GET /', () => {
    it('should return message when / url is hit', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').eql('Hello this is a Rental App');
          res.body.should.be.an('object');
        });
      done();
    });
  });
});