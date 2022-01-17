function Partner(selector, globOptions) {
    var chart = null;
    var api = function(config) {
	this.config = config;
    }

    api.prototype.get = function(filters, cb) {
	this._request(filters, cb);
    }

    api.prototype._request = function(data, cb) {
	$.ajax({
	    url : this.config.url,
	    data : data,
	    dataType : 'json',
	    success : function(data) {
		cb(data);
	    },
	    error : function(d, t) {
		//console.log("there was an error \n" + t);
	    }
	});
    }




    
    function getData(options) {
	var data = new api({
	    url : globOptions.url + 'api?'});
	data.get(options, function(data){
        
	    //console.log(data.length);
	    //console.log(data);
	    //$('#loader').hide();
	    createGraph($(selector).get(0), data);
                
	}); 
    } 
    

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

    getData(globOptions.params);

}