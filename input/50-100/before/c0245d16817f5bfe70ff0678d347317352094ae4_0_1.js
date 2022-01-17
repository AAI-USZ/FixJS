function() {
        var sw = parseInt(d3.select("#display").style("width"));
        var sh = parseInt(d3.select("#display").style("height"));
        tributary.canvas.width = sw;
        tributary.canvas.height = sh;
        tributary.ctx.clearRect(0, 0, sw, sh);

    }