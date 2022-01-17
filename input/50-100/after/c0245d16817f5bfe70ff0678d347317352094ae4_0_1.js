function() {
        //var sw = parseInt(d3.select("#display").style("width"));
        //var sh = parseInt(d3.select("#display").style("height"));
        tributary.canvas.width = tributary.sw;
        tributary.canvas.height = tributary.sh;
        tributary.ctx.clearRect(0, 0, tributary.sw, tributary.sh);

    }