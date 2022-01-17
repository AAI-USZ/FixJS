function drawFlame(xpos, ypos) {
    var canvas, context;
    var mul = 30;
    canvas = document.getElementById("flames");
    context = canvas.getContext("2d");
    clearFlameLayer();
    context.fillStyle = '#ff0000';
    context.fillRect(xpos*mul,ypos*mul,30,30);

    function drawFlameTo(index, xFire, yFire) {
        if(graph.nodes[index]) {
            if(count < 1) {
                if(graph.nodes[index].containedEntity) {
                    graph.nodes[index].containedEntity = null;
                    count++;
                }
                context.fillStyle = '#ff0000';
                context.fillRect(xFire,yFire,30,30);
            }
            return true;
        } else
            return false;
    }

    var count = 0;
    for (var i = xpos+1; i <= xpos+otherplayer[player.id].blastRadius && i>=0 && i<graph.width; i++) {
        if(!drawFlameTo(ypos*graph.height+i, i*mul, ypos*mul))
            break;
    }
    count = 0;
    for (var i = xpos-1; i >= xpos-otherplayer[player.id].blastRadius && i>=0 && i<graph.width; i--) {
        if(!drawFlameTo(ypos*graph.height+i, i*mul, ypos*mul ) )
            break;
    }
    count = 0;
    for (var i = ypos+1; i <= ypos+otherplayer[player.id].blastRadius && i>=0; i++) {
        if(!drawFlameTo(i*graph.height+xpos, xpos*mul, i*mul))
            break;
    }
    count = 0;
    for (var i = ypos-1; i >= ypos-otherplayer[player.id].blastRadius && i>=0; i--) {
        if(!drawFlameTo(i*graph.height+xpos, xpos*mul, i*mul))
            break;
    }
}