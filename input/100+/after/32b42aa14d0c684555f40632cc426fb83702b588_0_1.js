function() {
		//----------find the right scale and tickinterval for xAxis------------
		/*if (this.reportStop && this.reportStart){
			var timestampInterval = (this.reportStop/1000) - (this.reportStart/1000)
			var tsFormat = this.findScaleAxe(timestampInterval)
			var tickInterval = this.findTickInterval(timestampInterval)
		} else {
			var tsFormat = 'H:i'
			var tickInterval = global.commonTs.threeHours * 1000
		}*/
		//---------------------------------------------------------

		this.options = {
			reportMode: this.reportMode,

			cwidget: this,

			chart: {
				renderTo: this.wcontainerId,
				defaultSeriesType: this.SeriesType,
				//type: this.chart_type,
				height: this.getHeight(),
				reflow: false,
				animation: false,
				borderColor: this.borderColor,
				borderWidth: this.borderWidth,
				backgroundColor: this.backgroundColor,
				events: {
					redraw: this.checkTimewindow
				}
			},
			global: {
				useUTC: false
			},
			exporting: {
				enabled: false
			},
			colors: [],
			title: {
				text: this.chartTitle,
				floating: true,
				style: {
					fontSize: this.title_fontSize
				}
			},
			tooltip: {
				enabled: this.tooltip,
				formatter: function() {
					var y = this.y;
					if (this.series.options.invert)
						y = - y;
					return '<b>' + rdr_tstodate(this.x / 1000) + '<br/>' + this.series.name + ':</b> ' + y;
				}
			},
			xAxis: {
				id: 'timestamp',
				type: 'datetime',
				tickmarkPlacement: 'on'
			},
			yAxis: [
				{
					title: { text: null }
				},{
					id: "state",
					title: { text: null },
					labels: { enabled: false },
					max: 100
				}
			],
			plotOptions: {
				series: {
					animation: false,
					shadow: false
				}
			},
			symbols: [],
			credits: {
				enabled: false
			},
			legend: {
				enabled: this.legend,
				verticalAlign: this.legend_verticalAlign,
				align: this.legend_align,
				layout: this.legend_layout,
				backgroundColor: this.legend_backgroundColor,
				borderWidth: this.legend_borderWidth,
				borderColor: this.legend_borderColor,
				itemStyle: {
					fontSize: this.legend_fontSize,
					color: this.legend_fontColor
				}
			},
			series: []
		};

		//graph type (for column)
		if (this.chart_type == 'column') {
			this.options.chart.type = this.chart_type;
		}

		// Check marker
		var marker_enable = false;
		if (this.marker_symbol) {
			marker_enable = true;
		}else {
			this.marker_symbol = null;
			this.marker_radius = 0;
		}

		// Ymax
		if (this.SeriePercent) {
			this.options.yAxis[0].max = 100;
			//this.options.yAxis.title.text = 'pct'
		}

		// Configure line type
		if (this.SeriesType == 'area') {
			this.options.plotOptions['area'] = {
				lineWidth: this.lineWidth,
				shadow: false,
				cursor: 'pointer',
				turboThreshold: 10,
				marker: {
					enabled: marker_enable,
					symbol: this.marker_symbol,
					radius: this.marker_radius
				}
			};

		}else if (this.SeriesType == 'line') {
			this.options.plotOptions['line'] = {
				lineWidth: this.lineWidth,
				shadow: false,
				cursor: 'pointer',
				turboThreshold: 10,
				marker: {
					enabled: marker_enable,
					symbol: this.marker_symbol,
					radius: this.marker_radius
				}
			};
		}

		//specifique options to add
		if (this.exportMode) {
			this.options.plotOptions.series['enableMouseTracking'] = false;
		}else {
			if (this.zoom) {
				this.options.chart.zoomType = 'x';
			}
		}
	}