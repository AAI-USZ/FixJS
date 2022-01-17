function(node, startNode, endNode, options) {
    
    if (startNode.z < endNode.z) {
        var tmp = endNode;
        endNode = startNode;
        startNode = tmp;
    }
    

    var openList = [];
    openList.push(startNode);
    startNode.open = true;

    var traversedNodes = 1;

    startNode.g = 0;
    startNode.h = this.heuristic(startNode, endNode, options.heuristic, options.heightFactor);
    startNode.f = startNode.g + startNode.h;

    while(openList.length > 0) {
        
        var currentIndex = this.getNextIndex(openList);
        
        var currentNode = openList[currentIndex];

        if (currentNode == endNode) {
            

            var path = [];
            var aNode = currentNode;

            while(aNode.cameFrom) {
                path.push(aNode);
                aNode.path = true;
                aNode = aNode.cameFrom;
            }
            path.push(startNode);
            startNode.path = true;

            return {path: path,traversedNodes: traversedNodes};
        }
        traversedNodes++;

        openList.remove(currentIndex);
        currentNode.open = false;
        currentNode.closed = true;

        var neighbors = this.getNeighbors(currentNode, node, options.diagonal);
        
        for (var i=0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];

            if(neighbor.closed || neighbor.wall) {
                continue;
            }

            //var tentative_g = currentNode.g + this.distance(currentNode,neighbor);
            var tentative_g = currentNode.g + this.distance(currentNode,neighbor, options.heuristic, options.heightFactor);

            var tentativeIsBetter = false;

            if (!neighbor.open) {
                neighbor.open = true;
                neighbor.h = this.heuristic(neighbor,endNode, options.heuristic, options.heightFactor);
                openList.push(neighbor);
                
                tentativeIsBetter = true;
            } else if (tentative_g < neighbor.g) {
                tentativeIsBetter = true;
            } else {
                tentativeIsBetter = false;
            }

            if (tentativeIsBetter) {
                neighbor.cameFrom = currentNode;
                neighbor.g = tentative_g;
                neighbor.f = neighbor.g + neighbor.h;
            }
        }
    }

    return {path: [],traversedNodes: traversedNodes};
}