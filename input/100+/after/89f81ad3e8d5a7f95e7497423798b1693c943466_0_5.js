function(){

  var iframe = document.getElementById('content');
  var content = iframe.contentDocument || iframe.contentWindow.document;

  var doc = domstream(content);

  describe('when searching for a missing element using', function(){

    describe('tagname',
          expectNoResult(doc.find().elem('missing')));

    describe('attribute name',
          expectNoResult(doc.find().attr('missing')));

    describe('attribute value',
          expectNoResult(doc.find().attr('rel', 'missing')));

    describe('attribute RegExp',
          expectNoResult(doc.find().attr('rel', /missing/)));

    describe('tagname followed by attribute value',
          expectNoResult(doc.find().elem('link').attr('data-match', '1')));

    describe('attribute followed by tagname value',
          expectNoResult(doc.find().attr('data-match', '1').elem('missing')));

    describe('multiply steps', expectNoResult(function () {
      var search = doc.find();

      // this will perform a real search for all <link> element
      search.elem('link');
      search.toArray();

      // this will setup search for all <link data-match="1" *>
      // note that such elements do not exist, but a <link *> element and <* data-match="1" *> do.
      search.attr('data-match', '1');

      return search;
    }));
  });

  function expectNoResult(search) {

    return function () {
      if (search instanceof Function) {
        search = search();
      }

      it('toValue returns false', function () {
        assert.isFalse(search.toValue());
      });

      it('toArray returns empty array', function () {
        assert.lengthOf(search.toArray(), 0);
      });
    };
  }

  describe('when searching with .only() using', function () {

    var links = [
      content.getElementsByTagName('link')[0],
      content.getElementsByTagName('link')[1]
    ];

    describe('tagname',
          expectOneResult(doc.find().only().elem('link'), links[0]));

    describe('attribute name',
          expectOneResult(doc.find().only().attr('rel'), links[0]));

    describe('attribute value',
          expectOneResult(doc.find().only().attr('rel', 'stylesheet'), links[0]));

    describe('attribute RegExp',
          expectOneResult(doc.find().only().attr('data-href', /^file_(2|3)\.css$/), links[1]));

    describe('tagname followed by attribute value',
          expectOneResult(doc.find().only().elem('link').attr('rel', 'stylesheet'), links[0]));

    describe('attribute followed by tagname value',
          expectOneResult(doc.find().only().attr('rel', 'stylesheet').elem('link'), links[0]));

    describe('multiply steps with only at start', function () {
      var search = doc.find();

      // this will perform a real search for the first <link> element
      search.only().elem('link').toValue();

      // since nodeList only contains one element, and futher search
      // will be performed on nodeList, the use is not allowed t
      // add more search criterias, since the will result in a wrong
      // search result
      var error = null;
      try {
        search.attr('data-href', 'file_2.css').toValue(); // throw
      } catch (e) {
        error = e;
      } finally {
        it('it should throw', function () {
          assert.instanceOf(error, Error);
        });
      }
    });

    describe('multiply steps with only at middle', expectOneResult(function () {
        var search = doc.find();

        // this will perform a real search for all <link> element
        search.elem('link').toValue();

        // find second link element
        search.only().attr('data-href', 'file_2.css'); // no throw

        return search;
    }, links[1]));

    describe('multiply steps with only at end', expectOneResult(function () {
        var search = doc.find();

        // this will perform a real search for all <link> element
        search.elem('link').toValue();

        // find second link element
        search.attr('data-href', 'file_2.css').only(); // no throw

        return search;
    }, links[1]));
  });

  function expectOneResult(search, result) {
    return function () {
      if (search instanceof Function) {
        search = search();
      }

      it('toValue returns an element', function () {
        assert.ok(search.toValue().elem === result);
      });

      it('toArray returns array with one item', function () {
        assert.lengthOf(search.toArray(), 1);
        assert.ok(search.toArray()[0].elem === result);
      });
    };
  }

  describe('when searching using', function () {
    var items = content.getElementsByTagName('li');

    describe('tagname',
          expectResult(doc.find().elem('li'), items));

    describe('attribute name',
          expectResult(doc.find().attr('data-match'), items));

    describe('attribute value',
          expectResult(doc.find().attr('data-match', '1'), [ items[0], items[2], items[3] ]));

    describe('attribute RegExp',
          expectResult(doc.find().attr('data-match', /^(2|3)$/), [ items[1], items[4], items[5] ]));

    describe('tagname followed by attribute value',
          expectResult(doc.find().elem('li').attr('data-match', '1'), [ items[0], items[2], items[3] ]));

    describe('attribute followed by tagname value',
          expectResult(doc.find().attr('data-match', '1').elem('li'), [ items[0], items[2], items[3] ]));

    describe('multiply steps', expectResult(function () {
        var search = doc.find();

        // this will perform a real search for all <li> element
        search.elem('li');
        search.toArray();

        // this will setup search for all <li data-match="1" *>
        search.attr('data-match', '1');

        return search;
    }, [ items[0], items[2], items[3] ]));
  });

  function expectResult(search, results) {
    var length = results.length;

    return function () {
      if (search instanceof Function) {
        search = search();
      }

      it('toValue returns an element', function () {
        assert.lengthOf(search.toValue(), length);

        var cache = search.toValue();
        for (var i = 0, l = length; i < l; i++) {
          assert.ok(cache[i].elem === results[i]);
        }
      });

      it('toArray returns array with one item', function () {
        assert.lengthOf(search.toArray(), length);

        var cache = search.toArray();
        for (var i = 0, l = length; i < l; i++) {
          assert.ok(cache[i].elem === results[i]);
        }
      });
    };
  }
}