function hookSearch() {
  var input  = $('#search-field').eq(0);
  var result = $('#search-results').eq(0);
  $(result).show();

  var search_section = $('#search-section').get(0);
  $(search_section).show();

  var search = new Search(search_data, input, result);

  search.renderItem = function(result) {
    var li = document.createElement('li');
    var html = '';

    // TODO add relative path to <script> per-page
    html += '<p class="search-match"><a href="' + rdoc_rel_prefix + result.path + '">' + this.hlt(result.title);
    if (result.params)
      html += '<span class="params">' + result.params + '</span>';
    html += '</a>';


    if (result.namespace)
      html += '<p class="search-namespace">' + this.hlt(result.namespace);

    if (result.snippet)
      html += '<div class="search-snippet">' + result.snippet + '</div>';

    li.innerHTML = html;

    return li;
  }

  search.select = function(result) {
    var result_element = result.get(0);
    window.location.href = result_element.firstChild.firstChild.href;
  }

  search.scrollIntoView = search.scrollInWindow;
}