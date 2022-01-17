function maxPaneSize() {
			var avail = new Array($('#Stats_Performance').innerHeight(), $('#Stats_Performance').innerWidth());
			var offset = new Array($('#GooglePerformanceChartOverview').outerHeight(), $('#GooglePerformanceChartOverview').outerWidth());
			var max = new Array(avail[0] - offset[0] - 40, avail[1] - 20);
			var current = new Array($('#GooglePerformanceChart').height(), $('#GooglePerformanceChart').width());
			if(max[0] != current[0]) $('#GooglePerformanceChart').height(max[0]);
			if(max[1] != current[1]) $('#GooglePerformanceChart').width(max[1]);
		}