function(test) {
      var docA = {
        _id: 'doc',
        a: true
      };
      var docB = {
        _id: 'doc',
        b: true
      }

      var revA = Revision.compute(docA);

      // make docB a successor of docA and compute its revision too
      docB._rev = docA._rev;
      var revB = Revision.compute(docB);

      // no stick docA into a Document and merge docB
      var doc = new Document(docA);
      doc.merge(docB);

      // check that we see the right revision (by attribute checking)
      test.ok(!doc.body.a);
      test.ok(doc.body.b);

      // check the correct revision
      test.strictEqual(doc.body._rev.toString(), revB.toString());

      // check that the meta object only contains a single history
      // and that this history is docA._rev
      test.strictEqual(JSON.stringify(doc.body._meta), JSON.stringify({
        history: [revA.toString()]
      }));

      test.done();
    }