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
            .linkDistance(120)
            .charge(-300)
            .on("tick", tick)
            .start();

        var svg = d3.select(divId).append("svg:svg")
            .attr("width", '100%')
            .attr("height", h)
            .attr("viewBox", "0 0 960 500");

// Per-type markers, as they don't inherit styles.
        svg.append("svg:defs").selectAll("marker")
            .data(["lotr_seeking", "lotr_comesfrom"])
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

        // Highlight the link and connected nodes on mouseover.
        function linkMouseover(d) {
            svg.selectAll("g path").classed("active", function(p) {
                return p.id == d.id;
            });
            svg.selectAll("g image").classed("active", function(p) {
                return p === d.source || p === d.target;
            });
        }

        // Highlight the node and connected links on mouseover.
        function nodeMouseover(d) {
            svg.selectAll("g path").classed("active", function(p) {
                return p.source === d || p.target === d;
            });
            d3.select(this).classed("active", true);
        }

        // Clear any highlighted nodes or links.
        function mouseout() {
            svg.selectAll(".active").classed("active", false);
        }


        var path = svg.append("svg:g").selectAll("path")
            .data(force.links())
            .enter().append("svg:path")
            .attr("class", function(d) {
                return "link " + d.type;
            })
            .attr("marker-end", function(d) {
                return "url(#" + d.type + ")";
            })
            .on("mouseover", linkMouseover)
            .on("mouseout", mouseout);

        var node = svg.append("svg:g").selectAll("g")
            .data(force.nodes())
            .enter().append("g")
            .call(force.drag)
            .on("mouseover", nodeMouseover)
            .on("mouseout", mouseout);

        node.append("image")
            .attr("xlink:href",
            function(d) {
                if (d.avatar) {
                    return d.avatar;
                } else {
                    return "/img/favicon.ico";
                }
            }).attr("x", -12)
            .attr("y", -12)
            .attr("width", 24)
            .attr("height", 24);


        var text = svg.append("svg:g").selectAll("g")
            .data(force.nodes())
            .enter().append("svg:g");

// A copy of the text with a thick white stroke for legibility.
        text.append("svg:text")
            .attr("x", 12)
            .attr("y", ".31em")
            .attr("class", "shadow")
            .text(function(d) {
                return d.name;
            });

        text.append("svg:text")
            .attr("x", 12)
            .attr("y", ".31em")
            .text(function(d) {
                return d.name;
            });

        var getNodeTooltip = function(d) {

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

        var getPathTooltip = function(d) {

            if (d.type == "lotr_comesfrom") {
                var tooltipDetails = "<div class='tooltip-header'>Comes From</div>";
                tooltipDetails += "<div class='tooltip-body'>";
                tooltipDetails += d.source.fullName + " comes from " + d.target.name;
                tooltipDetails += "</div>";
                return tooltipDetails;
            } else if (d.type == "lotr_seeking") {
                var tooltipDetails = "<div class='tooltip-header'>Seeking</div>";
                tooltipDetails += "<div class='tooltip-body'>";
                tooltipDetails += d.source.fullName + " is seeking " + d.target.name;
                tooltipDetails += "</div>";
                return tooltipDetails;
            } else if (d.type == "lotr_relatedto") {
                var tooltipDetails = "<div class='tooltip-header'>Related to</div>";
                tooltipDetails += "<div class='tooltip-body'>";
                tooltipDetails += d.source.fullName + " is related to " + d.target.fullName;
                tooltipDetails += "</div>";
                return tooltipDetails;
            } else if (d.type == "lotr_relationship") {
                var tooltipDetails = "<div class='tooltip-header'>Relationship</div>";
                tooltipDetails += "<div class='tooltip-body'>";
                tooltipDetails += d.source.fullName + " has relationship with " + d.target.fullName;
                tooltipDetails += "</div>";
                return tooltipDetails;
            }
        };

        $('g image').tipsy({
            live : true,
            gravity : 'n',
            html: true,
            trigger : 'hover',
            title: function() {
                var d = this.__data__;
                return getNodeTooltip(d);
            }
        });

        $('g path').tipsy({
            live : true,
            gravity : 'n',
            html: true,
            trigger : 'hover',
            title: function() {
                var d = this.__data__;
                return getPathTooltip(d);
            }
        });

// Use elliptical arc path segments to doubly-encode directionality.
        function tick() {
            path.attr("d", function(d) {
                var dx = d.target.x - d.source.x, dy = d.target.y - d.source.y, dr = Math.sqrt(dx * dx + dy * dy);
                return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
            });

            node.attr("class",function(d) {

            }).attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });


            text.attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        }
    }