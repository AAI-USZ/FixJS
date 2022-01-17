function () {
            // Calculate it all
            that.setup();
            // Draw viewbox and subsequent group to draw keys into
            that.d3container = d3.select("#" + that.container.attr('id'));  // ??????
            var svg = that.d3container.append("svg");
            svg.attr("style", "height: 100%;");
            svg.attr("viewBox", that.model.viewbox.dim);

            that.noteGroup = svg.append("g");
            that.noteGroup.attr("transform", "translate(" + that.model.padding / 2 + "," + that.model.padding / 2 + ")");

            // Draw the keys
            that.render();
        }