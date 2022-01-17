function JQueryTopicReadersPartial(parent, click_handler) {
  this.e = $('<div>').attr('id', 'topic_readers').appendTo(parent);
  this.readerList = $('<div>').addClass('readers').appendTo(this.e);
  this.moreBox = $('<div>').addClass('more_box').appendTo(this.e);
  this.showAllReaders = false;
  this.onUserClicked = click_handler;

  var that = this;
  this.moreBox.on('click', function() {
    that.showAllReaders = !that.showAllReaders;
    that.checkReaderOverflow();
  });
}