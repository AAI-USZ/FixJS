function(){

    suite('tagname',
          expectNoResult(doc.find().elem('missing')));

    suite('attribute name',
          expectNoResult(doc.find().attr('missing')));

    suite('attribute value',
          expectNoResult(doc.find().attr('rel', 'missing')));

    suite('attribute RegExp',
          expectNoResult(doc.find().attr('rel', /missing/)));

    suite('tagname followed by attribute value',
          expectNoResult(doc.find().elem('link').attr('data-match', '1')));

    suite('attribute followed by tagname value',
          expectNoResult(doc.find().attr('data-match', '1').elem('missing')));

    suite('multiply steps', expectNoResult(function () {
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