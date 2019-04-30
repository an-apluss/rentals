/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server/server';

chai.use(chaiHttp);
chai.should();

describe('Genres', () => {
  describe('GET /api/v1/genres', () => {
    it('should fetch all available genres', (done) => {
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
  describe('POST /api/v1/genres', () => {
    it('insert genre name should be string', (done) => {
      const genre = { id: 12, name: 123 };
      chai
        .request(app)
        .post('/api/v1/genres')
        .send(genre)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
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
  });
  describe('GET /api/v1/genres', () => {
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
    it('should return error message if genre ID is invalid', (done) => {
      chai
        .request(app)
        .get('/api/v1/genres/mee')
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
  });
  describe('PUT /api/v1/genres', () => {
    it('should return error message if genre ID does not exist', (done) => {
      chai
        .request(app)
        .put('/api/v1/genres/9999.99')
        .send({ name: 'Drama' })
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('should return error message if genre ID is not number', (done) => {
      chai
        .request(app)
        .put('/api/v1/genres/9')
        .send({ id: 'meee', name: 111 })
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('should return error message if genre name is number', (done) => {
      chai
        .request(app)
        .put('/api/v1/genres/9')
        .send({ name: 111 })
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('should update a genre if ID is valid', (done) => {
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
  });
  describe('DELETE /api/v1/genres', () => {
    it('should return error message genre ID is invalid', (done) => {
      chai
        .request(app)
        .delete('/api/v1/genres/mee')
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.be.an('object');
        });
      done();
    });
    it('should delete a genre if ID is exist and valid', (done) => {
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
