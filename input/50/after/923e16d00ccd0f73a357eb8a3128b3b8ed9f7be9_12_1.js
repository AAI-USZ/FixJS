function(node_id)
  {
    var msg = [(last_spotlight_command || []).concat([get_command(node_id, 0, "hover")])];
    services['ecmascript-debugger'].requestSpotlightObjects(0, msg);
    last_spotlight_commands = '';
  }