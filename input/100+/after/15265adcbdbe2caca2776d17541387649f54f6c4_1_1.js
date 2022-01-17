function() {
      var elem = elemWithPages('Page Uno', 'Page Dos', 'Page Tres');
      var pageElems = elem.find();
      var folio = new FolioWidget(elem);
      var page = folio.currentPage(2);
      assert.strictEqual(page.index, 2);
      var page = folio.previousPage();
      assert.strictEqual(page.index, 1);
      assert.strictEqual(page, folio.currentPage());
      var page = folio.previousPage();
      assert.strictEqual(page.index, 0);
      assert.strictEqual(page, folio.currentPage());
      var page = folio.previousPage();
      assert.strictEqual(page.index, 0);
      assert.strictEqual(page, folio.currentPage());
    }