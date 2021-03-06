/**
 * Test case for serialize.
 * Runs with mocha.
 */
'use strict'

const serialize = require('../lib/serialize.js')
const clayEntity = require('clay-entity')
const { ok, equal, deepEqual } = require('assert')
const clayId = require('clay-id')
const co = require('co')

describe('serialize', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Serialize', () => co(function * () {
    deepEqual(serialize('bar'), { '$$serial': true, $type: 'cly:string', $value: 'bar' })
    deepEqual(serialize(12), { '$$serial': true, $type: 'cly:number', $value: 12 })
    let serialized = serialize.all({
      foo: 'bar',
      baz: new Date('2012/12/12'),
      quz: 12
    })
    deepEqual(Object.keys(serialized), [ 'foo', 'baz', 'quz' ])
  }))

  it('Recursive', () => co(function * () {
    let recursive = serialize.recursive({
      foo: 'bar',
      baz: new Date('2012/12/12'),
      quz: 12,
      nested: {
        nestedFoo: 'bar2',
        nestedBaz: new Date('2012/12/13'),
        nestedQuz: 13
      },
      someId: clayId()
    })
    deepEqual(Object.keys(recursive), [ 'foo', 'baz', 'quz', 'nested', 'someId' ])
    deepEqual(Object.keys(recursive.nested), [ 'nestedFoo', 'nestedBaz', 'nestedQuz' ])
    ok(recursive.someId)
  }))

  it('Entity', () => co(function * () {
    let serialized = serialize({
      entity: clayEntity({ foo: 'bar' })
    })
    ok(serialized)
    equal(serialized.$value.entity.foo, 'bar')
  }))
})

/* global describe, before, after, it */
