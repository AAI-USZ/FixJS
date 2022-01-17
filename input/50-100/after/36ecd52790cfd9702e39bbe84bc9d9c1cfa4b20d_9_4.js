function(callback, id, type)
  {
    var resource = this.get_resource(id);

    var typecode = {datauri: 3, string: 1}[type] || 1;
    var tag = window.tagManager.set_callback(null, callback);
    const MAX_PAYLOAD_SIZE = 10 * 1000 * 1000; // allow payloads of about 10 mb.
    this._res_service.requestGetResource(tag, [id, [typecode, 1, MAX_PAYLOAD_SIZE]]);
  }