function(){

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
  }