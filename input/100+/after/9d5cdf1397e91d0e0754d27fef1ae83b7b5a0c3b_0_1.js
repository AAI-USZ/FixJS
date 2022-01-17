function step() {
        world.Step(
            1 / 40, // frame-rate
            10,  // velocity iterations
            10  // position iterations
        );
        handleInteractions(player, keys, canvas);

        ctx.clearRect(-1 * width, 0, 4 * width, height);
        world.DrawDebugData();
        world.ClearForces();

        // If mouse in canvas, draw preview.
        var marginLeft = parseInt($canvasWrap.css('marginLeft'));
        var marginTop = parseInt($canvasWrap.css('marginTop'));
        if (mouseX > marginLeft &&
            mouseX < marginLeft + width &&
            mouseY > marginTop  &&
            mouseY < marginTop + height) {
            switch(currentTool) {
                case 'tool-rect': case 'tool-platform': case 'tool-springboard':
                    ctx.strokeRect(mouseX - marginLeft - opts.width * SCALE / 2 - 8 - offsetX,
                                   mouseY - marginTop - opts.height * SCALE / 2,
                                   opts.width * SCALE, opts.height * SCALE);
                    break;
                case 'tool-circle':
                    ctx.beginPath();
                    ctx.arc(mouseX - marginLeft - 8 - offsetX,
                            mouseY - marginTop,
                            opts.radius * SCALE, 0, 2 * Math.PI);
                    ctx.stroke();
                    break;
                case 'tool-landmine':
                    ctx.strokeRect(mouseX - marginLeft - .5 * SCALE / 2 - 8 - offsetX,
                                   mouseY - marginTop - SCALE / 2 + 15,
                                   .5 * SCALE, 1);
                    break;
            }
        }


        ctx.drawImage(logo, width / 2 / SCALE, 10);
        requestAnimFrame(step);
    }