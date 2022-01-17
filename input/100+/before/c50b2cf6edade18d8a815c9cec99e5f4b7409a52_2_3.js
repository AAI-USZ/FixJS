function(){
            // Calculate it all
            that.setup();
            // Draw viewbox and subsequent group to draw keys into
            that.d3container = d3.select("#piano");  // ??????
            var svg = that.d3container.append("svg");
            svg.attr("viewBox", that.model.viewbox.dim)
            svg.attr("id", "viewbox")
            
            that.noteGroup = svg.append("g")
            that.noteGroup.attr("transform", "translate(" + that.model.padding / 2 + "," + that.model.padding / 2 + ")");
            
            // Draw the keys
            that.render();
        }