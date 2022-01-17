function(evt){
    evt.preventDefault();
    var target = $(evt.target)
    var details = {}
    details.permalink = encodeURIComponent(target.attr('href'))
    details.title = encodeURIComponent(target.data('title'))
    return details
  }