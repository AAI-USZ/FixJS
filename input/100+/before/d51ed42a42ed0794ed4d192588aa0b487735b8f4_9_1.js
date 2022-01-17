function(id, name, container_class)
{
  this._data = null;
  this.requierd_services = ["ecmascript-debugger"];

  this._on_element_selected = function(msg)
  {
    this._data = msg.rt_id &&  msg.obj_id && 
                 new cls.InspectableJSObject(msg.rt_id, msg.obj_id) || null;
    this.update();
  };


  this._super_init = this.init;

  this.init = function(id, name, container_class)
  {
    var msgs = window.messages; 
    msgs.addListener('element-selected', this._on_element_selected.bind(this));
    msgs.addListener('setting-changed', this._on_setting_change.bind(this));
    this.onbeforesearch = function(msg)
    {
      this._onbeforesearch(msg.search_term);
    }.bind(this);
    this._super_init(id, name, container_class);
  };

  this.init(id, name, container_class);

}