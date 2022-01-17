function () {

            var canvas_temp, map_data = this.map_data;

            // draw new base canvas, then swap with the old one to avoid flickering

            canvas_temp = map_data.base_canvas;



            map_data.base_canvas = this.createVisibleCanvas(map_data);

            $(map_data.base_canvas).hide();

            $(canvas_temp).before(map_data.base_canvas);



            map_data.redrawSelections();



            $(map_data.base_canvas).show();

            $(canvas_temp).remove();

        }