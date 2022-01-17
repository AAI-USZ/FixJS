function drawFlame(xpos, ypos) {

    var canvas, context;

    var mul = 30;

    canvas = document.getElementById("flames");

    context = canvas.getContext("2d");

    clearFlameLayer();

    context.fillStyle = '#ff0000';

    context.fillRect(xpos*mul,ypos*mul,30,30);

    var count = 0;

    for (var i = xpos+1; i <= xpos+otherplayer[player.id].blastRadius; i++) {

        if(graph.nodes[ypos*graph.height+i]) {

            if(count < 1) {

                if(graph.nodes[ypos*graph.height+i].containedEntity) {

                    graph.nodes[ypos*graph.height+i].containedEntity = null;

                    count++;

                }

                context.fillStyle = '#ff0000';

                context.fillRect(i*mul,ypos*mul,30,30);

            }

        } else

            break;

    }



    count = 0;

    for (var i = xpos-1; i >= xpos-otherplayer[player.id].blastRadius; i--) {

        if(graph.nodes[ypos*graph.height+i]) {

            if(count < 1) {

                if(graph.nodes[ypos*graph.height+i].containedEntity) {

                    graph.nodes[ypos*graph.height+i].containedEntity = null;

                    count++;

                }

            context.fillStyle = '#ff0000';

            context.fillRect(i*mul,ypos*mul,30,30);

            }

        } else

            break;

    }



    count = 0;

    for (var i = ypos+1; i <= ypos+otherplayer[player.id].blastRadius; i++) {

        if(graph.nodes[i*graph.height+xpos]) {

            if(count < 1) {

                if(graph.nodes[i*graph.height+xpos].containedEntity) {

                    graph.nodes[i*graph.height+xpos].containedEntity = null;

                    count++;

                }

            context.fillStyle = '#ff0000';

            context.fillRect(xpos*mul,i*mul,30,30);

            }

        } else

            break;

    }



    count = 0;

    for (var i = ypos-1; i >= ypos-otherplayer[player.id].blastRadius; i--) {

        if(graph.nodes[i*graph.height+xpos]) {

            if(count < 1) {

                if(graph.nodes[i*graph.height+xpos].containedEntity) {

                    graph.nodes[i*graph.height+xpos].containedEntity = null;

                    count++;

                }

            context.fillStyle = '#ff0000';

            context.fillRect(xpos*mul,i*mul,30,30);

            }

        } else

            break;

    }



}