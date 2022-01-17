function(ctx, images, state) {

            ctx.fillStyle = '#0f0';

            ctx.fillRect(0, 0, 50, 50);

            if(state.draw) {

            	state.draw(ctx);

            }

        }