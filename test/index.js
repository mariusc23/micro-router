const { expect } = require('chai')
const sinon = require('sinon')
const { router } = require('../')

describe('router', () => {
  it('should call route handler', () => {
    const routes = {
      '/': sinon.spy(),
    }
    const req = {
      url: '/',
    }
    const res = {}
    router(routes)(req, res)
    expect(routes['/'].calledWith(req, res)).to.equal(true)
  })

  it('should throw 404 when no match', () => {
    const routes = {
      '/': sinon.spy(),
    }
    const req = {
      url: '/404',
    }
    const res = {}
    try {
      router(routes)(req, res)
    } catch (err) {
      expect(err.statusCode).to.equal(404)
      expect(err.message).to.equal('Not Found')
    }
  })

  it('should act as middleware if passed in only one argument', () => {
    const spy = sinon.spy()
    const routes = {
      '/': sinon.spy(),
    }
    const req = {
      url: '/',
    }
    const res = {}
    router(routes)(spy)(req, res)
    expect(routes['/'].calledWith(req, res)).to.equal(true)
  })

  it('should call next middleware if no match', () => {
    const spy = sinon.spy()
    const routes = {
      '/': sinon.spy(),
    }
    const req = {
      url: '/404',
    }
    const res = {}
    router(routes)(spy)(req, res)
    expect(spy.calledWith(req, res)).to.equal(true)
    expect(routes['/'].called).to.equal(false)
  })

  it('should throw 404 if no match and no next middleware', () => {
    const routes = {
      '/': sinon.spy(),
    }
    const req = {
      url: '/404',
    }
    const res = {}
    try {
      router(routes)(null)(req, res)
    } catch (err) {
      expect(err.statusCode).to.equal(404)
      expect(err.message).to.equal('Not Found')
    }
  })
})
