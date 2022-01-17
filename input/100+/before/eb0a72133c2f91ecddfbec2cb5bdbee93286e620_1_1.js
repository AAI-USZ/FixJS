function(mainParameters)
{
  try
  {
    if(typeof(main) != 'function') throw new Error('Your jscad file should contain a function main() which returns a CSG solid.');
    OpenJsCad.log.prevLogTime = Date.now();    
    var csg = main(mainParameters);
    if( (typeof(csg) == "object") && ((csg instanceof CAG)) )
    {
      // convert a 2D shape to a thin solid:
      csg=csg.extrude({offset: [0,0,0.1]});
    }
    if( (typeof(csg) != "object") || (!(csg instanceof CSG)) )
    {
      throw new Error("Your main() function should return a CSG solid.");
    }
    var csg_bin = csg.toCompactBinary();
    csg = null; // not needed anymore
    self.postMessage({cmd: 'rendered', csg: csg_bin});
  }
  catch(e)
  {
    var errtxt = e.stack;
    if(!errtxt)
    {
      errtxt = e.toString();
    } 
    self.postMessage({cmd: 'error', err: errtxt});
  }
}