function(ele)
  {
    var rid, url;
    var line = ele.getAttribute('data-resource-line-number');
    if (rid = ele.getAttribute("data-resource-id")) { this.show_resource_for_id(rid, line) }
    else if (url = ele.getAttribute("data-resource-url")) { this.show_resource_for_url(url, line) }
  }