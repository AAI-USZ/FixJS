function () {
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
    }