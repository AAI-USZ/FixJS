function(ps) {
    var description = '';
    if (ps.description) {
      description += '<p>'
        + ps.description.replace(/\n/g, '<br/>\n') + '</p>\n\n';
    }
    if (ps.page && ps.pageUrl) {
      description += '<a href="' + ps.pageUrl + '">' + ps.page + '</a>\n';
    }
    else if (ps.pageUrl) {
      description += '<a href="' + ps.pageUrl + '">' + ps.pageUrl + '</a>\n';
    }
    if (ps.body) {
      description += '<blockquote>' + ps.body + '</blockquote>';
    }
    return description;
  }