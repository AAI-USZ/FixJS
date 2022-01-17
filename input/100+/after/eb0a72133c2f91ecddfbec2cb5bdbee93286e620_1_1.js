function(mainParameters)
{
  try
  {
    if(typeof(main) != 'function') throw new Error('Your jscad file should contain a function main() which returns a CSG solid or a CAG area.');
    OpenJsCad.log.prevLogTime = Date.now();    
    var result = main(mainParameters);
    if( (typeof(result) != "object") || ((!(result instanceof CSG)) && (!(result instanceof CAG))))
    {
      throw new Error("Your main() function should return a CSG solid or a CAG area.");
    }
    var result_compact = result.toCompactBinary();
    result = null; // not needed anymore
    self.postMessage({cmd: 'rendered', result: result_compact});
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