function chart(div) {
		var width = x.range()[1],
			height = y.range()[0];

		y.domain([0, (group.top(1).length > 0 ? group.top(1)[0].value : 0)]);

		div.each(function() {
			var div = d3.select(this),
				g = div.select("g");

			// Create the skeletal chart.
			if (g.empty()) {
				div.select(".title").append("a")
					.attr("href", "javascript:reset(" + id + ")")
					.attr("class", "reset")
					.text("reset")
					.style("display", "none");

				g = div.append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
				.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				g.append("clipPath")
					.attr("id", "clip-" + id)
				.append("rect")
					.attr("width", width)
					.attr("height", height);

				g.selectAll(".bar")
					.data(["background", "foreground"])
				.enter().append("path")
					.attr("class", function(d) { return d + " bar"; })
					.datum(group.all());

				g.selectAll(".foreground.bar")
					.attr("clip-path", "url(#clip-" + id + ")");

				g.append("g")
					.attr("class", "axis")
					.attr("transform", "translate(0," + height + ")")
					.call(axis);

				// Initialize the brush component with pretty resize handles.
				var gBrush = g.append("g").attr("class", "brush").call(brush);
				gBrush.selectAll("rect").attr("height", height);
				gBrush.selectAll(".resize").append("path").attr("d", resizePath);
			}

			// Only redraw the brush if set externally.
			if (brushDirty) {
				brushDirty = false;
				g.selectAll(".brush").call(brush);
				div.select(".title a").style("display", brush.empty() ? "none" : null);
				if (brush.empty()) {
					g.selectAll("#clip-" + id + " rect")
						.attr("x", 0)
						.attr("width", width);
				} else {
					var extent = brush.extent();
					g.selectAll("#clip-" + id + " rect")
						.attr("x", x(extent[0]))
						.attr("width", x(extent[1]) - x(extent[0]));
				}
			}

			g.selectAll(".bar").attr("d", barPath);
		});

		function barPath(groups) {
			var path = [],
				i = -1,
				n = groups.length,
				d;
			while (++i < n) {
				d = groups[i];
				path.push("M", x(d.key), ",", height, "V", y(d.value), "h", barWidth, "V", height);
			}
			if (path.length == 0) {
				path.push("M0,0");
			}
			return path.join("");
		}

		function resizePath(d) {
			var e = +(d == "e"),
				x = e ? 1 : -1,
				y = height / 3;
			return "M" + (.5 * x) + "," + y
				+ "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6)
				+ "V" + (2 * y - 6)
				+ "A6,6 0 0 " + e + " " + (.5 * x) + "," + (2 * y)
				+ "Z"
				+ "M" + (2.5 * x) + "," + (y + 8)
				+ "V" + (2 * y - 8)
				+ "M" + (4.5 * x) + "," + (y + 8)
				+ "V" + (2 * y - 8);
		}
	}