function(node_id, metric_name, bunit, min, max, yAxis) {		
		var serie_id = node_id + '.' + metric_name;
		
		if (! yAxis)
			yAxis = 0

		//var serie = this.chart.get(serie_id)
		var serie = this.series_hc[serie_id];
		if (serie) { return serie }

		log.debug('  + Create Serie:', this.logAuthor);

		if (this.SeriePercent && max > 0)
			bunit = '%';

		var serie_index = this.chart.series.length;

		log.debug('    + serie id: ' + serie_id, this.logAuthor);
		log.debug('    + serie index: ' + serie_index, this.logAuthor);
		log.debug('    + bunit: ' + bunit, this.logAuthor);

		var metric_long_name = '';

		if (this.nb_node != 1) {
			var node = this.nodesByID[node_id]
			if (node){
				metric_long_name = node.dn[0];
				if (info.source_type == 'resource')
					metric_long_name += ' - ' + node.dn[1];

				metric_long_name = '(' + metric_long_name + ') ';
			}
		}

		var colors = global.curvesCtrl.getRenderColors(metric_name, serie_index);
		var curve = global.curvesCtrl.getRenderInfo(metric_name);

		// Set Label
		var label = undefined;
		if (curve)
			label = curve.get('label');
		if (! label)
			label = metric_name;

		metric_long_name += '<b>' + _(label) + '</b>';

		if (bunit)
			metric_long_name += ' ('+ bunit + ')';

		log.debug('    + legend: ' + metric_long_name, this.logAuthor);

		var serie = {id: serie_id, name: metric_long_name, data: [], color: colors[0], min: min, max: max, yAxis: yAxis};

		if (curve) {
			serie['dashStyle'] = curve.get('dashStyle');
			serie['invert'] = curve.get('invert');
		}

		if (this.SeriesType == 'area' && curve) {
			serie['fillColor'] = colors[1];
			serie['fillOpacity'] = colors[2] / 100;
			serie['zIndex'] = curve.get('zIndex');
		}

		this.series[serie_id] = serie;

		this.chart.addSeries(Ext.clone(serie), false, false);

		var hcserie = this.chart.get(serie_id);

		this.series_hc[serie_id] = hcserie;

		return hcserie;
	}