function(child_node)
  {
    if( cp_data.itemtypes == null )
      throw new Error("cp_data.setContentItemTypes() was never called");
    if( child_node.fs_item )
      return child_node;   // already parsed

    var fs_item = $(child_node).closest(".inline-related");
    var id = fs_item.attr("id");
    var pos = id.lastIndexOf('-');      // have to split at last '-' for generic inlines (inlinetype-id / app-model-ctfield-ctfkfield-id)
    var prefix = id.substring(0, pos);
    var suffix = id.substring(pos + 1);

    // Get itemtype
    var itemtype = null;
    for(var TypeName in cp_data.itemtypes)
    {
      var candidate = cp_data.itemtypes[TypeName];
      if( candidate.prefix == prefix )
      {
        itemtype = candidate;
        break;
      }
    }

    return {
      fs_item: fs_item,
      itemtype: itemtype,
      index: parseInt(suffix)
    };
  }