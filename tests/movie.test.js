/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server/server';

chai.use(chaiHttp);
chai.should();
describe('Movie', () => {
  it('get all available movies when this endpoint is hit', (done) => {
    chai
      .request(app)
      .get('/api/v1/movie')
      .end((err, res) => {
        res.body.should.have.property('status').eql(200);
        res.body.should.be.an('object');
        res.body.should.have.property('data').to.be.an('array');
      });
    done();
  });
  it('insert new movie when this endpoint is hit', (done) => {
    const movie = {
      id: 1, title: 'the notebook', qty: 10, genreId: 1,
    };
    chai
      .request(app)
      .post('/api/v1/movie')
      .send(movie)
      .end((err, res) => {
        res.body.should.have.property('status').eql(201);
        res.body.should.be.an('object');
        res.body.should.have.property('message').to.be.eql('movie successfully added');
      });
    done();
  });
  it('get a movie by ID when this endpoint is hit', (done) => {
    chai
      .request(app)
      .get('/api/v1/movie/1')
      .end((err, res) => {
        res.body.should.have.property('status').eql(200);
        res.body.should.be.an('object');
      });
    done();
  });
  it('delete a movie by ID when this endpoint is hit', (done) => {
    chai
      .request(app)
      .delete('/api/v1/movie/1')
      .end((err, res) => {
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message').to.be.eql('movie deleted successfully');
      });
    done();
  });
  it('update a movie by ID when this endpoint is hit', (done) => {
    chai
      .request(app)
      .put('/api/v1/movie/2')
      .send({ title: 'fifty shades' })
      .end((err, res) => {
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message').to.be.eql('movie updated successfully');
      });
    done();
  });
});
