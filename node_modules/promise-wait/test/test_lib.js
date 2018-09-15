'use strict'

const assert = require('assert')
const wait = require('..')

describe('promise-wait', () => {
  describe('wait() should resolve correctly', () => {
    it('should resolve correctly', () => {
      return wait(1000)
    })
  })
  describe('wait.resolve() should resolve correctly', () => {
    it('should resolve correctly', () => {
      return wait.resolve(1000)
    })
  })
  describe('wait.reject() should reject correctly', () => {
    it('should resolve correctly', () => {
      return wait.reject(1000).then(() => {
        throw new Error('wait.reject() resolved')
      }, () => {
        // All is good if it rejected
      })
    })
  })
})
