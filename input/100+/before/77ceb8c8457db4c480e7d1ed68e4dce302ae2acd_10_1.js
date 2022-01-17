function JQueryTopicListView (show_multiple_button, show_search_bar) {
  this.showMultipleButton = show_multiple_button;
  this.showSearchBar = show_search_bar;

  this.e = $('<div></div>').addClass('widget').attr('id', 'topics_wrapper').appendTo('#widgets');

  this.$header = $('<div>').attr('id', 'topiclist_header').appendTo(this.e);
  this.$actions = $('<div id="topics_actions"></div>').appendTo(this.e);
  this.$topics = $('<ul id="topics">' +
                   '  <li>Loading ...</li>' +
                   '</ul>').appendTo(this.e);

  this.$searchFilter = null;
  if (this.showSearchBar) {
    this.$header.append(this.createSearchHeader());
  }
}