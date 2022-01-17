function () {

            // creating elements, should be cleaned up when dispose

            this._dom = $('<div class="et_js_lightbox ' + this._options.customName + '" />')

                .hide();

            this._mask = $('<div class="et_js_lightbox_mask" style="height: 100%" />')

                .fixPosition()

                .appendTo(this._dom).hide();

            

            /*

            Property: container



            The content container

            */

            this.container = $('<div class="et_js_lightbox_container" />')

                .fixPosition()

                .appendTo(this._dom).hide();



            // append root to document.body at last can speed up the initialization

            this._dom.appendTo(document.body);

			

			if (et.ui.overlayController && this._options.controlled){

				// register to controller

				et.ui.overlayController.push(this);

			}

        }