function(history){
			var $chart = $$("#prima-chart");
			$chart.hide().text(history.reverse().join());
			$chart.peity("line");
			$chart.show();
		}