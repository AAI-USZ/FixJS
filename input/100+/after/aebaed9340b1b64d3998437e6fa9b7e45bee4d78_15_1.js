function(id, name, container_class)
  {
    this.required_services = ["ecmascript-debugger"];
    var msgs = window.messages;
    msgs.addListener('object-selected', this._on_object_selected.bind(this));
    msgs.addListener('frame-selected', this._on_frame_selected.bind(this));
    msgs.addListener('trace-frame-selected', this._on_trace_frame_selected.bind(this));
    msgs.addListener('runtime-destroyed', this._on_runtime_destroyed.bind(this));
    msgs.addListener('active-inspection-type', this._on_active_inspection_type.bind(this));
    msgs.addListener('setting-changed', this._on_setting_change.bind(this));
    this.onbeforesearch = function(msg)
    {
      this._onbeforesearch(msg.search_term);
    }.bind(this);
    this._super_init(id, name, container_class);
  }