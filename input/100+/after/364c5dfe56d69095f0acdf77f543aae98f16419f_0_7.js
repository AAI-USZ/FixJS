function(canvas, elementName) {

            var c = $(canvas);



            this.elementName = elementName;

            this.canvas = canvas;



            this.width = c.width();

            this.height = c.height();

            this.shapes = [];

            this.masks = [];

            this.active = true;



        }