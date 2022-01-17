function() {
      var elem = elemWithPages();
      var folio = new FolioWidget(elem);
      assert.equal(folio.pages.length, 0);
      var pageElem = testing.BasicElem();
      var page = folio.addPage(pageElem, 'Foo');
      assert.equal(folio.pages.length, 1);
      assert.deepEqual(page.elem, $(pageElem));
      assert.strictEqual(page.index, 0);
      assert.strictEqual(page.title, 'Foo');
      assert.strictEqual(page, folio.pages[page.index]);
      var page = folio.addPage(pageElem, 'Bar');
      assert.equal(folio.pages.length, 2);
      assert.deepEqual(page.elem, $(pageElem));
      assert.strictEqual(page.index, 1);
      assert.strictEqual(page.title, 'Bar');
      assert.strictEqual(page, folio.pages[page.index]);
    }