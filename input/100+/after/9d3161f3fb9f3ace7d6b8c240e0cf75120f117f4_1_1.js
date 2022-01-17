function(test) {
  Handlebars.registerHelper("platypus", function() {
    return "eggs";
  });
  Handlebars.registerHelper("watermelon", function() {
    return "seeds";
  });

  Handlebars.registerHelper("daisygetter", function() {
    return this.daisy;
  });

  // XXX for debugging
  Handlebars.registerHelper("debugger", function() {
    debugger;
  });

  var getFancyObject = function() {
    return {
      foo: 'bar',
      apple: {banana: 'smoothie'},
      currentFruit: function() {
        return 'guava';
      },
      currentCountry: function() {
        return {name: 'Iceland',
                _pop: 321007,
                population: function() {
                  return this._pop;
                },
                unicorns: 0, // falsy value
                daisyGetter: function() {
                  return this.daisy;
                }
               };
      }
    };
  };

  Handlebars.registerHelper("fancyhelper", getFancyObject);

  Template.test_helpers_a.platypus = 'bill';
  Template.test_helpers_a.warthog = function() {
    return 'snout';
  };

  var listFour = function(a, b, c, d, options) {
    var keywordArgs = _.map(_.keys(options.hash), function(k) {
      return k+':'+options.hash[k];
    });
    return [a, b, c, d].concat(keywordArgs).join(' ');
  };

  var dataObj = {
    zero: 0,
    platypus: 'weird',
    watermelon: 'rind',
    daisy: 'petal',
    tree: function() { return 'leaf'; },
    thisTest: function() { return this.tree(); },
    fancy: getFancyObject(),
    methodListFour: listFour
  };

  test.equal(Template.test_helpers_a(dataObj).match(/\S+/g), [
    'platypus=bill', // helpers on Template object take first priority
    'watermelon=seeds', // global helpers take second priority
    'daisy=petal', // unshadowed object property
    'tree=leaf', // function object property
    'warthog=snout' // function Template property
  ]);

  test.equal(Template.test_helpers_b(dataObj).match(/\S+/g), [
    // unknown properties silently fail
    'unknown=',
    // falsy property comes through
    'zero=0'
  ]);

  test.equal(Template.test_helpers_c(dataObj).match(/\S+/g), [
    // property gets are supposed to silently fail
    'platypus.X=',
    'watermelon.X=',
    'daisy.X=',
    'tree.X=',
    'warthog.X='
  ]);

  test.equal(Template.test_helpers_d(dataObj).match(/\S+/g), [
    // helpers should get current data context in `this`
    'daisygetter=petal',
    // object methods should get object in `this`
    'thisTest=leaf',
    // nesting inside {{#with fancy}} shouldn't affect
    // method
    '../thisTest=leaf',
    // combine .. and .
    '../fancy.currentFruit=guava'
  ]);

  test.equal(Template.test_helpers_e(dataObj).match(/\S+/g), [
    'fancy.foo=bar',
    'fancy.apple.banana=smoothie',
    'fancy.currentFruit=guava',
    'fancy.currentCountry.name=Iceland',
    'fancy.currentCountry.population=321007',
    'fancy.currentCountry.unicorns=0'
  ]);

  test.equal(Template.test_helpers_f(dataObj).match(/\S+/g), [
    'fancyhelper.foo=bar',
    'fancyhelper.apple.banana=smoothie',
    'fancyhelper.currentFruit=guava',
    'fancyhelper.currentCountry.name=Iceland',
    'fancyhelper.currentCountry.population=321007',
    'fancyhelper.currentCountry.unicorns=0'
  ]);

  // test significance of 'this', which prevents helper from
  // shadowing property
  test.equal(Template.test_helpers_g(dataObj).match(/\S+/g), [
    'platypus=eggs',
    'this.platypus=weird'
  ]);

  // test interpretation of arguments

  Template.test_helpers_h.helperListFour = listFour;

  var trials =
        Template.test_helpers_h(dataObj).match(/\(.*?\)/g);
  test.equal(trials[0],
             '(methodListFour 6 7 8 9=6 7 8 9)');
  test.equal(trials[1],
             '(methodListFour platypus thisTest fancyhelper.currentFruit fancyhelper.currentCountry.unicorns=eggs leaf guava 0)');
  test.equal(trials[2],
             '(methodListFour platypus thisTest fancyhelper.currentFruit fancyhelper.currentCountry.unicorns a=platypus b=thisTest c=fancyhelper.currentFruit d=fancyhelper.currentCountry.unicorns=eggs leaf guava 0 a:eggs b:leaf c:guava d:0)');
  test.equal(trials[3],
             '(helperListFour platypus thisTest fancyhelper.currentFruit fancyhelper.currentCountry.unicorns=eggs leaf guava 0)');
  test.equal(trials[4],
             '(helperListFour platypus thisTest fancyhelper.currentFruit fancyhelper.currentCountry.unicorns a=platypus b=thisTest c=fancyhelper.currentFruit d=fancyhelper.currentCountry.unicorns=eggs leaf guava 0 a:eggs b:leaf c:guava d:0)');
  test.equal(trials.length, 5);

  // test interpretation of block helper invocation

  Template.test_helpers_i.uppercase = function(fn) {
    return fn().toUpperCase();
  };
  Template.test_helpers_i.tr = function(options) {
    var str = options.fn();
    _.each(options.hash, function(v,k) {
      str = str.replace(new RegExp(k, 'g'), v);
    });
    return str;
  };
  Template.test_helpers_i.arg_and_dict = function(arg, options) {
    if (typeof options.hash !== "object")
      throw new Error();
    return _.keys(options.hash).length;
  };
  Template.test_helpers_i.get_arg = function(arg) {
    return arg;
  };
  Template.test_helpers_i.helperListFour = listFour;

  trials =
        Template.test_helpers_i(dataObj).match(/\(.*?\)/g);
  test.equal(trials[0], "(uppercase apple=APPLE)");
  test.equal(trials[1], "(altered banana=bododo)");
  // presence of arg should prevent keyword arguments from
  // being passed to block helper, whether or not the arg
  // is a function.
  test.equal(trials[2], "(nokeys=0)");
  test.equal(trials[3], "(nokeys=0)");
  test.equal(trials[4],
             '(biggie=eggs leaf guava 0 a:eggs b:leaf c:guava d:0)');
  test.equal(trials.length, 5);
}