function (et, $) {

    var defaultOptions = {

        customName: '',

		controlled: true

    };

    

    var prvt = {

        xBrowserBeforeShow: function(){

            var envbox;

            

            // for iOS, position = fixed doesn't work, so we need to put the masking over whole page.

            // iOS sucks

            if (!$.support.positionFixed){

                envbox = et.dom.getEnv();

                this._mask

                    .height(envbox.bodyHeight)

                    .css({

                        top: 0

                    });

                    

                // set container top to proper position relatively to viewport

                this.container.css({

                    top: document.body.getBoundingClientRect().top * -1

                });

            }

        }

    };

    

    var ctor = function (options) {

        this._options = {};



        $.extend(this._options, defaultOptions, options);



        p._init.apply(this, arguments);

    };



    ctor.prototype = {

        _init: function () {

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

        },

		_handleShow: function(dom, mask){

			dom.show();

			mask.show().css('opacity', 0).fadeTo('fast', 0.5);

		},

		_handleHide: function(dom, mask){

			mask.fadeTo('fast', 0, function(){

				dom.hide();

			});

		},

        /*

        Method: show

        

        Display overlay

        */

        show: function () {

            // do some tricky stuff that related to cross-browser

            prvt.xBrowserBeforeShow.call(this);

			this.container.show();

            this._handleShow(this._dom, this._mask);

			this._dom.trigger('et.ui.overlay.show');

        },

        /*

        Method: hide



        Hide overlay

        */

        hide: function () {

			this.container.hide();

            this._handleHide(this._dom, this._mask);

			this._dom.trigger('et.ui.overlay.hide');

        },

        /*

        Method: dispose



        Dispose overlay, remove unneccesary elements from dom.

        */

        dispose: function () {

            this._mask.remove();

            this.container.remove();

            this._dom.remove();

			this._dom.trigger('et.ui.overlay.dispose');

        },

		onHide: function(callback){

			this._dom.bind('et.ui.overlay.hide', callback);

		},

		onShow: function(callback){

			this._dom.bind('et.ui.overlay.show', callback);

		},

		onDispose: function(callback){

			this._dom.bind('et.ui.overlay.dispose', callback);

		}

    };



    var p = ctor.prototype;



    et.ui.overlay = ctor;



}