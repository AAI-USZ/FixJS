function(event, target)
{
  var script_id = Number(event.target.getAttribute("data-script-id"));
  var script_line = Number(event.target.getAttribute("data-script-line"));
  window.views.js_source.show_and_flash_line(script_id, script_line);
}