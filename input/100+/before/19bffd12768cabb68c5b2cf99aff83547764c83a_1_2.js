function drawFromJson() {
        // We iterate through all paths, create a new path `div` and append it to the drawing area.
        for (var i = 0; i < pathCount; i += 1) {
            var pathDiv = makePathDiv(jsonData.paths[i]);

            // We position the nodes on the path.
            positionNodesOnPath(pathDiv);

            // We append the generated path `<div>` to the drawing area `<div>`.
            config.drawingArea.append(pathDiv);

            // We hide all but the first path.
            if (i > 0) {
                $(pathDiv).hide();
            }
        }

        // We draw all edges. Only the edges of the currently visible path on screen
        // will be visible.
        for (var j = 0; j < pathCount; j += 1) {
            var currPath = jsonData.paths[j],
                edgeCount = currPath.edges.length;

            for (var k = 0; k < edgeCount; k += 1) {
                drawEdge(currPath.edges[k], currPath.id);
            }
        }

        // We are finished. We store the current path index.
        activePathIndex = 0;
    }