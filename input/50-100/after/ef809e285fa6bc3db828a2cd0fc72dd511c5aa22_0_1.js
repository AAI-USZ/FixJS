function(evt) {
    var currentPage = detailScrollView.getCurrentPageIndex();
    var dataSource = self._dataSource;
    
    if (currentPage > dataSource.length - 1) return;
    
    loadImage(dataSource[currentPage]);
    
    if (navigationBar) navigationBar.setTitle((currentPage + 1) + ' of ' + dataSource.length);
  }