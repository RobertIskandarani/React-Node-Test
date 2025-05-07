var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index');
var should = chai.should();
var Meeting = require('../model/schema/meeting');
var jwt = require('jsonwebtoken');

chai.use(chaiHttp);

// Create a test token
const testToken = jwt.sign({ id: 'test-user-id' }, 'secret_key');

describe('Meeting API', function () {
  //Before each test we empty the database
  beforeEach(function (done) {
    Meeting.deleteMany({
      where: {},
      truncate: true,
    });
    done();
  });

  describe('/GET Meetings', function () {
    it('Getting all Meetings', function (done) {
      chai
        .request(app)
        .get('/api/meeting')
        .set('Authorization', testToken)
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.meetings.should.be.a('array');
          done();
        });
    });
  });

  //   describe('/POST Products', function () {
  //     it('Insert new Product', function (done) {
  //       var Product = {
  //         title: 'Jack Ma',
  //         author: 'Chen Wei',
  //         category: 'Biography',
  //       };
  //       chai
  //         .request(app)
  //         .post('/Products')
  //         .send(Product)
  //         .end(function (err, res) {
  //           res.should.have.status(200);
  //           res.body.should.be.a('object');
  //           done();
  //         });
  //     });
  //   });
  //   describe('/GET/:id Products', function () {
  //     it('Get Product by id', function (done) {
  //       Product.create({
  //         title: 'Jack Ma',
  //         author: 'Chen Wei',
  //         category: 'Biography',
  //       }).then(function (Product) {
  //         chai
  //           .request(app)
  //           .get('/Products/' + Product.id)
  //           .end(function (err, res) {
  //             res.should.have.status(200);
  //             res.body.should.be.a('object');
  //             done();
  //           });
  //       });
  //     });
  //     it('Get Product by not existed id', function (done) {
  //       chai
  //         .request(app)
  //         .get('/Products/100')
  //         .end(function (err, res) {
  //           res.should.have.status(400);
  //           res.body.should.equal('Product not found');
  //           done();
  //         });
  //     });
  //     it('Get Product by invalid id', function (done) {
  //       chai
  //         .request(app)
  //         .get('/Products/abc')
  //         .end(function (err, res) {
  //           res.should.have.status(400);
  //           res.body.should.equal('Invalid ID supplied');
  //           done();
  //         });
  //     });
  //   });
  //   describe('/PUT/:id Products', function () {
  //     it('Update Product by id', function (done) {
  //       Product.create({
  //         title: 'Jack Ma',
  //         author: 'Chen Wei',
  //         category: 'Biography',
  //       }).then(function (Product) {
  //         var ProductEdit = {
  //           title: 'Amor Fati',
  //           author: 'Rando Kim',
  //           category: 'Non Fiction',
  //         };
  //         chai
  //           .request(app)
  //           .put('/Products/' + Product.id)
  //           .send(ProductEdit)
  //           .end(function (err, res) {
  //             res.should.have.status(200);
  //             res.body.should.be.a('array');
  //             done();
  //           });
  //       });
  //     });
  //   });
  //   describe('/DELETE/:id Products', function () {
  //     it('Delete Product by id', function (done) {
  //       Product.create({
  //         title: 'Jack Ma',
  //         author: 'Chen Wei',
  //         category: 'Biography',
  //       }).then(function (Product) {
  //         chai
  //           .request(app)
  //           .delete('/Products/' + Product.id)
  //           .end(function (err, res) {
  //             res.should.have.status(200);
  //             res.body.should.equal(1);
  //             done();
  //           });
  //       });
  //     });
  //   });
});
