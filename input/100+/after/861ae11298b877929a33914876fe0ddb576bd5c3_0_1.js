function(data){
        if (data.length === undefined || data.length === 0) { return; }

        var max;
        if (this.sort_direction === 1){
            this.data = data.sort(this._compare_node);
            max = this.data[0].value;
        } else {
            this.data = data.sort(this._compare_node_reverse);
            max = this.data[this.data.length - 1].value;
        }

        // Check to see if the arc width is too big, if it is reduce the width of the arcs
        if (this.data.length * this.arc.width > this.r * (1 - this.arc.internal)){
            this.arc.width = this.r * (1 - this.arc.internal) / this.data.length;
        }

        // Check to see if the description is too big, if it is reduce the height of the descripion
        if (this.data.length * this.key.height > this.h * this.key.height_percent){
            this.key.height = this.h / this.data.length * this.key.height_percent;
        }

        var me = this;
        var arc = d3.svg.arc()
             .startAngle(function(d, i) { return me.arc.start_angle; })
             .endAngle(function(d, i) { return d.value / max  * me.arc.end_angle + me.arc.start_angle; })
             .innerRadius(function(d, i) { return me.innerRadius(i); })
             .outerRadius(function(d, i) { return me.outerRadius(i); });


        this.vis = d3.select(this.node).append("svg")
            .attr("class", "chart")
            .attr("width", this.w)
            .attr("height", this.h)
            .append('g')
            .attr("transform", "translate(" + (this.r + me.arc.offset_x) + "," + (this.r + me.arc.offset_y) + ")");

        // Add the arcs
        var graph = this.vis.selectAll('path')
            .data(this.data);


        graph.enter().append('path')
            .attr('d', arc)
            .attr('id', function(d, i){
                if (d.id === undefined)
                    return me.node.substring(1, me.node.length) + '-arc-' + i;
                return d.id;
            })
            .attr('class', function(d, i) { return 'ag-arc ag-color ag-group-' + i; })
            .style('fill', function(d, i) { return me.colors[i]; });

        // Add the values next to the arcs
        var arc_font_size = parseInt(this.arc.width * 0.8, 10);
        graph.enter().append('text')
                .attr('x', 5)
                .attr('y', function(d,i) { return me.outerRadius(i);  } )
                .attr('dy',  arc_font_size * -0.2)
                .attr("text-anchor", "start")
                .attr('class',  function(d, i) { return 'ag-arc-value ag-color ag-group-' + i; })
                .style("fill",  function(d, i) { return me.colors[i]; })
                .style('font-size',  arc_font_size + 'px')
                .text(function(d, i) { return d.value; });

        // Add the heading for the description
        var description_header_font = parseInt(this.key.height * 0.8, 10);
        graph.enter().append('text')
                .attr('x', this.r * 1.4)
                .attr('y', function(d, i){ return me.descriptionLocation(i) - 5; })
                .style("fill",  function(d, i) { return me.colors[i]; })
                .style('font-size',  description_header_font + 'px')
                .style('font-weight', 'bold')
                .attr('class', function(d, i) { return 'ag-header-value ag-color ag-group-' + i; })
                .text(function(d, i) { return d.value2; });

        // Add a line under the text
        graph.enter().append('line')
                .attr('x1', this.r * 1.35)
                .attr('x2', this.w * 0.95)
                .attr('y1', function(d, i){ return me.descriptionLocation(i) - 1; } )
                .attr('y2', function(d, i){ return me.descriptionLocation(i) - 1; } )
                .attr('class', 'ag-header-line')
                .style("stroke", this.key.line_color);

        // Add a line under the text
        var description_font = parseInt(description_header_font * 0.5, 10);
        graph.enter().append('text')
                .attr('x', this.r * 1.55 + description_header_font * 2)
                .attr('y', function(d, i){  return me.descriptionLocation(i) - description_header_font / 3; } )
                .style("fill", this.key.text_color )
                .style('font-size',  description_font + 'px')
                .attr('class', function(d, i) { return 'ag-header-description ag-color ag-group-' + i; })
                .text( function(d){ return d.description; });
    }