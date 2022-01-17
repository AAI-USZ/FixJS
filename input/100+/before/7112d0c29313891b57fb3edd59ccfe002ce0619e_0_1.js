function drawObstacles() {
    var index = 35;
    var canvas, context, image, width, height, x = 0, y = 0, numFrames = 15, frameSize = 29;
    var mul = 30;
    image = new Image();
    image.src = "./spritesheet.png";
    image.onload = function() {
        function drawObstacle(xpos, ypos) {
            width = image.width;
            height = image.height;
            canvas = document.getElementById("obstacles");
            y = (index-(index%numFrames))/numFrames*frameSize;
            x = (index%numFrames)*frameSize;
            context = canvas.getContext("2d");
            context.drawImage(image, x, y, frameSize, frameSize, xpos*mul+4, ypos*mul+4, frameSize, frameSize);
        }
        for(var i = 0; i < graph.height; i++) {
            for (var j = 0; j < graph.width; j++) {
                if(graph.nodes[i*graph.height+j] && graph.nodes[i*graph.height+j].containedEntity) {
                    if(graph.nodes[i*graph.height+j].containedEntity.type === 'obstacle') {
                        drawObstacle(j,i);
                    }
                }
            }
        }
    }
}