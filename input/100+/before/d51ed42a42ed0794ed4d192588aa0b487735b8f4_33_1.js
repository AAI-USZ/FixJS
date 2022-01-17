function(id, name, container_class)
{
  this.requierd_services = ["ecmascript-debugger"];
  this.createView = function(container)
  {
    var element_style = window.element_style;
    var styles = container.clearAndRender(['category', ['styles'], 'edit-handler', 'edit-css']).firstElementChild;
    var data = element_style.get_style();
    if (data)
    {
      styles.clearAndRender(window.stylesheets.pretty_print_cascaded_style(data));
      styles.setAttribute('rt-id', data.rt_id);
    }
    window.views["color-selector"].ondestroy();
  };

  this.ondestroy = function()
  {
    window.views["color-selector"].ondestroy();
  };

  this.init(id, name, container_class);
}