function(){
    console.log("using index");      
    var values = [45, 30, 25],
        labels = ['Fulfilled', 'Complete', 'Something'],
        colors = ['#00A79B', '#D8DF21', '#bf272d'];
        Raphael("piechart", 700, 700).pieChart(300, 300, 150, values, labels, colors, "#fff");

  }