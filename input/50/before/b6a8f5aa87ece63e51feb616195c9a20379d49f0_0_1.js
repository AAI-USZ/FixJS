function(typename)
  {
    if( cp_data.itemtypes == null )
      throw new Error("cp_data.setContentItemTypes() was never called");

    return cp_data.itemtypes[typename];
  }