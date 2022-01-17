function(node_id)
  {
    services['ecmascript-debugger'].requestSpotlightObjects(0,
      [(last_spotlight_command || []).concat([get_command(node_id, 0, "hover")])]);
    last_spotlight_commands = '';
  }