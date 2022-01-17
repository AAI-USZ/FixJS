function(apres, chai, sinon, $, testing, FolioWidget) {
    var assert = chai.assert;

    suite('folio widget');
    testing.testWidgetModule('widget/folio');
    testing.testWidgetElem('widget/folio');

    var elemWithPages = function() {
      var title;
      var elem = testing.BasicElem();
      var pageElems = [];
      for (var i = 0; (title = arguments[i]); i++) {
        pageElems.push(testing.AttrElem({'class': 'page', 'data-page-title': title}));
      }
      elem.find = function() {
        return pageElems;
      };
      return elem;
    }

    testing.test('#find pages on init', function() {
      var elem = elemWithPages('First Page', 'Second Page');
      var pageElems = elem.find();
      var folio = new FolioWidget(elem);
      assert.equal(folio.pages.length, 2);
      assert.strictEqual(folio.pages[0].elem, pageElems[0]);
      assert.strictEqual(folio.pages[0].index, 0);
      assert.strictEqual(folio.pages[0].title, 'First Page');
      assert.strictEqual(folio.pages[1].elem, pageElems[1]);
      assert.strictEqual(folio.pages[1].index, 1);
      assert.strictEqual(folio.pages[1].title, 'Second Page');
    });

    testing.test('#current page on init', function() {
      var elem = elemWithPages('Page Uno', 'Page Dos', 'Page Tres');
      var pageElems = elem.find();
      var folio = new FolioWidget(elem);
      var page = folio.currentPage();
      assert.strictEqual(page.elem, pageElems[0]);
      assert.strictEqual(page.title, 'Page Uno');
      assert.strictEqual(page.index, 0);
    });

    testing.test('#no pages on init', function() {
      var elem = elemWithPages();
      var folio = new FolioWidget(elem);
      assert.equal(folio.pages.length, 0);
      assert.isUndefined(folio.currentPage());
    });

    testing.test('#current page by index', function() {
      var elem = elemWithPages('Page Uno', 'Page Dos', 'Page Tres');
      var pageElems = elem.find();
      var folio = new FolioWidget(elem);
      var page = folio.currentPage(1);
      assert.strictEqual(page.elem, pageElems[1]);
      assert.strictEqual(page, folio.currentPage());
      var page = folio.currentPage(2);
      assert.strictEqual(page.elem, pageElems[2]);
      assert.strictEqual(page, folio.currentPage());
      var page = folio.currentPage(0);
      assert.strictEqual(page.elem, pageElems[0]);
      assert.strictEqual(page, folio.currentPage());
    });

    testing.test('#current page by title', function() {
      var elem = elemWithPages('Groucho', 'Zeppo', 'Chico', 'Zeppo');
      var pageElems = elem.find();
      var folio = new FolioWidget(elem);
      var page = folio.currentPage('Chico');
      assert.strictEqual(page.elem, pageElems[2]);
      assert.strictEqual(page, folio.currentPage());
      var page = folio.currentPage('Groucho');
      assert.strictEqual(page.elem, pageElems[0]);
      assert.strictEqual(page, folio.currentPage());
      var page = folio.currentPage('Zeppo');
      assert.strictEqual(page.elem, pageElems[1]);
      assert.strictEqual(page, folio.currentPage());
      var page = folio.currentPage('Moe');
      assert.strictEqual(page.elem, pageElems[1]);
      assert.strictEqual(page, folio.currentPage());
      var page = folio.currentPage('Larry');
      assert.strictEqual(page.elem, pageElems[1]);
      assert.strictEqual(page, folio.currentPage());
    });

    testing.test('#current page class', function() {
      var elem = elemWithPages('Page Uno', 'Page Dos', 'Page Tres');
      var pageElems = elem.find();
      var folio = new FolioWidget(elem);
      var page = folio.currentPage(1);
      assert.strictEqual(page.elem.addClass.args[0][0], 'folio-current-page');
      assert.strictEqual(page.elem.addClass.callCount, 1);
      assert.strictEqual(pageElems[0].removeClass.callCount, 1);
      var page = folio.currentPage(2);
      assert.strictEqual(page.elem.addClass.args[0][0], 'folio-current-page');
      assert.strictEqual(page.elem.addClass.callCount, 1);
      assert.strictEqual(pageElems[1].removeClass.callCount, 1);
      var page = folio.currentPage(0);
      assert.strictEqual(page.elem.addClass.args[1][0], 'folio-current-page');
      assert.strictEqual(page.elem.addClass.callCount, 2);
      assert.strictEqual(pageElems[2].removeClass.callCount, 1);
    });

    testing.test('#current page event', function() {
      var elem = elemWithPages('Page Uno', 'Page Dos', 'Page Tres');
      var pageElems = elem.find();
      var folio = new FolioWidget(elem);
      var page = folio.currentPage(1);
      assert.deepEqual(page.elem.trigger.args[0], ['folioCurrentPage', folio]);
      assert.deepEqual(pageElems[0].trigger.callCount, 1);
      assert.deepEqual(pageElems[1].trigger.callCount, 1);
      assert.deepEqual(pageElems[2].trigger.callCount, 0);
      var page = folio.currentPage(2);
      assert.deepEqual(page.elem.trigger.args[0], ['folioCurrentPage', folio]);
      assert.deepEqual(pageElems[0].trigger.callCount, 1);
      assert.deepEqual(pageElems[1].trigger.callCount, 1);
      assert.deepEqual(pageElems[2].trigger.callCount, 1);
      var page = folio.currentPage(0);
      assert.deepEqual(page.elem.trigger.args[1], ['folioCurrentPage', folio]);
      assert.deepEqual(pageElems[0].trigger.callCount, 2);
      assert.deepEqual(pageElems[1].trigger.callCount, 1);
      assert.deepEqual(pageElems[2].trigger.callCount, 1);
    });

    testing.test('#next page', function() {
      var elem = elemWithPages('Page Uno', 'Page Dos', 'Page Tres');
      var pageElems = elem.find();
      var folio = new FolioWidget(elem);
      var page = folio.nextPage();
      assert.strictEqual(page.index, 1);
      assert.strictEqual(page, folio.currentPage());
      var page = folio.nextPage();
      assert.strictEqual(page.index, 2);
      assert.strictEqual(page, folio.currentPage());
      var page = folio.nextPage();
      assert.strictEqual(page.index, 2);
      assert.strictEqual(page, folio.currentPage());
    });

    testing.test('#previous page', function() {
      var elem = elemWithPages('Page Uno', 'Page Dos', 'Page Tres');
      var pageElems = elem.find();
      var folio = new FolioWidget(elem);
      folio.currentPage(2);
      var page = folio.previousPage();
      assert.strictEqual(page.index, 1);
      assert.strictEqual(page, folio.currentPage());
      var page = folio.previousPage();
      assert.strictEqual(page.index, 0);
      assert.strictEqual(page, folio.currentPage());
      var page = folio.previousPage();
      assert.strictEqual(page.index, 0);
      assert.strictEqual(page, folio.currentPage());
    });

  }