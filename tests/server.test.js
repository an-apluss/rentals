import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server';

chai.use(chaiHttp);
chai.should();
describe('Rental', () => {
  describe('GET /', () => {
    it('When / url pattern is encounter return its content', (done) => {
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
  describe('Genres', () => {
    it('get all available genres when this endpoint is hit', (done) => {
      chai
        .request(app)
        .get('/api/v1/genres')
        .end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.be.an('object');
          res.body.should.have.property('data').to.be.an('array');
        });
      done();
    });
  });
});
