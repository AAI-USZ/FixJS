function(view)
{
  if (cls.ResourceManagerService.instance)
    return cls.ResourceManagerService.instance;

  cls.ResourceManagerService.instance = this;

  this._view = view;
  this._context = null;

  this._enable_content_tracking = function()
  {
    this._res_service.requestSetResponseMode(null, [[3, 1]]);
  };

  this._on_abouttoloaddocument_bound = function(msg)
  {
    var data = new cls.DocumentManager["1.0"].AboutToLoadDocument(msg);

    if (!data.parentFrameID)
      this._context = new cls.ResourceContext(data);

    if (this._context)
      this._context.update("abouttoloaddocument", data);

  }.bind(this);

  this._on_urlload_bound = function(msg)
  {
    if (!this._context)
      return;

    var data = new cls.ResourceManager["1.2"].UrlLoad(msg);
      //bail if we get dupes. Why do we get dupes? fixme
      //if (data.resourceID in this._current_document.resourcemap) { return }

    this._context.update("urlload", data);
    this._view.update();

  }.bind(this);

  this._on_urlredirect_bound = function(msg)
  {
    if (!this._context)
      return;

    var data = new cls.ResourceManager["1.0"].UrlRedirect(msg);
    // a bit of cheating since further down we use .resouceID to determine
    // what resource the event applies to:
    data.resourceID = data.fromResourceID;
    this._context.update("urlredirect", data);
  }.bind(this);

  this._on_urlfinished_bound = function(msg)
  {
    if (!this._context)
      return;

    var data = new cls.ResourceManager["1.0"].UrlFinished(msg);
    var r = this._context.update("urlfinished", data);

    if (r && !r.data)
    {
        r.fetch_data();
    }

  }.bind(this);

  this._on_response_bound = function(msg)
  {
    if (!this._context)
      return;

    var data = new cls.ResourceManager["1.0"].Response(msg);
    this._context.update("response", data);
  }.bind(this);

  this._on_debug_context_selected_bound = function()
  {
    this._context = null;
    this._view.update();
  }.bind(this);


  this._handle_expand_collapse_bound = function(event, target)
  {
    if (!this._context)
      return;

    var button = target.querySelector('.button-expand-collapse');
    var target = target.parentNode;

    var frameID = target.getAttribute('data-frame-id');
    var data = this._context.frames[ frameID ];

    var groupName = target.getAttribute('data-resource-group');
    if (groupName){ data = data.groups[ groupName ]; }

    data.closed = !data.closed;
    if (data.closed)
    {
      target.addClass('collapsed');
    }
    else
    {
      target.removeClass('collapsed');
    }
  }.bind(this);


  this._handle_resource_detail_bound = function(event, target)
  {
    if (!this._context){ return; }

    var parent = target.get_ancestor('[data-resource-id]');
    if (!parent){ console.log('no parent with data-resource-id for '+target.outerHTML); return; }
  
    var id = Number( parent.getAttribute('data-resource-id') );
    var resource = this.get_resource(id);

    if (!resource){ console.log('resource '+id+' not found'); return; }

    cls.ResourceDetailView.instance.show_resource(resource);

  }.bind(this);

  /*  WIP */
  this._handle_resource_group_bound = function(event, target)
  {
    var parent = target.get_ancestor('[data-frame-id]');
    if (!parent){ return; }
    var frameID = parent.getAttribute('data-frame-id');
    var groupName = parent.getAttribute('data-resource-group');

    var group = this._context.frames[ frameID ].groups[ groupName ];

    cls.ResourceDetailView.instance.show_resource_group(group);
  }.bind(this);



  this._init = function()
  {
    var eh = window.eventHandlers;
    eh.click["resources-expand-collapse"] = this._handle_expand_collapse_bound;
    eh.click["resource-detail"] = this._handle_resource_detail_bound;
    eh.click["resource-group"] = this._handle_resource_group_bound;

    eh.click['open-resource-tab'] = function(event, target)
    {
      var broker = cls.ResourceDisplayBroker.get_instance();
      broker.show_resource_for_ele(target);
    }

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
    return this._context;
  };


  this.get_resource = function(id)
  {
    if (!this._context){ return null; }

    return this._context.resourcesDict[id];
  };


  this.get_resource_for_url = function(url)
  {
    if (!this._context){ return null; }

    var id = this._context.resourcesUrlDict[url];
    if (id===undefined){ return null; }
    
    return this.get_resource(id);
  };

  this._fetch_resource_data = function(callback, id, type)
  {
    var resource = this.get_resource(id);

    var typecode = {datauri: 3, string: 1}[type] || 1;
    var tag = window.tagManager.set_callback(null, callback);
    const MAX_PAYLOAD_SIZE = 10 * 1000 * 1000; // allow payloads of about 10 mb.
    this._res_service.requestGetResource(tag, [id, [typecode, 1, MAX_PAYLOAD_SIZE]]);
  };
//*
  this._on_resource_data_bound = function(type, data)
  {
    var id = data[0];
    var resource = this.get_resource(id);
    if(resource)
    {
      resource.data = new cls.ResourceManager["1.0"].ResourceData( data );
      if(resource.type=='image')
      {
        var i=new Image();
        i.src=resource.data.content.stringData;
        resource.data.meta = i.naturalWidth+'x'+i.naturalHeight;
      }
    }
    this._view.update();
  }.bind(this);



  this.request_resource_for_url = function(url,callback)
  {
    cls.ResourceRequest(url, callback, data);
  }


  this._init();
}