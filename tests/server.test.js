import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server';
// import GenreController from '../controllers/genreController';

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
    it('insert a new genre', (done) => {
      const genre = { id: 12, name: 'drama' };
      chai
        .request(app)
        .post('/api/v1/genres')
        .send(genre)
        .end((err, res) => {
          res.body.should.have.property('status').eql(201);
          res.body.should.be.an('object');
        });
      done();
    });
    it('Get a genre by ID', (done) => {
      chai
        .request(app)
        .get('/api/v1/genres/11')
        .end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.be.an('object');
        });
      done();
    });
    it('Update a genre by ID', (done) => {
      chai
        .request(app)
        .put('/api/v1/genres/11')
        .send({ name: 'Drama' })
        .end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.be.an('object');
        });
      done();
    });
    it('Delete a genre by ID', (done) => {
      chai
        .request(app)
        .delete('/api/v1/genres/10')
        .end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.be.an('object');
        });
      done();
    });
  });
});
