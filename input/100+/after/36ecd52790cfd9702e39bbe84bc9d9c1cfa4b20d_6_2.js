function(ele)
  {
    var id = Number( ele.getAttribute("data-resource-id") );
    var url = ele.getAttribute("data-resource-url");
    var line = ele.getAttribute('data-resource-line-number');
    var rt_id;

    if (id)
      this.show_resource_for_id(id, line);
    else if (url)
    {
      //  resolve the URL based on that of the runtime if we only have a relative path
      if (url[0].indexOf('://') == -1)
      {
        rt_id = ele.get_attr('parent-node-chain', 'rt-id');
        if(rt_id)
          url = window.helpers.resolveURLS(runtimes.getURI(rt_id), url);
      }
      this.show_resource_for_url(url, line);
    }
  }