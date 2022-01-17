function(e) {
    if(e.data)
    { 
      if(e.data.cmd == 'rendered')
      {
        //var csg = CSG.fromObject(e.data.csg);
        var csg = CSG.fromCompactBinary(e.data.csg);
        callback(null, csg);
      }
      else if(e.data.cmd == "error")
      {
//        var errtxt = "Error in line "+e.data.err.lineno+": "+e.data.err.message;
        callback(e.data.err, null);
      }
      else if(e.data.cmd == "log")
      {
        console.log(e.data.txt);
      }
    }
  }