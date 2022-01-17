function (test) {
  var matches = function (should_match, selector, doc) {
    var does_match = LocalCollection._matches(selector, doc);
    if (does_match != should_match) {
      // XXX super janky
      test.fail({type: "minimongo-ordering",
                 message: "minimongo match failure: document " +
                 (should_match ? "should match, but doesn't" :
                  "shouldn't match, but does"),
                 selector: JSON.stringify(selector),
                 document: JSON.stringify(doc)
                });
    }
  };

  var match = _.bind(matches, null, true);
  var nomatch = _.bind(matches, null, false);

  // XXX blog post about what I learned while writing these tests (weird
  // mongo edge cases)

  // empty selectors
  match({}, {});
  match({}, {a: 12});

  // scalars
  match(1, {_id: 1, a: 'foo'});
  nomatch(1, {_id: 2, a: 'foo'});
  match('a', {_id: 'a', a: 'foo'});
  nomatch('a', {_id: 'b', a: 'foo'});

  // safety
  nomatch(undefined, {});
  nomatch(undefined, {_id: 'foo'});
  nomatch(false, {_id: 'foo'});
  nomatch(null, {_id: 'foo'});
  nomatch({_id: undefined}, {_id: 'foo'});
  nomatch({_id: false}, {_id: 'foo'});
  nomatch({_id: null}, {_id: 'foo'});

  // matching one or more keys
  nomatch({a: 12}, {});
  match({a: 12}, {a: 12});
  match({a: 12}, {a: 12, b: 13});
  match({a: 12, b: 13}, {a: 12, b: 13});
  match({a: 12, b: 13}, {a: 12, b: 13, c: 14});
  nomatch({a: 12, b: 13, c: 14}, {a: 12, b: 13});
  nomatch({a: 12, b: 13}, {b: 13, c: 14});

  match({a: 12}, {a: [12]});
  match({a: 12}, {a: [11, 12, 13]});
  nomatch({a: 12}, {a: [11, 13]});
  match({a: 12, b: 13}, {a: [11, 12, 13], b: [13, 14, 15]});
  nomatch({a: 12, b: 13}, {a: [11, 12, 13], b: [14, 15]});

  // arrays
  match({a: [1,2]}, {a: [1, 2]});
  match({a: [1,2]}, {a: [[1, 2]]});
  match({a: [1,2]}, {a: [[3, 4], [1, 2]]});
  nomatch({a: [1,2]}, {a: [3, 4]});
  nomatch({a: [1,2]}, {a: [[[1, 2]]]});

  // literal documents
  match({a: {b: 12}}, {a: {b: 12}});
  nomatch({a: {b: 12, c: 13}}, {a: {b: 12}});
  nomatch({a: {b: 12}}, {a: {b: 12, c: 13}});
  match({a: {b: 12, c: 13}}, {a: {b: 12, c: 13}});
  nomatch({a: {b: 12, c: 13}}, {a: {c: 13, b: 12}}); // tested on mongodb
  nomatch({a: {}}, {a: {b: 12}});
  nomatch({a: {b:12}}, {a: {}});
  match(
    {a: {b: 12, c: [13, true, false, 2.2, "a", null, {d: 14}]}},
    {a: {b: 12, c: [13, true, false, 2.2, "a", null, {d: 14}]}});
  match({a: {b: 12}}, {a: {b: 12}, k: 99});

  match({a: {b: 12}}, {a: [{b: 12}]});
  nomatch({a: {b: 12}}, {a: [[{b: 12}]]});
  match({a: {b: 12}}, {a: [{b: 11}, {b: 12}, {b: 13}]});
  nomatch({a: {b: 12}}, {a: [{b: 11}, {b: 12, c: 20}, {b: 13}]});
  nomatch({a: {b: 12, c: 20}}, {a: [{b: 11}, {b: 12}, {c: 20}]});
  match({a: {b: 12, c: 20}}, {a: [{b: 11}, {b: 12, c: 20}, {b: 13}]});

  // null
  match({a: null}, {a: null});
  match({a: null}, {b: 12});
  nomatch({a: null}, {a: 12});
  match({a: null}, {a: [1, 2, null, 3]}); // tested on mongodb
  nomatch({a: null}, {a: [1, 2, {}, 3]}); // tested on mongodb

  // order comparisons: $lt, $gt, $lte, $gte
  match({a: {$lt: 10}}, {a: 9});
  nomatch({a: {$lt: 10}}, {a: 10});
  nomatch({a: {$lt: 10}}, {a: 11});

  match({a: {$gt: 10}}, {a: 11});
  nomatch({a: {$gt: 10}}, {a: 10});
  nomatch({a: {$gt: 10}}, {a: 9});

  match({a: {$lte: 10}}, {a: 9});
  match({a: {$lte: 10}}, {a: 10});
  nomatch({a: {$lte: 10}}, {a: 11});

  match({a: {$gte: 10}}, {a: 11});
  match({a: {$gte: 10}}, {a: 10});
  nomatch({a: {$gte: 10}}, {a: 9});

  match({a: {$lt: 10}}, {a: [11, 9, 12]});
  nomatch({a: {$lt: 10}}, {a: [11, 12]});

  // (there's a full suite of ordering test elsewhere)
  match({a: {$lt: "null"}}, {a: null}); // tested against mongodb
  match({a: {$lt: {x: [2, 3, 4]}}}, {a: {x: [1, 3, 4]}});
  match({a: {$gt: {x: [2, 3, 4]}}}, {a: {x: [3, 3, 4]}});
  nomatch({a: {$gt: {x: [2, 3, 4]}}}, {a: {x: [1, 3, 4]}});
  nomatch({a: {$gt: {x: [2, 3, 4]}}}, {a: {x: [2, 3, 4]}});
  nomatch({a: {$lt: {x: [2, 3, 4]}}}, {a: {x: [2, 3, 4]}});
  match({a: {$gte: {x: [2, 3, 4]}}}, {a: {x: [2, 3, 4]}});
  match({a: {$lte: {x: [2, 3, 4]}}}, {a: {x: [2, 3, 4]}});

  nomatch({a: {$gt: [2, 3]}}, {a: [1, 2]}); // tested against mongodb

  // composition of two qualifiers
  nomatch({a: {$lt: 11, $gt: 9}}, {a: 8});
  nomatch({a: {$lt: 11, $gt: 9}}, {a: 9});
  match({a: {$lt: 11, $gt: 9}}, {a: 10});
  nomatch({a: {$lt: 11, $gt: 9}}, {a: 11});
  nomatch({a: {$lt: 11, $gt: 9}}, {a: 12});

  match({a: {$lt: 11, $gt: 9}}, {a: [8, 9, 10, 11, 12]});
  match({a: {$lt: 11, $gt: 9}}, {a: [8, 9, 11, 12]}); // tested against mongodb

  // $all
  match({a: {$all: [1, 2]}}, {a: [1, 2]});
  nomatch({a: {$all: [1, 2, 3]}}, {a: [1, 2]});
  match({a: {$all: [1, 2]}}, {a: [3, 2, 1]});
  match({a: {$all: [1, "x"]}}, {a: [3, "x", 1]});
  nomatch({a: {$all: ['2']}}, {a: 2});
  nomatch({a: {$all: [2]}}, {a: '2'});
  match({a: {$all: [[1, 2], [1, 3]]}}, {a: [[1, 3], [1, 2], [1, 4]]});
  nomatch({a: {$all: [[1, 2], [1, 3]]}}, {a: [[1, 4], [1, 2], [1, 4]]});
  match({a: {$all: [2, 2]}}, {a: [2]}); // tested against mongodb
  nomatch({a: {$all: [2, 3]}}, {a: [2, 2]});

  nomatch({a: {$all: [1, 2]}}, {a: [[1, 2]]}); // tested against mongodb

  // $exists
  match({a: {$exists: true}}, {a: 12});
  nomatch({a: {$exists: true}}, {b: 12});
  nomatch({a: {$exists: false}}, {a: 12});
  match({a: {$exists: false}}, {b: 12});

  match({a: {$exists: true}}, {a: []});
  nomatch({a: {$exists: true}}, {b: []});
  nomatch({a: {$exists: false}}, {a: []});
  match({a: {$exists: false}}, {b: []});

  match({a: {$exists: true}}, {a: [1]});
  nomatch({a: {$exists: true}}, {b: [1]});
  nomatch({a: {$exists: false}}, {a: [1]});
  match({a: {$exists: false}}, {b: [1]});

  // $mod
  match({a: {$mod: [10, 1]}}, {a: 11});
  nomatch({a: {$mod: [10, 1]}}, {a: 12});
  match({a: {$mod: [10, 1]}}, {a: [10, 11, 12]});
  nomatch({a: {$mod: [10, 1]}}, {a: [10, 12]});

  // $ne
  match({a: {$ne: 1}}, {a: 2});
  nomatch({a: {$ne: 2}}, {a: 2});
  match({a: {$ne: [1]}}, {a: [2]});

  nomatch({a: {$ne: [1, 2]}}, {a: [1, 2]}); // all tested against mongodb
  nomatch({a: {$ne: 1}}, {a: [1, 2]});
  nomatch({a: {$ne: 2}}, {a: [1, 2]});
  match({a: {$ne: 3}}, {a: [1, 2]});

  nomatch({a: {$ne: {x: 1}}}, {a: {x: 1}});
  match({a: {$ne: {x: 1}}}, {a: {x: 2}});
  match({a: {$ne: {x: 1}}}, {a: {x: 1, y: 2}});

  // $in
  match({a: {$in: [1, 2, 3]}}, {a: 2});
  nomatch({a: {$in: [1, 2, 3]}}, {a: 4});
  match({a: {$in: [[1], [2], [3]]}}, {a: [2]});
  nomatch({a: {$in: [[1], [2], [3]]}}, {a: [4]});
  match({a: {$in: [{b: 1}, {b: 2}, {b: 3}]}}, {a: {b: 2}});
  nomatch({a: {$in: [{b: 1}, {b: 2}, {b: 3}]}}, {a: {b: 4}});

  match({a: {$in: [1, 2, 3]}}, {a: [2]}); // tested against mongodb
  match({a: {$in: [{x: 1}, {x: 2}, {x: 3}]}}, {a: [{x: 2}]});
  match({a: {$in: [1, 2, 3]}}, {a: [4, 2]});
  nomatch({a: {$in: [1, 2, 3]}}, {a: [4]});

  // $nin
  nomatch({a: {$nin: [1, 2, 3]}}, {a: 2});
  match({a: {$nin: [1, 2, 3]}}, {a: 4});
  nomatch({a: {$nin: [[1], [2], [3]]}}, {a: [2]});
  match({a: {$nin: [[1], [2], [3]]}}, {a: [4]});
  nomatch({a: {$nin: [{b: 1}, {b: 2}, {b: 3}]}}, {a: {b: 2}});
  match({a: {$nin: [{b: 1}, {b: 2}, {b: 3}]}}, {a: {b: 4}});

  nomatch({a: {$nin: [1, 2, 3]}}, {a: [2]}); // tested against mongodb
  nomatch({a: {$nin: [{x: 1}, {x: 2}, {x: 3}]}}, {a: [{x: 2}]});
  nomatch({a: {$nin: [1, 2, 3]}}, {a: [4, 2]});
  match({a: {$nin: [1, 2, 3]}}, {a: [4]});

  // $size
  match({a: {$size: 0}}, {a: []});
  match({a: {$size: 1}}, {a: [2]});
  match({a: {$size: 2}}, {a: [2, 2]});
  nomatch({a: {$size: 0}}, {a: [2]});
  nomatch({a: {$size: 1}}, {a: []});
  nomatch({a: {$size: 1}}, {a: [2, 2]});
  nomatch({a: {$size: 0}}, {a: "2"});
  nomatch({a: {$size: 1}}, {a: "2"});
  nomatch({a: {$size: 2}}, {a: "2"});

  nomatch({a: {$size: 2}}, {a: [[2,2]]}); // tested against mongodb

  // $type
  match({a: {$type: 1}}, {a: 1.1});
  match({a: {$type: 1}}, {a: 1});
  nomatch({a: {$type: 1}}, {a: "1"});
  match({a: {$type: 2}}, {a: "1"});
  nomatch({a: {$type: 2}}, {a: 1});
  match({a: {$type: 3}}, {a: {}});
  match({a: {$type: 3}}, {a: {b: 2}});
  nomatch({a: {$type: 3}}, {a: []});
  nomatch({a: {$type: 3}}, {a: [1]});
  nomatch({a: {$type: 3}}, {a: null});
  match({a: {$type: 8}}, {a: true});
  match({a: {$type: 8}}, {a: false});
  nomatch({a: {$type: 8}}, {a: "true"});
  nomatch({a: {$type: 8}}, {a: 0});
  nomatch({a: {$type: 8}}, {a: null});
  nomatch({a: {$type: 8}}, {a: ''});
  nomatch({a: {$type: 8}}, {});
  match({a: {$type: 10}}, {a: null});
  nomatch({a: {$type: 10}}, {a: false});
  nomatch({a: {$type: 10}}, {a: ''});
  nomatch({a: {$type: 10}}, {a: 0});
  nomatch({a: {$type: 10}}, {});
  match({a: {$type: 11}}, {a: /x/});
  nomatch({a: {$type: 11}}, {a: 'x'});
  nomatch({a: {$type: 11}}, {});

  nomatch({a: {$type: 4}}, {a: []});
  nomatch({a: {$type: 4}}, {a: [1]}); // tested against mongodb
  match({a: {$type: 1}}, {a: [1]});
  nomatch({a: {$type: 2}}, {a: [1]});
  match({a: {$type: 1}}, {a: ["1", 1]});
  match({a: {$type: 2}}, {a: ["1", 1]});
  nomatch({a: {$type: 3}}, {a: ["1", 1]});
  nomatch({a: {$type: 4}}, {a: ["1", 1]});
  nomatch({a: {$type: 1}}, {a: ["1", []]});
  match({a: {$type: 2}}, {a: ["1", []]});
  match({a: {$type: 4}}, {a: ["1", []]}); // tested against mongodb

  // regular expressions
  match({a: /a/}, {a: 'cat'});
  nomatch({a: /a/}, {a: 'cut'});
  nomatch({a: /a/}, {a: 'CAT'});
  match({a: /a/i}, {a: 'CAT'});
  match({a: {$regex: /a/}}, {a: 'cat'});
  nomatch({a: {$regex: /a/}}, {a: 'cut'});
  nomatch({a: {$regex: /a/}}, {a: 'CAT'});
  match({a: {$regex: /a/i}}, {a: 'CAT'});
  match({a: {$regex: /a/, $options: 'i'}}, {a: 'CAT'}); // tested
  match({a: {$regex: /a/i, $options: 'i'}}, {a: 'CAT'}); // tested
  nomatch({a: {$regex: /a/i, $options: ''}}, {a: 'CAT'}); // tested
  match({a: {$regex: 'a'}}, {a: 'cat'});
  nomatch({a: {$regex: 'a'}}, {a: 'cut'});
  nomatch({a: {$regex: 'a'}}, {a: 'CAT'});
  match({a: {$regex: 'a', $options: 'i'}}, {a: 'CAT'});

  match({a: {$options: 'i'}}, {a: 12});
  match({b: {$options: 'i'}}, {a: 12});

  match({a: /a/}, {a: ['dog', 'cat']});
  nomatch({a: /a/}, {a: ['dog', 'puppy']});

  test.throws(function () {
    match({a: {$regex: /a/, $options: 'x'}}, {a: 'cat'});
  });
  test.throws(function () {
    match({a: {$regex: /a/, $options: 's'}}, {a: 'cat'});
  });

  // $not
  match({x: {$not: {$gt: 7}}}, {x: 6});
  nomatch({x: {$not: {$gt: 7}}}, {x: 8});
  match({x: {$not: {$lt: 10, $gt: 7}}}, {x: 11});
  nomatch({x: {$not: {$lt: 10, $gt: 7}}}, {x: 9});
  match({x: {$not: {$lt: 10, $gt: 7}}}, {x: 6});

  match({x: {$not: {$gt: 7}}}, {x: [2, 3, 4]});
  nomatch({x: {$not: {$gt: 7}}}, {x: [2, 3, 4, 10]});

  match({x: {$not: /a/}}, {x: "dog"});
  nomatch({x: {$not: /a/}}, {x: "cat"});
  match({x: {$not: /a/}}, {x: ["dog", "puppy"]});
  nomatch({x: {$not: /a/}}, {x: ["kitten", "cat"]});

  // dotted keypaths: bare values
  match({"a.b": 1}, {a: {b: 1}});
  nomatch({"a.b": 1}, {a: {b: 2}});
  match({"a.b": [1,2,3]}, {a: {b: [1,2,3]}});
  nomatch({"a.b": [1,2,3]}, {a: {b: [4]}});
  match({"a.b": /a/}, {a: {b: "cat"}});
  nomatch({"a.b": /a/}, {a: {b: "dog"}});

  // dotted keypaths: literal objects
  match({"a.b": {c: 1}}, {a: {b: {c: 1}}});
  nomatch({"a.b": {c: 1}}, {a: {b: {c: 2}}});
  nomatch({"a.b": {c: 1}}, {a: {b: 2}});
  match({"a.b": {c: 1, d: 2}}, {a: {b: {c: 1, d: 2}}});
  nomatch({"a.b": {c: 1, d: 2}}, {a: {b: {c: 1, d: 1}}});
  nomatch({"a.b": {c: 1, d: 2}}, {a: {b: {d: 2}}});

  // dotted keypaths: $ operators
  match({"a.b": {$in: [1, 2, 3]}}, {a: {b: [2]}}); // tested against mongodb
  match({"a.b": {$in: [{x: 1}, {x: 2}, {x: 3}]}}, {a: {b: [{x: 2}]}});
  match({"a.b": {$in: [1, 2, 3]}}, {a: {b: [4, 2]}});
  nomatch({"a.b": {$in: [1, 2, 3]}}, {a: {b: [4]}});

  // XXX still needs tests:
  // - $or, $and, $nor, $where
  // - $elemMatch
  // - people.2.name
  // - non-scalar arguments to $gt, $lt, etc
}