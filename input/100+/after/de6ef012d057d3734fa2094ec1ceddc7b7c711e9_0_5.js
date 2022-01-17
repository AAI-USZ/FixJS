function(theTest, receivedValue, expectedValue, message){
  if (theTest){
    console.log(colors.green + "✔" + colors.reset + "\t" + message);
  }else{
    console.log(colors.red + "✖" + colors.reset + "\t" + message + "\t" + colors.white + expectedValue + colors.reset + " !== " + colors.red + receivedValue + colors.reset);
  }
}