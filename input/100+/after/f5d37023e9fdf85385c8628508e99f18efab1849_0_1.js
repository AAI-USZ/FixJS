function() {
    // save content in case in needs to be restored
    this.set('_savedTitle', this.get('title'));
    this.set('_savedContent1', this.get('content1'));
    this.set('_savedContent2', this.get('content2'));
    this.set('_savedContent3', this.get('content3'));

    this.set('title', '');
    this.set('content1', '');
    this.set('content2', '');
    this.set('content3', '');
    this.blogPostView.remove();
    if (this.get('iframe') && this.get('iframe').get('parentView')) {
      this.get('iframe').get('parentView').removeChild(this.get('iframe'));
    }
  }