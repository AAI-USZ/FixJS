function(itemid, update_callback)
  {
    if (!this._current_context)
      return;

    var entry = this._current_context.get_entry(itemid);
    entry.called_get_body = true;
    var contentmode = cls.ResourceUtil.mime_to_content_mode(entry.mime);
    var typecode = {datauri: 3, string: 1}[contentmode] || 1;
    var tag = window.tagManager.set_callback(this, this._handle_get_resource, [update_callback, entry]);
    this._res_service.requestGetResource(tag, [entry.resource_id, [typecode, 1]]);
  }