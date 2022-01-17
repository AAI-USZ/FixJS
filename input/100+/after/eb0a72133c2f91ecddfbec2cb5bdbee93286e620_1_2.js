function(script, mainParameters, debugging) {
  var workerscript = "";
  workerscript += script;
  if(debugging)
  {
    workerscript += "\n\n\n\n\n\n\n/* -------------------------------------------------------------------------\n";
    workerscript += "OpenJsCad debugging\n\nAssuming you are running Chrome:\nF10 steps over an instruction\nF11 steps into an instruction\n";
    workerscript += "F8  continues running\nPress the (||) button at the bottom to enable pausing whenever an error occurs\n";
    workerscript += "Click on a line number to set or clear a breakpoint\n";
    workerscript += "For more information see: http://code.google.com/chrome/devtools/docs/overview.html\n\n";
    workerscript += "------------------------------------------------------------------------- */\n"; 
    workerscript += "\n\n// Now press F11 twice to enter your main() function:\n\n";
    workerscript += "debugger;\n";
  }
  workerscript += "return main("+JSON.stringify(mainParameters)+");";  
  var f = new Function(workerscript);
  OpenJsCad.log.prevLogTime = Date.now();    
  var obj = f();
  return obj;
}