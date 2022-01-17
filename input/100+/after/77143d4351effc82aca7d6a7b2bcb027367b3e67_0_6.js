function (username, container) {
    var n = 200,
        stack = d3.layout.stack().offset("silhouette")
            .values(function (d) { return d.values; })
            .x(function (d, i) { return i; }),
        data = [],
        colour = d3.scale.category20b(),
        random = d3.random.normal(0, 0.2),
        width = 960,
        height = 500,
        mx = n - 1,
        my = 100,
        x = d3.scale.linear().range([0, width]),
        y = d3.scale.linear().range([height, 0]),
        area = d3.svg.area()
            // .interpolate("basis")
            .x(function (d, i) { return x(i); })
            .y0(function (d) { return y(d.y0); })
            .y1(function (d) { return y(d.y + d.y0); }),
        svg = d3.select(container)
            .append("svg")
                .attr("width", width)
                .attr("height", height);

    svg.append("defs").append("clipPath")
            .attr("id", "clip")
        .append("rect")
            .attr("width", width - 10)
            .attr("height", height);

    svg = svg.append("g")
        .attr("class", "stream-graph")
        .attr("clip-path", "url(#clip)");

    function streamIndex(d) {
        return {y: Math.max(0, d)};
    }

    function getData() {
        var i,
            len,
            name,
            layers = [],
            interest,
            interests = testData.object.interests;

        for (i = 0, len = interests.length; i < len; i++) {
            interest = interests[i];
            name = Beancounter.getNameFromResource(interest.resource);
            layers.push({
                name: name,
                values: [streamIndex(interest.weight)]
            });
        }

        return layers;
    }

    function addData(data) {
        return data.map(function (d) {
            var currentValue = d.values[d.values.length - 1],
                newValue = currentValue.y - (currentValue.y + random());
            d.values.push(streamIndex(currentValue.y + random()));
            return d;
        });
    }

    function removeData(data) {
        return data.map(function (d) {
            d.values.shift();
            return d;
        });
    }

    function redraw() {
        var layers;

        data = addData(data);
        y.domain([0, d3.max(stack(data), function (d) {
            return d3.max(d.values, function (d) {
                return d.y0 + d.y;
            });
        })]);

        layers = svg.selectAll("path").data(stack(data));

        layers.enter().append("path")
            .style("fill", function (d, i) { return colour(i); })
            .attr("d", function (d) { return area(d.values); })
            .on("click", function (d) {
                // TODO.
            })
            .append("title")
                .text(function (d) { return d.name; });

        // TODO: Fix the jerky re-centring of the graph in the y-axis.
        // Draw the new data outside the range of the x-axis, then update the
        // domain of the scale and gracefully transition the new data into the
        // container.
        // layers.transition()
        //     .duration(500)
        //     .attr("d", function (d) { return area(d.values); });
        layers.attr("d", function (d) { return area(d.values); });
        x.domain([0, (data[0].values.length > n) ? n : data[0].values.length - 1]);
        layers.transition()
            .duration(1000)
            .attr("d", function (d) { return area(d.values); });
        // layers.transition()
        //     .delay(500)
        //     .duration(500)
        //     .attr("d", function (d) {
        //         x.domain([0, (data[0].values.length > n) ? n : data[0].values.length - 1]);
        //         return area(d.values);
        //     });

        // If the number of samples has reached some specified threshold, start
        // scrolling the data across the container.
        if (data[0].values.length > n) {
            layers.attr("transform", null)
                .transition()
                    .duration(1000)
                    .ease("linear")
                    .attr("transform", "translate(" + x(-1) + ")");

            data = removeData(data);
        }
    }

    function updateStreamGraph() {
        redraw();
        setTimeout(updateStreamGraph, 1000);
    }

    return {
        init: function () {
            data = getData();
            updateStreamGraph();
        }
    };
}