function(typename)
  {
    if( cp_data.itemtypes == null )
      throw new Error("cp_data.setContentItemTypes() was never called. Does the ModelAdmin inherit from the correct base class?");

    return cp_data.itemtypes[typename];
  }