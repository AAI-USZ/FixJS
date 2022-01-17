function createPage() {
	console.log('------------CREATING LOG------------');
	getData();

	var html = "<!DOCTYPE HTML><html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'><title>Highcharts Example</title><script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'></script><script type='text/javascript'>$(function () {var chart; $(document).ready(function() { chart = new Highcharts.Chart({ chart: { renderTo: 'container', type: 'line', marginRight: 130,},title: {text: 'Load time',x: -20 },subtitle: {text: 'First respons',x: -20},xAxis: {title: {text: 'Number of clients'},plotLines: [{value: 0,width: 1,color: '#808080'}]},yAxis: {title: {text: 'Load time in milliseconds'},plotLines: [{value: 0,width: 1,color: '#808080'}]},tooltip: {formatter: function() {return '<b>'+ this.series.name +'</b><br/>'+this.x +': '+ this.y ;}},legend: {layout: 'vertical',align: 'right',verticalAlign: 'top',x: -10,y: 100,borderWidth: 0},series: [" + clients + "]});});});</script></head><body><script src='js/highcharts.js'></script><script src='js/modules/exporting.js'></script><div id='container' style='min-width: 400px; height: 400px; margin: 0 auto'></div></body></html>"
	fs.writeFile(__dirname + '/charting.html', html, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("------------THE LOGS ARE CREATED------------");
			console.log("------------THE LOGS WILL BE OPEND IN YOUR BROWSER!------------");
		}
	});
}