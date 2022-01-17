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

            this.container = $('<div class="et_js_lightbox_container" />');



            /*

                If the device is Mobile(Iphone or Ipad or Android etc.), we set position: absolute,

                because if there is any input element in the lightbox, when you click it and want to enter data,

                you can't locate to the input, as it set the properties: position: fixed and margin-top

            */

            var regMobile = /(mobile)/gi;

            if(regMobile.test(window.navigator.userAgent)){

                this.container.css('position', 'absolute')

                              .appendTo(this._dom).hide();

            }

            else{

                this.container.fixPosition()

                    .appendTo(this._dom).hide();

            }



            // append root to document.body at last can speed up the initialization

            this._dom.appendTo(document.body);

			

			if (et.ui.overlayController && this._options.controlled){

				// register to controller

				et.ui.overlayController.push(this);

			}

        }