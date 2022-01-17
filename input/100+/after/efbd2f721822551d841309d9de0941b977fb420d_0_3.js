function() {
        console.log("LAYOUT IS DONE");
        
        var scale = 15;
        var offsetX = 10;
        var offsetY = 10;
		var regionW = 20;
		var regionH = 20;
        var patch = 2;
        
	   var currentBB = this._graphLayout.layout.getBoundingBox();
        
        var minX = this._width;
        var minY = this._height;
        
        var regionCenter = [];
        for (var i = 0; i < this._graphLayout.nodeCount; i++) {
            var centerX = this._graphLayout.layout.nodePoints[i].p.x - currentBB.bottomleft.x;
            var centerY = this._graphLayout.layout.nodePoints[i].p.y - currentBB.bottomleft.y;
            centerX = Math.floor(centerX * scale);
            centerY = Math.floor(centerY * scale);
            regionCenter[i] = {x: centerX, y: centerY};
            
            if (centerX - regionW / 2 < minX)
                minX = centerX - regionW / 2;
            if (centerY - regionH / 2 < minY)
                minY = centerY - regionH / 2;
        }

        for (var i = 0; i < this._graphLayout.nodeCount; i++) {
            regionCenter[i].x -= minX;
            regionCenter[i].y -= minY;
            
            if (regionCenter[i].x + regionW / 2 >= this._col)
                regionCenter[i].x = Math.floor(this._col - regionW / 2 - 1);
            if (regionCenter[i].y + regionH / 2 >= this._row)
                regionCenter[i].y = Math.floor(this._row - regionH / 2 - 1);
        }
        
        // Generate region for each node
        console.log("regionCenters: regionCenters.length = " + regionCenter.length, regionCenter);
        for (var i = 0; i < regionCenter.length; i++) {
            var patchRegion = this.generateRegion(regionW, regionH, patch);
            this.addRegion(patchRegion, regionCenter[i].x, regionCenter[i].y);
        }
		
        // Connect region based on edges info - Draw line connect center of regions
        var edges = this._graphLayout.graph.edges;
        for (var i = 0; i < edges.length; i++) {
            var p0 = edges[i].source.id;
            var p1 = edges[i].target.id;
            
            this.drawLine(regionCenter[p0], regionCenter[p1], this._tiles, 9);
        }
    }