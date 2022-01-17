function (imageId) {
  if ($('#images li').length <= _updateImageListThreshold) {
    var lastImage = $('#images li').last();
    $.get('/next/' + (_listCount - _updateImageListThreshold) + '?ids=' + _imageIds.join(',') + '&exclude_threshold_count='+200, appendImages);
  }
}