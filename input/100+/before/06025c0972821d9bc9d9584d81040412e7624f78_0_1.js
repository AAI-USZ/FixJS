function createGraph(container, data) {
	var series = [];
	for (var i = 0; i < data.length; i++) {
	    var temp = data[i];
	    series.push({
		data : temp,
		pointStart: new Date(temp[0][0]),
		pointInterval: 24 * 3600,
		tooltip: {
		    valueDecimals: 2
		}
	    });
	}

	chart = new Highcharts.StockChart({
	    chart : {
		renderTo : container
	    },

	    rangeSelector : {
		selected : 1
	    },

	    title : {
		text : 'User Balance Graphs'
	    },

	    series : series
	});


    }