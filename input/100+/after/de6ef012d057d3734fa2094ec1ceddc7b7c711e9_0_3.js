function(message, content){
  if(this.logLevel !== 'verbose'){
    return false;
  }

  var currentDate = new Date();
  var dateString = currentDate.toString().match(/\d\d:\d\d:\d\d/)[0]; 

  if (!content){
    console.log(colors.dkgray + "[" + dateString + "]: " + colors.reset, message);
  }else{
    console.log(colors.dkgray +"[" + dateString + "]: " + colors.reset, message, "\t", JSON.stringify(content));
  }
}