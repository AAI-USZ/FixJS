function(evt){
    evt && evt.preventDefault()
    var link = $(evt.target).parent("a")

    return {
        permalink : encodeURIComponent(link.data('url')),
        title : encodeURIComponent(link.data('title'))
      }
  }