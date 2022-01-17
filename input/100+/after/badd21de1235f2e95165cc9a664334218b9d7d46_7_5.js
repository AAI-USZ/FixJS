function(apps) {
      var index = this.total();
      var page = new Page(index);

      var pageElement = document.createElement('div');
      pageElement.className = 'page';
      container.appendChild(pageElement);

      page.render(apps, pageElement);
      if (index === 0) {
        page.moveToCenter();
      } else {
        page.moveToEnd();
      }

      pages.list.push(page);
      pages.total = index + 1;

      updatePaginationBar();
    }