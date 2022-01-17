function() {

      var ctx, line, i,
          grid = document.createElement("canvas"),
          gridNode = document.querySelector("#radar_grid"),
          dims = {
            width: null,
            height: null
          },
          canvas = this.ctx.canvas,
          radarDist = 0,
          upper = 340;


      if ( gridNode === null ) {
        grid.id = "radar_grid";
        // Setup position of grid overlay
        grid.style.position = "relative";
        grid.style.top = "-" + (canvas.height + 3) + "px";
        grid.style.zIndex = "9";


        // Setup size of grid overlay
        grid.width = canvas.width;
        grid.height = canvas.height;

        // Insert into DOM, directly following canvas to overlay
        canvas.parentNode.insertBefore( grid, canvas.nextSibling );

        // Capture grid overlay canvas context
        ctx = grid.getContext("2d");


        ctx.fillStyle = "black";
        ctx.fillRect( 0, 0, grid.width, grid.height);
        ctx.closePath();

        ctx.font = "bold 12px Helvetica";

        ctx.strokeStyle = "green";
        ctx.fillStyle = "green";
        ctx.lineWidth = 1;

        for ( i = 0; i <= 6; i++ ) {

          ctx.beginPath();
          ctx.arc(
            grid.width / 2,
            grid.height,

            60 * i,

            Math.PI * 2, 0,
            true
          );

          if ( i < 6 ) {
            ctx.fillText(
              radarDist + 60,
              grid.width / 2 - 7,
              upper
            );
          }

          ctx.stroke();
          ctx.closePath();
          upper -= 60;
          radarDist += 60;
        }
      }

      return this;
    }