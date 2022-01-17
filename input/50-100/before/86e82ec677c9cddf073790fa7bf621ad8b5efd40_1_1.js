function() {

    sketch({

        width: 200,

        height: 300,

        canvas: document.getElementById('canvas'),

        draw: function(ctx, images) {

            ctx.fillStyle = '#0f0';

            ctx.fillRect(0, 0, 50, 50);

        }

    });

}