function displayAll(){
  all = true;
  
  options["xaxis"] = Flotr.defaultOptions["xaxis"];
  
  yearly = calcSeries(20, rate, 1);
  
  monthly = calcSeries(20, rate, 12);
  
  daily = calcSeries(20, rate, 365);
  
  cont = calcSeries(20, rate, 0);
  
  graph = Flotr.draw(container, [
  {
    data: yearly,
    label: "Yearly"
  },
  {
    data: monthly,
    label: "Monthly"
  },
  {
    data: daily,
    label: "Daily"
  },
  {
    data: cont,
    label: "Continuous"
  }],
  options);
}