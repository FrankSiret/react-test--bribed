process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const Bribed = require('../models/bribed');

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const app = require('../app');
const { expect } = require('chai');
const calculate = require('../controller/bribed');

chai.use(chaiHttp);

const apiUrl = '/v1/bribed';

describe('Bribed', () => {
    beforeEach((done) => {
        Bribed.remove({}, (err) => {
            done();
        });
    });

    /**
     * Testing the /GET route
     */
    describe('/GET Bribed', () => {
        it('it should GET an object containing an array of problems and it should be blank!', (done) => {
            chai.request(app)
                .get(apiUrl)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.eql({ success: true, data: [] });
                    res.body.data.length.should.be.eql(0);
                    done()
                });
        });
        it('it should GET an object containing an array of problems and it should contain only one item', (done) => {
            let bribed = new Bribed({
                uid: 1,
                queue: [1, 2, 3],
            });
            bribed.save((err, bribed) => {
                chai.request(app)
                    .get(apiUrl)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.should.be.a('array');
                        res.body.data.length.should.be.eql(1);
                        done();
                    });
            });
        });
    });

    /**
     * Testing /POST for route /v1/bribed
     */
    describe('/POST Bribed', () => {
        it('it should create a new Problem with number of bribes equal to 0', (done) => {
            let bribed = {
                queue: [1, 2, 3],
            }
            chai.request(app)
                .post(apiUrl)
                .send(bribed)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('queue').eql([1, 2, 3]);
                    res.body.data.should.have.property('solution');
                    res.body.data.solution.should.have.property('bribed').eql(0);
                    done();
                })
        });
        it('it should NOT create a new Problem because the provide queue is not valid', (done) => {
            let bribed = {
                queue: [1, 4, 2],
            }
            chai.request(app)
                .post(apiUrl)
                .send(bribed)
                .end((err, res) => {
                    expect(err).to.be.null;
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('errors');
                    res.body.errors.length.should.be.eql(1);
                    expect(res.body.errors).to.be.an('array').that.deep.include({
                        "value": [
                            1,
                            4,
                            2
                        ],
                        "msg": "Elements on \"queue\" must be values from 1 to n, arbitrarily ordered",
                        "param": "queue",
                        "location": "body"
                    });
                    done();
                })
        });
        it('it should NOT create the problem because query is NOT provided', (done) => {
            chai.request(app)
                .post(apiUrl)
                .send({})
                .end((err, res) => {
                    expect(err).to.be.null;
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Invalid field')
                    done();
                })
        });
        it('it should create a problem where the solution is Too Chaotic', (done) => {
            let bribed = {
                queue: [4, 2, 1, 3]
            }
            chai.request(app)
                .post(apiUrl)
                .send(bribed)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('solution');
                    res.body.data.solution.should.have.property('tooChaotic').eql(true);
                    done();
                })
        });
    });

    /**
     * Testing DELETE
     */
    describe('/DELETE Bribed', () => {
        it('it should DELETE a problem normally!', (done) => {
            const solution = calculate([1, 3, 2])
            let bribed = new Bribed({
                queue: [1, 3, 2],
                solution
            });
            bribed.save((err) => {
                chai.request(app)
                    .delete(`${apiUrl}/${bribed._id}`)
                    .end((err, res) => {
                        expect(err).to.be.null;
                        res.should.have.status(204);
                        done()
                    });
            });
        });
    });
});

