function(view)
{
  if (cls.ResourceManagerService.instance)
  {
    return cls.ResourceManagerService.instance;
  }
  cls.ResourceManagerService.instance = this;

  this._current_context = null;
  this._view = view;

  this._enable_content_tracking = function()
  {
    this._res_service.requestSetResponseMode(null, [[3, 1]]);
  }

  this._on_abouttoloaddocument_bound = function(msg)
  {
    var data = new cls.DocumentManager["1.0"].AboutToLoadDocument(msg);
    // if not a top resource, just ignore. This usually means it's an iframe
    if (data.parentDocumentID) { return; }
    this._current_context = new cls.ResourceContext();
  }.bind(this);

  this._on_urlload_bound = function(msg)
  {
    if (!this._current_context) { return; }
    var data = new cls.ResourceManager["1.2"].UrlLoad(msg);

    //bail if we get dupes. Why do we get dupes? fixme
    //if (data.resourceID in this._current_document.resourcemap) { return }
    this._current_context.update("urlload", data);
  }.bind(this);

  this._on_urlredirect_bound = function(msg)
  {
    if (!this._current_context) { return; }

    var data = new cls.ResourceManager["1.0"].UrlRedirect(msg);
    // a bit of cheating since further down we use .resouceID to determine
    // what resource the event applies to:
    data.resourceID = data.fromResourceID;
    this._current_context.update("urlredirect", data);
  }.bind(this);

  this._on_urlfinished_bound = function(msg)
  {
    if (!this._current_context) { return; }
    var data = new cls.ResourceManager["1.0"].UrlFinished(msg);
    this._current_context.update("urlfinished", data);
  }.bind(this);

  this._on_response_bound = function(msg)
  {
    if (!this._current_context) { return; }
    var data = new cls.ResourceManager["1.0"].Response(msg);
    this._current_context.update("response", data);
  }.bind(this);

  this._on_debug_context_selected_bound = function()
  {
    this._current_context = null;
    this._view.update();
  }.bind(this);

  this.init = function()
  {
    this._res_service = window.services['resource-manager'];
    this._res_service.addListener("urlload", this._on_urlload_bound);
    this._res_service.addListener("response", this._on_response_bound);
    this._res_service.addListener("urlredirect", this._on_urlredirect_bound);
    this._res_service.addListener("urlfinished", this._on_urlfinished_bound);
    this._doc_service = window.services['document-manager'];
    this._doc_service.addListener("abouttoloaddocument", this._on_abouttoloaddocument_bound);
    messages.addListener('debug-context-selected', this._on_debug_context_selected_bound);
  };

  this.get_resource_context = function()
  {
    return this._current_context;
  };

  /**
   * Returns an array of resource objects. The internal representation is to
   * keep separate lists of seen resources and a map of id/resource.
   */
  this.get_resource_list = function()
  {
    if (! this._current_context) { return []; }
    return this._current_context.resources;
  };

  this.get_resource_for_id = function(id)
  {
    if (this._current_context)
    {
      return this._current_context.get_resource(id);
    }
    return null;
  };

  this.get_resource_for_url = function(url)
  {
    if (this._current_context) {
      var filterfun = function(res) { return res.url == url };
      return this._current_context.resources.filter(filterfun).pop();
    }
    return null;
  };

  this.fetch_resource_data = function(callback, rid, type)
  {
    var typecode = {datauri: 3, string: 1}[type] || 1;
    var tag = window.tagManager.set_callback(null, callback);
    const MAX_PAYLOAD_SIZE = 10 * 1000 * 1000; // allow payloads of about 10 mb.
    this._res_service.requestGetResource(tag, [rid, [typecode, 1, MAX_PAYLOAD_SIZE]]);
  }

  this.init();
}