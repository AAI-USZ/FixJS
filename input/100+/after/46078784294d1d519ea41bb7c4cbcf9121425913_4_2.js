function() {
  var Backbone, assert, describe, generateTestSuite, joe, modelsObject, queryEngine, store, today, tomorrow, yesterday,
    __hasProp = {}.hasOwnProperty;

  queryEngine = (typeof require === "function" ? require(__dirname + '/../lib/query-engine.js') : void 0) || this.queryEngine;

  assert = (typeof require === "function" ? require('assert') : void 0) || this.assert;

  Backbone = (typeof require === "function" ? require('backbone') : void 0) || this.Backbone;

  joe = (typeof require === "function" ? require('joe') : void 0) || this.joe;

  describe = joe.describe;

  today = new Date();

  today.setHours(0);

  today.setMinutes(0);

  today.setSeconds(0);

  tomorrow = new Date();

  tomorrow.setDate(today.getDate() + 1);

  yesterday = new Date();

  yesterday.setDate(today.getDate() - 1);

  modelsObject = {
    'index': {
      id: 'index',
      title: 'Index Page',
      content: 'this is the index page',
      tags: [],
      position: 1,
      positionNullable: null,
      category: 1,
      date: today,
      good: true,
      obj: {
        a: 1,
        b: 2
      }
    },
    'jquery': {
      id: 'jquery',
      title: 'jQuery',
      content: 'this is about jQuery',
      tags: ['jquery'],
      position: 2,
      positionNullable: 2,
      category: 1,
      date: yesterday,
      good: false
    },
    'history': {
      id: 'history',
      title: 'History.js',
      content: 'this is about History.js',
      tags: ['jquery', 'html5', 'history'],
      position: 3,
      positionNullable: 3,
      category: 1,
      date: tomorrow
    }
  };

  store = {
    associatedStandard: queryEngine.createCollection(modelsObject),
    associatedModels: queryEngine.createCollection({
      'index': new Backbone.Model(modelsObject.index),
      'jquery': new Backbone.Model(modelsObject.jquery),
      'history': new Backbone.Model(modelsObject.history)
    })
  };

  generateTestSuite = function(describe, it, name, docs) {
    return describe(name, function(describe, it) {
      it('beginsWith', function() {
        var actual, expected;
        actual = docs.findAll({
          title: {
            $beginsWith: 'Index'
          }
        });
        expected = queryEngine.createCollection({
          'index': docs.get('index')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('endsWidth', function() {
        var actual, expected;
        actual = docs.findAll({
          title: {
            $endsWith: '.js'
          }
        });
        expected = queryEngine.createCollection({
          'history': docs.get('history')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('string', function() {
        var actual, expected;
        actual = docs.findAll({
          id: 'index'
        });
        expected = queryEngine.createCollection({
          'index': docs.get('index')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('number', function() {
        var actual, expected;
        actual = docs.findAll({
          position: 3
        });
        expected = queryEngine.createCollection({
          'history': docs.get('history')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('date', function() {
        var actual, expected;
        actual = docs.findAll({
          date: today
        });
        expected = queryEngine.createCollection({
          'index': docs.get('index')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('regex', function() {
        var actual, expected;
        actual = docs.findAll({
          id: /^[hj]/
        });
        expected = queryEngine.createCollection({
          'jquery': docs.get('jquery'),
          'history': docs.get('history')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('joint', function() {
        var actual, expected;
        actual = docs.findAll({
          id: 'index',
          category: 1
        });
        expected = queryEngine.createCollection({
          'index': docs.get('index')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('boolean-true', function() {
        var actual, expected;
        actual = docs.findAll({
          good: true
        });
        expected = queryEngine.createCollection({
          'index': docs.get('index')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('boolean-false', function() {
        var actual, expected;
        actual = docs.findAll({
          good: false
        });
        expected = queryEngine.createCollection({
          'jquery': docs.get('jquery')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('$and', function() {
        var actual, expected;
        actual = docs.findAll({
          $and: [
            {
              id: 'index'
            }, {
              position: 1
            }
          ]
        });
        expected = queryEngine.createCollection({
          'index': docs.get('index')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('$and-none', function() {
        var actual, expected;
        actual = docs.findAll({
          $and: [
            {
              random: Math.random()
            }
          ]
        });
        expected = queryEngine.createCollection();
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('$not', function() {
        var actual, expected;
        actual = docs.findAll({
          $not: [
            {
              id: 'index'
            }, {
              position: 1
            }
          ]
        });
        expected = queryEngine.createCollection({
          'jquery': docs.get('jquery'),
          'history': docs.get('history')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('$or', function() {
        var actual, expected;
        actual = docs.findAll({
          $or: [
            {
              id: 'index'
            }, {
              position: 2
            }
          ]
        });
        expected = queryEngine.createCollection({
          'index': docs.get('index'),
          'jquery': docs.get('jquery')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('$or-object', function() {
        var actual, expected;
        actual = docs.findAll({
          $or: {
            id: 'index',
            position: 2
          }
        });
        expected = queryEngine.createCollection({
          'index': docs.get('index'),
          'jquery': docs.get('jquery')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('$or-none', function() {
        var actual, expected;
        actual = docs.findAll({
          $or: [
            {
              random: Math.random()
            }
          ]
        });
        expected = queryEngine.createCollection();
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('$nor', function() {
        var actual, expected;
        actual = docs.findAll({
          $nor: [
            {
              id: 'index'
            }, {
              position: 2
            }
          ]
        });
        expected = queryEngine.createCollection({
          'history': docs.get('history')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('$nor-none', function() {
        var actual, expected;
        actual = docs.findAll({
          $nor: [
            {
              random: Math.random()
            }
          ]
        });
        expected = docs;
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('$ne', function() {
        var actual, expected;
        actual = docs.findAll({
          id: {
            $ne: 'index'
          }
        });
        expected = queryEngine.createCollection({
          'jquery': docs.get('jquery'),
          'history': docs.get('history')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('$all', function() {
        var actual, expected;
        actual = docs.findAll({
          tags: {
            $all: ['jquery']
          }
        });
        expected = queryEngine.createCollection({
          'jquery': docs.get('jquery')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('$in', function() {
        var actual, expected;
        actual = docs.findAll({
          tags: {
            $in: ['jquery']
          }
        });
        expected = queryEngine.createCollection({
          'jquery': docs.get('jquery'),
          'history': docs.get('history')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('$nin', function() {
        var actual, expected;
        actual = docs.findAll({
          tags: {
            $nin: ['history']
          }
        });
        expected = queryEngine.createCollection({
          'index': docs.get('index'),
          'jquery': docs.get('jquery')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('$size', function() {
        var actual, expected;
        actual = docs.findAll({
          tags: {
            $size: 3
          }
        });
        expected = queryEngine.createCollection({
          'history': docs.get('history')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('$like', function() {
        var actual, expected;
        actual = docs.findAll({
          content: {
            $like: 'INDEX'
          }
        });
        expected = queryEngine.createCollection({
          'index': docs.get('index')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('$likeSensitive', function() {
        var actual, expected;
        actual = docs.findAll({
          content: {
            $likeSensitive: 'INDEX'
          }
        });
        expected = queryEngine.createCollection();
        assert.deepEqual(actual.toJSON(), expected.toJSON());
        actual = docs.findAll({
          content: {
            $likeSensitive: 'index'
          }
        });
        expected = queryEngine.createCollection({
          'index': docs.get('index')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('$mod', function() {
        var actual, expected;
        actual = docs.findAll({
          position: {
            $mod: [2, 0]
          }
        });
        expected = queryEngine.createCollection({
          'jquery': docs.get('jquery')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('$eq', function() {
        var actual, expected;
        actual = docs.findAll({
          obj: {
            $eq: {
              a: 1,
              b: 2
            }
          }
        });
        expected = queryEngine.createCollection({
          'index': docs.get('index')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('$bt', function() {
        var actual, expected;
        actual = docs.findAll({
          position: {
            $bt: [1, 3]
          }
        });
        expected = queryEngine.createCollection({
          'jquery': docs.get('jquery')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('$bte', function() {
        var actual, expected;
        actual = docs.findAll({
          position: {
            $bte: [2, 3]
          }
        });
        expected = queryEngine.createCollection({
          'jquery': docs.get('jquery'),
          'history': docs.get('history')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('$gt', function() {
        var actual, expected;
        actual = docs.findAll({
          position: {
            $gt: 2
          }
        });
        expected = queryEngine.createCollection({
          'history': docs.get('history')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('$gt-date', function() {
        var actual, expected;
        actual = docs.findAll({
          date: {
            $gt: today
          }
        });
        expected = queryEngine.createCollection({
          'history': docs.get('history')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('$gte', function() {
        var actual, expected;
        actual = docs.findAll({
          position: {
            $gte: 2
          }
        });
        expected = queryEngine.createCollection({
          'jquery': docs.get('jquery'),
          'history': docs.get('history')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('$lt', function() {
        var actual, expected;
        actual = docs.findAll({
          position: {
            $lt: 2
          }
        });
        expected = queryEngine.createCollection({
          'index': docs.get('index')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('$lt-date', function() {
        var actual, expected;
        actual = docs.findAll({
          date: {
            $lt: today
          }
        });
        expected = queryEngine.createCollection({
          'jquery': docs.get('jquery')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('$lte', function() {
        var actual, expected;
        actual = docs.findAll({
          position: {
            $lte: 2
          }
        });
        expected = queryEngine.createCollection({
          'index': docs.get('index'),
          'jquery': docs.get('jquery')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('$lte-date', function() {
        var actual, expected;
        actual = docs.findAll({
          date: {
            $lte: today
          }
        });
        expected = queryEngine.createCollection({
          'index': docs.get('index'),
          'jquery': docs.get('jquery')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('all', function() {
        var actual, expected;
        actual = docs;
        expected = docs;
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      it('findOne', function() {
        var actual, expected;
        actual = docs.findOne({
          tags: {
            $has: 'jquery'
          }
        });
        expected = docs.get('jquery');
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      });
      describe('nullable', function(describe, it) {
        it("null values should show up when searching for them", function() {
          var actual, expected;
          actual = docs.findAll({
            positionNullable: null
          });
          expected = queryEngine.createCollection({
            'index': docs.get('index')
          });
          return assert.deepEqual(actual.toJSON(), expected.toJSON());
        });
        it("null values shouldn't show up in greater than or equal to comparisons", function() {
          var actual, expected;
          actual = docs.findAll({
            positionNullable: {
              $gte: 0
            }
          });
          expected = queryEngine.createCollection({
            'jquery': docs.get('jquery'),
            'history': docs.get('history')
          });
          return assert.deepEqual(actual.toJSON(), expected.toJSON());
        });
        return it("null values shouldn't show up in less than comparisons", function() {
          var actual, expected;
          actual = docs.findAll({
            positionNullable: {
              $lte: 3
            }
          });
          expected = queryEngine.createCollection({
            'jquery': docs.get('jquery'),
            'history': docs.get('history')
          });
          return assert.deepEqual(actual.toJSON(), expected.toJSON());
        });
      });
      return describe('paging', function(describe, it) {
        it('limit', function() {
          var actual, expected;
          actual = docs.createChildCollection().query({
            limit: 1
          });
          expected = queryEngine.createCollection({
            'index': docs.get('index')
          });
          return assert.deepEqual(actual.toJSON(), expected.toJSON());
        });
        it('limit+page', function() {
          var actual, expected;
          actual = docs.createChildCollection().query({
            limit: 1,
            page: 2
          });
          expected = queryEngine.createCollection({
            'jquery': docs.get('jquery')
          });
          return assert.deepEqual(actual.toJSON(), expected.toJSON());
        });
        it('limit+offset', function() {
          var actual, expected;
          actual = docs.createChildCollection().query({
            limit: 1,
            offset: 1
          });
          expected = queryEngine.createCollection({
            'jquery': docs.get('jquery')
          });
          return assert.deepEqual(actual.toJSON(), expected.toJSON());
        });
        it('limit+offset+page', function() {
          var actual, expected;
          actual = docs.createChildCollection().query({
            limit: 1,
            offset: 1,
            page: 2
          });
          expected = queryEngine.createCollection({
            'history': docs.get('history')
          });
          return assert.deepEqual(actual.toJSON(), expected.toJSON());
        });
        it('limit+offset+page (via findAll)', function() {
          var actual, expected;
          actual = docs.findAll({
            id: {
              $exists: true
            }
          }, null, {
            limit: 1,
            offset: 1,
            page: 2
          });
          expected = queryEngine.createCollection({
            'history': docs.get('history')
          });
          return assert.deepEqual(actual.toJSON(), expected.toJSON());
        });
        return it('offset', function() {
          var actual, expected;
          actual = docs.createChildCollection().query({
            offset: 1
          });
          expected = queryEngine.createCollection({
            'jquery': docs.get('jquery'),
            'history': docs.get('history')
          });
          return assert.deepEqual(actual.toJSON(), expected.toJSON());
        });
      });
    });
  };

  describe('queries', function(describe, it) {
    var key, value, _results;
    _results = [];
    for (key in store) {
      if (!__hasProp.call(store, key)) continue;
      value = store[key];
      _results.push(generateTestSuite(describe, it, key, value));
    }
    return _results;
  });

  null;

}