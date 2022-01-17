function(query, divId, data, queryForm) {

        var nodes = data.nodes;
        var links = data.links;

// Compute the distinct nodes from the links.

        links.forEach(function(link) {
            link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
            link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
        });


        var w = 960, h = 500;

        var force = d3.layout.force()
            .nodes(d3.values(nodes))
            .links(links)
            .size([w, h])
            .linkDistance(60)
            .charge(-300)
            .on("tick", tick)
            .start();

        var svg = d3.select(divId).append("svg:svg")
            .attr("width", '100%')
            .attr("height", h)
            .attr("viewBox", "0 0 960 500");

// Per-type markers, as they don't inherit styles.
        svg.append("svg:defs").selectAll("marker")
            .data(["lotr_seeking"])
            .enter().append("svg:marker")
            .attr("id", String)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 20)
            .attr("refY", -2.0)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");

        var path = svg.append("svg:g").selectAll("path")
            .data(force.links())
            .enter().append("svg:path")
            .attr("class", function(d) {
                return "link " + d.type;
            })
            .attr("marker-end", function(d) {
                return "url(#" + d.type + ")";
            });

        var circle = svg.append("svg:g").selectAll("circle")
            .data(force.nodes())
            .enter().append("svg:circle")
            .attr("r", 6)
            .call(force.drag);

        var text = svg.append("svg:g").selectAll("g")
            .data(force.nodes())
            .enter().append("svg:g");

// A copy of the text with a thick white stroke for legibility.
        text.append("svg:text")
            .attr("x", 8)
            .attr("y", ".31em")
            .attr("class", "shadow")
            .text(function(d) {
                return d.name;
            });

        text.append("svg:text")
            .attr("x", 8)
            .attr("y", ".31em")
            .text(function(d) {
                return d.name;
            });

        var getTooltip = function(d) {

            var title = d['fullName'] ? d['fullName'] : d['name'];
            var gender = d['gender'] ? d['gender'] : "";
            var biography = d['biography'] ? d['biography'] : "";

            var tooltipDetails = "<div class='tooltip-header'>" + title + "</div>";
            tooltipDetails += "<div class='tooltip-body'>";
            if (d["avatar"]) {
                tooltipDetails += "<img class='tooltip-thumbnail' src='" + d["avatar"] + "'/>";
            }
            tooltipDetails += "<div style='clear:both'></div>";
            if (gender) {
                tooltipDetails += "Gender: " + gender;
            }
            if (biography) {
                tooltipDetails += "<br/>Bio: " + biography + "</div>";
            }
            tooltipDetails += "</div>";

            return tooltipDetails;
        };

        $('g circle').tipsy({
            live : true,
            gravity : 'n',
            html: true,
            trigger : 'hover',
            title: function() {
                var d = this.__data__;
                return getTooltip(d);
            }
        });

// Use elliptical arc path segments to doubly-encode directionality.
        function tick() {
            path.attr("d", function(d) {
                var dx = d.target.x - d.source.x, dy = d.target.y - d.source.y, dr = Math.sqrt(dx * dx + dy * dy);
                return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
            });

            circle.attr("r",function(d) {
                if (d.name == "The One Ring") {
                    return 10;
                } else {
                    return 6;
                }
            }).attr("class",function(d) {
                if (d.gender && d.gender == 'female') {
                    return "female";
                } else if (d.name == "The One Ring") {
                    return "ring";
                }
            }).attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });


            text.attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        }
    }