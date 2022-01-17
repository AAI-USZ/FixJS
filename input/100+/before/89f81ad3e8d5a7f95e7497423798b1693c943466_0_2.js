function () {

    var links = [
      content.getElementsByTagName('link')[0],
      content.getElementsByTagName('link')[1]
    ];

    suite('tagname',
          expectOneResult(doc.find().only().elem('link'), links[0]));

    suite('attribute name',
          expectOneResult(doc.find().only().attr('rel'), links[0]));

    suite('attribute value',
          expectOneResult(doc.find().only().attr('rel', 'stylesheet'), links[0]));

    suite('attribute RegExp',
          expectOneResult(doc.find().only().attr('href', /^file_(2|3)\.css$/), links[1]));

    suite('tagname followed by attribute value',
          expectOneResult(doc.find().only().elem('link').attr('rel', 'stylesheet'), links[0]));

    suite('attribute followed by tagname value',
          expectOneResult(doc.find().only().attr('rel', 'stylesheet').elem('link'), links[0]));

    suite('multiply steps with only at start', function () {
      var search = doc.find();

      // this will perform a real search for the first <link> element
      search.only().elem('link').toValue();

      // since nodeList only contains one element, and futher search
      // will be performed on nodeList, the use is not allowed t
      // add more search criterias, since the will result in a wrong
      // search result
      var error = null;
      try {
        search.attr('href', 'file_2.css').toValue(); // throw
      } catch (e) {
        error = e;
      } finally {
        test('it should throw', function (error) {
          assert.instanceOf(error, Error);
        });
      }
    });

    suite('multiply steps with only at middle', expectOneResult(function () {
        var search = doc.find();

        // this will perform a real search for all <link> element
        search.elem('link').toValue();

        // find second link element
        search.only().attr('href', 'file_2.css'); // no throw

        return search;
    }, links[1]));

    suite('multiply steps with only at end', expectOneResult(function () {
        var search = doc.find();

        // this will perform a real search for all <link> element
        search.elem('link').toValue();

        // find second link element
        search.attr('href', 'file_2.css').only(); // no throw

        return search;
    }, links[1]));

  }