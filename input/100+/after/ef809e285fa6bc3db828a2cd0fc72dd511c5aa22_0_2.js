function(element) {
  var $element = this.$element = $(element);  
  element = this.element = $element[0];
  
  var imagePicker = element.imagePicker;
  if (imagePicker) return imagePicker;
  
  var self = element.imagePicker = this;
  
  var viewStack = Pushpop.getViewStackForElement(element);
  
  var $window = $(window['addEventListener'] ? window : document.body);
  
  // Set up the master view.
  var $scrollContentElement = $element.children('.sk-scroll-content');
  var $masterListElement = this.$masterListElement = $('<ul/>').appendTo($scrollContentElement);
  var $masterFooterElement = this.$masterFooterElement = $('<p/>').appendTo($scrollContentElement);
  
  // Set up the detail view.
  var detailViewId = 'ip-detail-view-' + (!!Date['now'] ? Date.now() : +new Date());
  var $detailScrollViewElement = $('<div class="pp-view sk-scroll-view ip-detail-view" data-paging-enabled="true" data-shows-horizontal-scroll-indicator="false" id="' + detailViewId + '"/>').appendTo(viewStack.$element);
  
  var detailScrollView = new ScrollKit.ScrollView($detailScrollViewElement);
  var detailView = this.detailView = new Pushpop.View($detailScrollViewElement);
  
  var viewStack = detailView.getViewStack();
  var navigationBarElement = (viewStack) ? viewStack.$element.children('.pp-navigationbar')[0] : null;
  var navigationBar = this.navigationBar = navigationBarElement.navigationBar;
  
  var $detailListElement = this.$detailListElement = $('<ul class="sk-page-container-horizontal"/>').appendTo(detailScrollView.getScrollContent().$element);
  
  // Load the actual high resolution image when the page changes.
  $detailScrollViewElement.bind(ScrollKit.ScrollView.EventType.PageChanged, function(evt) {
    var currentPage = detailScrollView.getCurrentPageIndex();
    var dataSource = self._dataSource;
    
    if (currentPage > dataSource.length - 1) return;
    
    loadImage(dataSource[currentPage]);
    
    if (navigationBar) navigationBar.setTitle((currentPage + 1) + ' of ' + dataSource.length);
  });
  
  // Override default click behavior.
  var didClickThumbnail = false;
  $element.delegate('a', 'click', function(evt) { evt.preventDefault(); });
  $element.delegate('a', 'mousedown touchstart', function(evt) { didClickThumbnail = true; });
  $element.delegate('a', 'mousemove touchmove', function(evt) { didClickThumbnail = false; });
  $element.delegate('a', 'mouseup touchend', function(evt) {
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
      
      detailScrollView.setCurrentPageIndex(index);
      
      viewStack.push(detailView);
      
      if (navigationBar) navigationBar.setTitle((index + 1) + ' of ' + dataSource.length);
    }
  });
  
  var loadImage = function(imageData) {
    if (!imageData || imageData.isLoaded) return;
    
    var image = new Image();
    var imageUrl = imageData.imageUrl;
    
    image.onload = function(evt) {
      var $detailImageElement = $detailListElement.find('img[data-image-id="' + imageData.id + '"]').first();
      $detailImageElement.attr('src', imageUrl);
      
      imageData.isLoaded = true;
    };
    
    image.src = imageUrl;
  };
}