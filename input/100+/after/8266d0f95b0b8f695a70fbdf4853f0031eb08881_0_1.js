function (data) {

    var nodes_for_link,
        links_visible,
        links,
        splines,
        path,
        node,
        arc;

    var data_for_link = [];
    for (var i = 0; i < data.length; i++) {
        data_for_link[i] = Object.create(data[i]);
    }

    nodes = cluster.nodes(brainMap.root(data));
    nodes_for_link = cluster.nodes(brainMap.root(data_for_link));

    nodes = partition.nodes(brainMap.root(data));
    nodes = nodes.filter(filterRoot);

    node = svg.selectAll("g.node")
              .data(nodes)
              .enter()
              .append("svg:g")
              .attr("id", function (d) { return "node-" + d.key; })
              .attr("class", "nodes");

    //con_map = brainMap.evidence(nodes);
    name_node_map = brainMap.nameNodeMap(nodes);
    display_node_map = brainMap.displayNameNodeMap(nodes);

    for (i = 0; i < nodes.length; i++) {
        var d = nodes[i];
        d.px = d.x;
        d.py = d.y;
        d.x = (d.px + d.dx / 2) * 180 / Math.PI;
        d.y = Math.sqrt(d.py + 150000 - d.dy * (d.depth - 2) * 2 + d.dy / 2);
    }

    links = brainMap.connections(nodes);
    links_visible = brainMap.connections(nodes_for_link);
    splines = bundle(links_visible, links);

    arc = d3.svg.arc()
        .innerRadius(function (d) {
            return Math.sqrt(d.py + 150000 - d.dy * (d.depth - 2) * 2);
        })
        .outerRadius(function (d) {
            return Math.sqrt(d.py + 150000 - d.dy * (d.depth - 2) * 2 + d.dy);

        })
        .startAngle(function (d) {
            return d.px;

        })
        .endAngle(function (d) {
            return d.px + d.dx;
        });

    //
    // Connections
    //
    path = svg.selectAll("path.link")
        .data(links)
        .enter()
        .append("svg:path")
        .attr("class", function (d) {
            return "link source-" + d.source.key + " target-" + d.target.key;
        })
        .attr("d", function (d, i) { return line(splines[i]); })
        //TODO: make paths highlights source target arcs
        .on("mouseover", linkMouseOver)
        .on("mouseout", linkMouseOut)
        .on("click", linkClick);

    //
    // Arcs
    //
    if (!is_firefox) {
        node.append("svg:path")
            //.data(nodes.filter(filterRoot))
            .attr("d", arc)
            .attr("id", function (d) { return "arc-" + d.key; })
            .attr("class", "arc")
            .attr("fill", "white")
            .attr("stroke", "white")
            .on("mouseover", mouseOver)
            .on("mouseout", mouseOut)
            .on("click", nodeClick);
    } else {
        node.append("svg:circle")
            .attr("r", function (d) { return 2; })
            .attr("transform", function (d) {
                return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
            })
            .on("mouseover", mouseOver)
            .on("mouseout", mouseOut)
            .on("click", nodeClick);
    }

    node.append("svg:text")
        //.attr("dx", function(d) { return d.x < 180 ? 15 : -15; })
        .attr("id", function (d) { return "text-" + d.key; })
        .attr("class", function(d) {if (d.depth == 2) {console.log(d); return "text_top";} else {return "text";}})
        .attr("dy", ".31em")
        .attr("text-anchor", "middle")
        .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
        //.attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
        //.attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
        //.attr("transform", function(d) {
            //return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
        .text(function (d) { return d.displayName; })
        .on("mouseover", mouseOver)
        .on("mouseout", mouseOut)
        .on("click", nodeClick);
}