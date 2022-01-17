function quoteRef(id) {
  return '<a href="' + getUrl() + '?d=' + id + '"><img src="http://presheaf.com/' + imgRef(id) +
         '" title="click to go to presheaf.com for editing"/></a>'
}