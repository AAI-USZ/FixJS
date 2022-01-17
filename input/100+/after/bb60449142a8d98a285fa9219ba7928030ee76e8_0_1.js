function() {
  var hiddenUsers = 0;
  this.moreBox.css('display', ''); // Show this initially, so we can take its width into account

  if (this.showAllReaders) {
    $('.reader', this.readerList).css('display', '');
  } else {
    // Try to make the list smaller by hiding the last reader
    var readers = $('.reader', this.readerList);
    for (var trie = 1; this.e.outerHeight() > 56 && trie < 1000; trie++) {
      $(readers[readers.length - trie]).css('display', 'none');
      hiddenUsers++;
    }
  }

  if (this.showAllReaders && hiddenUsers === 0) {
    this.moreBox.text('Hide');
  }
  else if (hiddenUsers > 0) {
    this.moreBox.text(hiddenUsers + ' more');
  } else {
    this.moreBox.css('display', 'none');
  }
}