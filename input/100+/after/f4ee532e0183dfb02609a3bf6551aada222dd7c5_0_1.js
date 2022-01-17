function() {
		var recordSelection = d3.select(this).selectAll(".record")
			.data(records, function(d) { return d.startTime; });

		var recordSelectionEnter = recordSelection.enter().append("tr")
			.attr("class", "record")

		recordSelection.exit().remove();

		recordSelectionEnter.append("td").html(function(d) {
			return '<input type="radio" name="file1" value="' + d['id'] + '" />'
				+  '<input type="radio" name="file2" value="' + d['id'] + '" />';
		});

		recordSelectionEnter.append("td").html(function(d) {
			return '<a href="' + window.uris.timelineDetails + '?file1=' + d['id'] + '" class="btn small">Timeline &raquo;</a>'
				+  '<a href="' + window.uris.xhprofDetails + '?run=' + d['id'] + '" class="btn small">XHProf &raquo;</a>'
		});

		for (var optionName in window.options) {
			recordSelectionEnter.append("td")
				.text(function(d) {if (typeof d[optionName] == 'string') return d[optionName]});
		}
		for (var calculationName in window.calculations) {
			if (window.calculations[calculationName].nameOfRowToDisplayInsteadInTable) {
				calculationName = window.calculations[calculationName].nameOfRowToDisplayInsteadInTable;
			}
			recordSelectionEnter.append("td")
				.text(function(d) {return d[calculationName]});
		}

		recordSelection.order()
	}