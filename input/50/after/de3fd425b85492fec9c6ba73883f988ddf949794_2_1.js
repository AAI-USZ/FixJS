function() {
    // Searching is deferred for now; do nothing; the DOM nodes have been
    // commented out.
    return;

    // scroll the search bit out of the way
    var searchBar =
      this.domNode.getElementsByClassName('msg-search-tease-bar')[0];
    this.scrollNode.scrollTop = searchBar.offsetHeight;
  }