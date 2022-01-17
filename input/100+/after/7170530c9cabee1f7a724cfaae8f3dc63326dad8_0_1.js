function(data){
        if (data.length === undefined || data.length === 0) { return; }
        this.data = data;
        var i, j;

        if (this.bar.max === 0){
            this.bar.max = 0;

            if (this.stacked_bar){
                for (i = 0 ; i< this.data.length; i++){
                    var n =  this.data[i];
                    var total = n.values[n.values.length - 1];

                    if (this.bar.max < total){
                        this.bar.max = total;
                    }
                }

            }else{
                for (i = 0 ; i< this.data.length; i++){
                    if (this.bar.max < this.data[i].value){
                        this.bar.max = this.data[i].value;
                    }
                }
            }
        }

        var l= this.data.length;
        // Check to see if the arc width is too big, if it is reduce the width of the arcs
        if ( l * this.bar.height + (l - 1) * this.bar.margin > this.h - this.bar.height){
            this.bar.height =  (this.h - (l - 1) * this.bar.margin) / (l + 2);
        }

        if (this.legend.enabled){
            this.bar.start = this.w * 0.2;
        } else {
            this.bar.start = 0;
        }

        if (this.bar.text){
            this.bar.end = this.w * 0.80;
        } else {
            this.bar.end = this.w;
        }

        this.bar.width = this.bar.end - this.bar.start;

        var me = this;

        this.vis = d3.select(this.node).append("g")
            .attr("class", "chart")
            .attr("width", this.w)
            .attr("height", this.h);

        var rects = this.vis.selectAll('rect')
            .data(this.data);

        var y = d3.scale.linear()
            .domain([0, this.data.length + 1])
            .rangeRound([this.bar.height / 3, this.h, this.bar.margin]);

        var x = d3.scale.linear()
            .domain([0, 1])
            .range([this.bar.start, this.bar.end]);

        if (this.bar.background !== false){
            rects.enter().append('rect')
                .attr('x', this.bar.start)
                .attr('width', this.bar.width)
                .attr('y', function(d, i) { return y(i); })
                .attr('height', this.bar.height)
                .attr('class', function(d, i){ return 'hb-rect-background hg-group-' + i; })
                .attr('fill', this.bar.background);
        }
        if (this.stacked_bar){
            for (i = 0; i < this.data.length; i++){
                var tmpdata = this.data[i].values;
                tmpdata.reverse();

                this.vis.selectAll('rect.hg-bar-group-' + i).data(tmpdata)
                    .enter().append('rect')
                    .attr('x', this.bar.start)
                    .attr('width', function(d, i){ return  d / me.bar.max * me.bar.width; })
                    .attr('y', function(d, j){ return y(i); })
                    .attr('height', this.bar.height)
                    .attr('class', function(d, j) { return 'hb-rect hg-bar-group-' + i +' hg-group-' + j })
                    .style('fill', function(d, j) { return me.colors(d, i, j); });
            }

        }else{
            rects.enter().append('rect')
                .attr('x', this.bar.start)
                .attr('width', function(d, i){ return  d.value / me.bar.max * me.bar.width; })
                .attr('y', function(d, i){ return y(i); })
                .attr('height', this.bar.height)
                .attr('class', function(d, i) { return 'hb-rect hg-group-' + i; })
                .style('fill', function(d, i) { return me.colors(d, i); });
        }


        if (this.bar.text){
            rects.enter().append('text')
                .attr('x', function(d, i){ return d.value / me.bar.max * me.bar.width + me.bar.start; })
                .attr('text-anchor', 'start')
                .attr('dx', '0.5em')
                .attr('y', function(d, i){ return (y(i) + y(i + 1)) / 2; })
                .attr('height', this.bar.height)
                .attr('font-size', '8px')
                .attr('class', function(d, i) { return 'hb-rect hb-rect-text-value hg-group-' + i; })
                .style('fill', function(d, i) { return me.colors(d, i); })
                .text(function(d, i) { return d.value; });
        }

        if (this.legend.enabled){
            rects.enter().append('text')
                .attr('x', 25)
                .attr('text-anchor', 'end')
                .attr('y', function(d, i){ return (y(i) + y(i + 1)) / 2; })
                .attr('dy', '0.2em')
                .attr('height', this.bar.height)
                .attr('text-align', 'right')
                .attr('class', function(d, i) { return 'hb-rect hb-rect-text hg-group-' + i; })
                .text(function(d, i) { return d.key; });
        }


        if (this.line.percent !== undefined){
            this.line.constant = this.line.percent * this.bar.max;
            this.line.text = this.line.percent * 100 + '%';
        }

        if (this.line.average !== undefined){
            var average = 0;
            for (i =0 ; i< this.data.length; i++){
                average += this.data[i].value;
            }
            average = average / this.data.length;
            this.line.constant = Math.round(average * 10) / 10;
        }

        if (this.line.constant !== undefined){
            var line_x_offset = this.line.constant / this.bar.max * this.bar.width + this.bar.start;
            this.vis.selectAll('line').data([this.line.constant])
                .enter().append('line')
                .attr('x1', line_x_offset)
                .attr('x2', line_x_offset)
                .attr('y1', this.bar.height / 3)
                .attr('y2', y(this.data.length) )
                .attr('stroke-dasharray', '4')
                .attr('stroke-width', '3')
                .attr('fill', this.line.color)
                .attr('stroke', this.line.color)
                .attr('class', 'hb-line');

            if (this.line.text === undefined){
                this.line.text = this.line.constant;
            }

            this.vis.selectAll('text.hb-line').data([this.line.text])
                .enter().append('text')
                .attr('x', line_x_offset)
                .attr('text-anchor', 'middle')
                .attr('dy', '-0.4em')
                .attr('y', this.bar.height / 3)
                .attr('fill', this.line.color)
                .attr('class', 'hb-line')
                .text(String);
        }

    }