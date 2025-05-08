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
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('/POST Meetings', function () {
    it('Insert new Meeting', function (done) {
      var meeting = {
        agenda: 'Project Kickoff Meeting',
        location: 'Conference Room A',
        dateTime: new Date().toISOString(),
        notes: 'Initial project planning and team introduction',
        related: 'Project X',
        createBy: '507f1f77bcf86cd799439011',
        attendes: [],
        attendesLead: [],
      };
      chai
        .request(app)
        .post('/api/meeting')
        .set('Authorization', testToken)
        .send(meeting)
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('/DELETE/:id Meeting', function () {
    it('Delete Meeting by id', function (done) {
      Meeting.create({
        agenda: 'Test Meeting',
        attendes: [],
        attendesLead: [],
        location: 'Test Location',
        related: 'Contact',
        dateTime: new Date(),
        notes: 'Test Notes',
        createBy: '507f1f77bcf86cd799439011',
      })
        .then(function (meeting) {
          return chai
            .request(app)
            .delete('/api/meeting/delete/' + meeting._id)
            .set('Authorization', testToken);
        })
        .then(function (res) {
          res.should.have.status(200);
          res.body.should.have
            .property('message')
            .eql('Meeting deleted successfully');
          done();
        })
        .catch(function (err) {
          done(err);
        });
    });
  });

  describe('/DELETE Multiple Meetings', function () {
    it('Delete multiple meetings', function (done) {
      // Create first meeting
      Meeting.create({
        agenda: 'Test Meeting 1',
        attendes: [],
        attendesLead: [],
        location: 'Test Location 1',
        related: 'Contact',
        dateTime: new Date(),
        notes: 'Test Notes 1',
        createBy: '507f1f77bcf86cd799439011',
      })
        .then(function (meeting1) {
          // Create second meeting
          return Meeting.create({
            agenda: 'Test Meeting 2',
            attendes: [],
            attendesLead: [],
            location: 'Test Location 2',
            related: 'Lead',
            dateTime: new Date(),
            notes: 'Test Notes 2',
            createBy: '507f1f77bcf86cd799439011',
          }).then(function (meeting2) {
            return [meeting1, meeting2];
          });
        })
        .then(function (meetings) {
          const meetingIds = meetings.map((meeting) => meeting._id);
          return chai
            .request(app)
            .post('/api/meeting/deleteMany')
            .set('Authorization', testToken)
            .send(meetingIds);
        })
        .then(function (res) {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('done');
          res.body.should.have.property('updatedMeetings');
          res.body.updatedMeetings.should.be.an('object');
          res.body.updatedMeetings.should.have
            .property('acknowledged')
            .eql(true);
          res.body.updatedMeetings.should.have.property('modifiedCount').eql(2);
          res.body.updatedMeetings.should.have.property('upsertedId').eql(null);
          res.body.updatedMeetings.should.have.property('upsertedCount').eql(0);
          res.body.updatedMeetings.should.have.property('matchedCount').eql(2);
          done();
        })
        .catch(function (err) {
          done(err);
        });
    });
  });
});
