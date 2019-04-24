/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server/server';

chai.use(chaiHttp);
chai.should();
describe('Movie', () => {
  describe('GET /api/v1/movie', () => {
    it('should get all available movie', (done) => {
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
  });
  describe('POST /api/v1/', () => {
    it('should return error message if movie title is not string', (done) => {
      const movie = {
        title: 12389, stock: 5, genre: 'thriller',
      };
      chai
        .request(app)
        .post('/api/v1/movie')
        .send(movie)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
        });
      done();
    });
    it('should return error message if movie title is empty', (done) => {
      const movie = {
        title: '', stock: 10, genre: 'thriller',
      };
      chai
        .request(app)
        .post('/api/v1/movie')
        .send(movie)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
        });
      done();
    });
    it('should return error message if movie stock is not number', (done) => {
      const movie = {
        title: 'the notebook', stock: 'asd', genre: 'thriller',
      };
      chai
        .request(app)
        .post('/api/v1/movie')
        .send(movie)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
        });
      done();
    });
    it('should return error message if movie stock is empty', (done) => {
      const movie = {
        title: 'the notebook', stock: '', genre: 'thriller',
      };
      chai
        .request(app)
        .post('/api/v1/movie')
        .send(movie)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
        });
      done();
    });
    it('should return error message if movie genre is empty', (done) => {
      const movie = {
        title: 'the notebook', stock: 10, genre: '',
      };
      chai
        .request(app)
        .post('/api/v1/movie')
        .send(movie)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
        });
      done();
    });
    it('should return error message if movie genre is not string', (done) => {
      const movie = {
        title: 'the notebook', stock: 10, genre: 123939,
      };
      chai
        .request(app)
        .post('/api/v1/movie')
        .send(movie)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('should insert new movie if is valid', (done) => {
      const movie = {
        title: 'the notebook', stock: 10, genre: 'thriller',
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
  });
  describe('GET /api/v1/movie/', () => {
    it('should return error message if movie ID is invalid', (done) => {
      chai
        .request(app)
        .get('/api/v1/movie/mee')
        .end((err, res) => {
          res.body.should.have.property('status').eql(404);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
        });
      done();
    });
    it('should fetch movie if movie ID is valid', (done) => {
      chai
        .request(app)
        .get('/api/v1/movie/2')
        .end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.be.an('object');
        });
      done();
    });
  });
  describe('DELETE /api/v1/movie/', () => {
    it('should return error message if movie ID is invalid', (done) => {
      chai
        .request(app)
        .delete('/api/v1/movie/meee')
        .end((err, res) => {
          res.body.should.have.property('status').eql(404);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('should delete a movie if ID is valid', (done) => {
      chai
        .request(app)
        .delete('/api/v1/movie/1')
        .end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').to.be.eql('movie deleted successfully');
        });
      done();
    });
  });
  describe('PUT /api/v1/movie/', () => {
    it('should return error message if movie ID is invalid', (done) => {
      const movie = {
        title: 'the notebook', stock: 5, genre: 'thriller',
      };
      chai
        .request(app)
        .put('/api/v1/movie/meeee')
        .send(movie)
        .end((err, res) => {
          res.body.should.have.property('status').eql(404);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
        });
      done();
    });
    it('should return error message if movie title is not string', (done) => {
      const movie = {
        title: 12389, stock: 5, genre: 'thriller',
      };
      chai
        .request(app)
        .put('/api/v1/movie/2')
        .send(movie)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
        });
      done();
    });
    it('should return error message if movie stock is not number', (done) => {
      const movie = {
        title: 'the notebook', stock: 'asd', genre: 'thriller',
      };
      chai
        .request(app)
        .put('/api/v1/movie/2')
        .send(movie)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
        });
      done();
    });
    it('should return error message if movie genre is not string', (done) => {
      const movie = {
        title: 'the notebook', stock: 10, genre: 123939,
      };
      chai
        .request(app)
        .put('/api/v1/movie/2')
        .send(movie)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('should update a movie if ID exist', (done) => {
      chai
        .request(app)
        .put('/api/v1/movie/3')
        .send({ title: 'fifty shades' })
        .end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').to.be.eql('movie updated successfully');
        });
      done();
    });
  });
});
