function(data){
        if (data.length === undefined || data.length === 0) { return; }
        var d, i;
        if (this.data !== undefined){
            for (i = 0; i < this.data.length; i ++){
                if (i > data.length){
                    break;
                }
                data[i]._value = this.data[i].value;
                data[i]._old_total = this.data[i]._total;
            }

        }

        this.data = data;
        var total = 0;


        for (i =0 ; i < this.data.length; i ++){
            d = this.data[i];
            d._total = total;

            total += this.data[i].value;
        }

        if (this.total !== undefined && this.total > 0){
            total = this.total;
        }



        var me = this;
        var arc = d3.svg.arc()
            .startAngle(function(d, i) { return me.arc.start_angle + d._total / total * Math.PI * 2;  })
            .endAngle(function(d, i) { return  me.arc.start_angle + (d._total + d.value) / total * Math.PI * 2;  })
            .innerRadius(this.r - this.arc.width)
            .outerRadius(this.r);

        arcTween = function(b) {
            var dx = b._value === undefined ? 0 : b._value;
            var dtotal = b._old_total === undefined ? b._total : b._old_total;
            var i = d3.interpolate({"value": dx, "_total": dtotal}, b);

            return function(t) {
                t._value = t.value;
                return arc(i(t));
            };
        };


        this.vis = d3.select(this.node).select('g.chart');
        if (this.vis.empty()){
            this.vis =  d3.select(this.node).append("svg")
                .attr("class", "chart")
                .attr("width", this.w)
                .attr("height", this.h)
                .append('g')
                .attr('class', 'chart')
                .attr("transform", "translate(" + (this.r + me.arc.offset_x) + "," + (this.r + me.arc.offset_y) + ")");
        }

        //this.vis.selectAll('path.spg-arc').remove();
        // Add the arcs
        var paths = this.vis.selectAll('path.spg-arc')
            .data(this.data);

        paths.enter().append('path')
            .attr('class', function(d, i) { return 'spg-arc spg-color spg-group-' + i +' spg-arc-' + i; })
            .style('stroke', '#fff')
            .style('stroke-width', this.arc.margin / 2)
            .style('fill', this.colors);


        paths
            .transition()
            .duration(this.duration)
            .attrTween('d', arcTween)
            .attr('class', function(d, i) { return 'spg-arc spg-color spg-group-' + i +' spg-arc-' + i; })
            .style('stroke', '#fff')
            .style('stroke-width', this.arc.margin / 2)
            .style('fill', this.colors);

        paths.exit().transition()
            .duration(250)
            .style('opacity', 0);

        var text = this.vis.selectAll('path.spg-arc-text').data(this.data);
        text.enter().append('text')
            .attr("transform", function(d, i) { return "translate(" + arc.centroid(d, i) + ")"; })
                .attr('text-anchor', 'middle')
                .attr('dy', '0.25em')
                .attr('class' , function(d, i){ return 'spg-arc-text spg-group-' + i; })
                .style('fill', '#fff')
                .style('font-size', '12')
                .text(function(d , i){ return d.value + '%'; });

    }