function(history){
			var $chart = $$("#prima-chart");
			$chart.hide().text(history.join());
			$chart.peity("line");
			$chart.show();
		}