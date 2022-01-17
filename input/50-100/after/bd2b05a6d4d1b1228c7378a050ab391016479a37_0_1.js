function displaySeries(){
  //var data = [];
  years = 10;

  // Sample the exponential function
  var data = calcSeries(years, rate, timesPerYear);
  
  options["xaxis"] = {
    title: "Growth after 10 years is $" + Math.round(interest(timesPerYear, 10, rate)*100)/100
  }
  // Draw Graph
  graph = Flotr.draw(container, [data], options);
}