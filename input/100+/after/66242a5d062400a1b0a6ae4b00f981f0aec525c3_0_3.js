function browser_drawAwesomescreenListItem(list,
    data) {
    var entry = document.createElement('li');
    var link = document.createElement('a');
    var title = document.createElement('span');
    var url = document.createElement('small');
    entry.setAttribute('role', 'listitem');
    link.href = data.uri;
    title.textContent = data.title ? data.title : data.uri;
    if (data.uri == this.START_PAGE_URL) {
      url.textContent = 'about:home';
    } else {
      url.textContent = data.uri;
    }
    link.appendChild(title);
    link.appendChild(url);
    entry.appendChild(link);
    list.appendChild(entry);

    if (!data.iconUri) {
      link.style.backgroundImage = 'url(' + this.DEFAULT_FAVICON + ')';
      return;
    }

    Places.db.getIcon(data.iconUri, (function(icon) {
      if (icon && icon.failed != true && icon.data) {
        var imgUrl = window.URL.createObjectURL(icon.data);
        link.style.backgroundImage = 'url(' + imgUrl + ')';
      } else {
        link.style.backgroundImage = 'url(' + this.DEFAULT_FAVICON + ')';
      }
    }).bind(this));
  }