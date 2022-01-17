function(evt) {
    if (didClickThumbnail) {
      var id = $(this).attr('data-image-id');
      var dataSource = self._dataSource;
      var index = 0;
      var imageData;
      
      for (var i = 0, length = dataSource.length; i < length; i++) {
        if (dataSource[i].id == id) {
          index = i;
          imageData = dataSource[i];
          break;
        }
      }
      
      if (!imageData) return;
      
      loadImage(imageData);
      
      detailScrollView.setContentOffset({ x: index * $window.width(), y: 0 });
      
      viewStack.push(detailView);
      
      if (navigationBar) navigationBar.setTitle((index + 1) + ' of ' + dataSource.length);
    }
  }