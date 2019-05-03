/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server/server';

chai.use(chaiHttp);
chai.should();

describe('User', () => {
  let adminToken;
  let staffToken;

  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({ email: 'ann@gmail.com', password: 'secret' })
      .end((err, res) => {
        const { token } = res.body.data;
        adminToken = token;
      });
    done();
  });

  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({ email: 'titi@gmail.com', password: 'secret' })
      .end((err, res) => {
        const { token } = res.body.data;
        staffToken = token;
      });
    done();
  });

  describe('POST /api/v1/auth/signup', () => {
    it('user firstname should not be empty', (done) => {
      const user = {
        firstname: '',
        lastname: 'Akin',
        email: 'ann@gmail.com',
        password: 'secret',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('user firstname should not be alphanumeric', (done) => {
      const user = {
        firstname: 'Anu@12. ',
        lastname: 'Akin',
        email: 'ann.com',
        password: 'secret',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('user firstname should be string', (done) => {
      const user = {
        firstname: 123,
        lastname: 'Akin',
        email: 'ann@gmail.com',
        password: 'secret',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('insert user lastname should be string', (done) => {
      const user = {
        firstname: 'Anu',
        lastname: 123,
        email: 'ann@gmail.com',
        password: 'secret',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('user lastname should not be alphanumeric', (done) => {
      const user = {
        firstname: 'Anu',
        lastname: 'Akin@12. ',
        email: 'ann.com',
        password: 'secret',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('insert user lastname should not be empty', (done) => {
      const user = {
        firstname: 'Anu',
        lastname: '',
        email: 'ann@gmail.com',
        password: 'secret',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('user password should not be empty', (done) => {
      const user = {
        firstname: 'Anu',
        lastname: 'Akin',
        email: 'ann@gmail.com',
        password: '',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('user password should be minimum of 6 characters', (done) => {
      const user = {
        firstname: 'Anu',
        lastname: 'Akin',
        email: 'ann@gmail.com',
        password: 'secr',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('user email should not be empty', (done) => {
      const user = {
        firstname: 'Anu',
        lastname: 'Akin',
        email: '',
        password: 'secr',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('user email should be valid email', (done) => {
      const user = {
        firstname: 'Anu',
        lastname: 'Akin',
        email: 'ann.com',
        password: 'secret',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('user email should be unique', (done) => {
      const user = {
        firstname: 'Anu',
        lastname: 'Akin',
        email: 'ann@gmail.com',
        password: 'secret',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.body.should.have.property('status').eql(409);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('user should be created if no error', (done) => {
      const user = {
        firstname: 'Anu',
        lastname: 'Akin',
        email: 'anu@gmail.com',
        password: 'secret',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.body.should.have.property('status').eql(201);
          res.body.data[0].should.have.property('token');
          res.body.data[0].should.have.property('user').with.keys('id', 'lastname', 'firstname', 'email', 'password', 'type');
          res.body.data[0].user.id.should.be.a('number');
          res.body.data[0].user.firstname.should.be.a('string');
          res.body.data[0].user.lastname.should.be.a('string');
          res.body.data[0].user.email.should.be.a('string');
          res.body.data[0].user.password.should.be.a('string');
          res.body.data[0].user.type.should.be.a('string');
          res.body.should.be.an('object');
        });
      done();
    });
  });
  describe('POST /api/v1/auth/signin', () => {
    it('user email should not be empty', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({ email: '', password: 'secret' })
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('user email should be valid email', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({ email: 'ad.com', password: 'secret' })
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('user password should not be empty', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({ email: 'ann@gmail/com', password: '' })
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('user password should be minimum of 6 characters', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({ email: 'ad.com', password: 'sec' })
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('should return error if user email does not exist', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({ email: 'tunji@yahoomail.com', password: 'secret' })
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('should return error if user password is incorrect', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({ email: 'ann@gmail.com', password: 'secret123554' })
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('should signin user if no error', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({ email: 'ann@gmail.com', password: 'secret' })
        .end((err, res) => {
          res.body.should.have.property('status').eql(200);
          res.body.data[0].should.have.property('token').to.be.a('string');
          res.body.should.be.an('object');
        });
      done();
    });
  });
  describe('POST /api/v1/auth/createuser', () => {
    it('user firstname should not be empty', (done) => {
      const user = {
        firstname: '',
        lastname: 'Adeleke',
        email: 'kunle@gmail.com',
        password: 'secret',
        type: 'staff',
      };
      chai
        .request(app)
        .post('/api/v1/auth/createuser')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(user)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('user firstname should not be alphanumeric', (done) => {
      const user = {
        firstname: 'Kunle123',
        lastname: 'Adeleke',
        email: 'kunle@gmail.com',
        password: 'secret',
        type: 'staff',
      };
      chai
        .request(app)
        .post('/api/v1/auth/createuser')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(user)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('user firstname should be string', (done) => {
      const user = {
        firstname: 1234,
        lastname: 'Adeleke',
        email: 'kunle@gmail.com',
        password: 'secret',
        type: 'staff',
      };
      chai
        .request(app)
        .post('/api/v1/auth/createuser')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(user)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('insert user lastname should be string', (done) => {
      const user = {
        firstname: 'Kunle',
        lastname: 1235,
        email: 'kunle@gmail.com',
        password: 'secret',
        type: 'staff',
      };
      chai
        .request(app)
        .post('/api/v1/auth/createuser')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(user)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('user lastname should not be alphanumeric', (done) => {
      const user = {
        firstname: 'Kunle',
        lastname: 'Adeleke!123',
        email: 'kunle@gmail.com',
        password: 'secret',
        type: 'staff',
      };
      chai
        .request(app)
        .post('/api/v1/auth/createuser')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(user)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('user lastname should not be empty', (done) => {
      const user = {
        firstname: 'Kunle',
        lastname: '',
        email: 'kunle@gmail.com',
        password: 'secret',
        type: 'staff',
      };
      chai
        .request(app)
        .post('/api/v1/auth/createuser')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(user)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('user password should not be empty', (done) => {
      const user = {
        firstname: 'Kunle',
        lastname: 'Adeleke',
        email: 'kunle@gmail.com',
        password: '',
        type: 'staff',
      };
      chai
        .request(app)
        .post('/api/v1/auth/createuser')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(user)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('user password should be minimum of 6 characters', (done) => {
      const user = {
        firstname: 'Kunle',
        lastname: 'Adeleke',
        email: 'kunle@gmail.com',
        password: 'sect',
        type: 'staff',
      };
      chai
        .request(app)
        .post('/api/v1/auth/createuser')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(user)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('user email should not be empty', (done) => {
      const user = {
        firstname: 'Kunle',
        lastname: 'Adeleke',
        email: '',
        password: 'secret',
        type: 'staff',
      };
      chai
        .request(app)
        .post('/api/v1/auth/createuser')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(user)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('user email should be valid email', (done) => {
      const user = {
        firstname: 'Kunle',
        lastname: 'Adeleke',
        email: 'kunle@gmail',
        password: 'secret',
        type: 'staff',
      };
      chai
        .request(app)
        .post('/api/v1/auth/createuser')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(user)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('user email should be unique', (done) => {
      const user = {
        firstname: 'Kunle',
        lastname: 'Adeleke',
        email: 'ann@gmail.com',
        password: 'secret',
        type: 'staff',
      };
      chai
        .request(app)
        .post('/api/v1/auth/makestaff')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(user)
        .end((err, res) => {
          res.body.should.have.property('status').eql(409);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('user type should not be empty', (done) => {
      const user = {
        firstname: 'Kunle',
        lastname: 'Adeleke',
        email: 'kunle@gmail.com',
        password: 'secret',
        type: '',
      };
      chai
        .request(app)
        .post('/api/v1/auth/createuser')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(user)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('user type should be string', (done) => {
      const user = {
        firstname: 'Kunle',
        lastname: 'Adeleke',
        email: 'kunle@gmail.com',
        password: 'secret',
        type: 222,
      };
      chai
        .request(app)
        .post('/api/v1/auth/createuser')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(user)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('user type should not be alphanumeric', (done) => {
      const user = {
        firstname: 'Kunle',
        lastname: 'Adeleke',
        email: 'kunle@gmail.com',
        password: 'secret',
        type: 'admin123!',
      };
      chai
        .request(app)
        .post('/api/v1/auth/createuser')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(user)
        .end((err, res) => {
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('should create user as staff if user is authorized', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/createuser')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          firstname: 'kunle',
          lastname: 'adeleke',
          email: 'kunle@gmail.com',
          password: 'secret',
          type: 'staff',
        })
        .end((err, res) => {
          res.body.should.have.property('status').eql(201);
          res.body.data.should.have.property('lastname');
          res.body.data.should.have.property('firstname');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('type');
          res.body.data.should.have.property('id');
          res.body.should.be.an('object');
        });
      done();
    });
    it('should create user as admin if user is authorized', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/createuser')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          firstname: 'christy',
          lastname: 'dola',
          email: 'christy@gmail.com',
          password: 'secret',
          type: 'admin',
        })
        .end((err, res) => {
          res.body.should.have.property('status').eql(201);
          res.body.data.should.have.property('lastname');
          res.body.data.should.have.property('firstname');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('type');
          res.body.data.should.have.property('id');
          res.body.should.be.an('object');
        });
      done();
    });
    it('should return error message if user role is incorrect', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/makestaff')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          firstname: 'christy',
          lastname: 'dola',
          email: 'christy@gmail.com',
          password: 'secret',
          type: 'somethingelse',
        })
        .end((err, res) => {
          res.body.should.have.property('status').eql(401);
          res.body.should.have.property('error');
          res.body.should.be.an('object');
        });
      done();
    });
    it('should return error message if unauthorize user try to create user as staff or admin', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/makestaff')
        .set('Authorization', `Bearer ${staffToken}`)
        .send({
          firstname: 'kunle',
          lastname: 'adeleke',
          email: 'kunle@gmail.com',
          password: 'secret',
          type: 'staff',
        })
        .end((err, res) => {
          res.body.should.have.property('status').eql(403);
          res.body.should.have.property('error');
          res.body.should.have.property('message').eql('Forbidden: You are unauthorized');
        });
      done();
    });
  });
});
