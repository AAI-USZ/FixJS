function sketch(setup) {

    var defaults = {

        width: window.innerWidth,

        height: window.innerHeight

    };

    if (!Function.prototype.bind) {

      Function.prototype.bind = function (oThis) {

        if (typeof this !== "function") {

          // closest thing possible to the ECMAScript 5 internal IsCallable function

          throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");

        }



        var aArgs = Array.prototype.slice.call(arguments, 1),

            fToBind = this,

            fNOP = function () {},

            fBound = function () {

                try {

              return fToBind.apply(this instanceof fNOP

                                     ? this

                                     : oThis,

                                   aArgs.concat(Array.prototype.slice.call(arguments)));

                } catch(e) {

                    //catching what javascriptcore considers an illegal use of instanceof

                    return fToBind.apply(oThis, aArgs.concat(Array.prototype.slice.call(arguments)));

                }

            };



        fNOP.prototype = this.prototype;

        fBound.prototype = new fNOP();



        return fBound;

      };

    }    



    var canvas = setup.canvas || (function() { return document.body.appendChild(document.createElement('canvas')); }());



    canvas.width = setup.width || defaults.width;

    canvas.height = setup.height || defaults.height;



    var ctx = canvas.getContext('2d');



    var fps = 60;

    if(setup.fps) {

        fps = setup.fps;

    }

    var lastDraw = null;

    var reqAnimFrame = (window.requestAnimationFrame       || 

                       window.webkitRequestAnimationFrame || 

                       window.mozRequestAnimationFrame    || 

                       window.oRequestAnimationFrame      || 

                       window.msRequestAnimationFrame || 

                        function(callback) {

                            window.setTimeout(callback, 1000 / fps);

                        }).bind(window);





    var update = setup.update;

    var draw = setup.draw;

    var state;

    state = setup.state || {};



    if(setup.images) {

        var imageNames = Object.keys(setup.images),

            images = {},

            loaded = 0,

            total = imageNames.length,

            load = function() {

                loaded += 1;

                if(loaded === total) {

                    if(setup.events.loaded) {

                        setup.events.loaded(images);

                    }

                    reqAnimFrame(drawLoop);

                } else {

                    if(setup.events.progress) {

                        setup.events.progress((loaded / total) * 100.0);

                    }

                }

            };

        for(var i = 0 ; i < imageNames.length ; i++) {

            images[imageNames[i]] = new Image;

            images[imageNames[i]].onload = load;

            images[imageNames[i]].onerror = load;

            images[imageNames[i]].src = 'images/' + imageNames[i] + '.png';

        }

    }

    else {

        reqAnimFrame(drawLoop);

    }

    function drawLoop(time) {

        if(lastDraw === null) {

            lastDraw = time;

        }

        if(!time || time - lastDraw > 1000 / fps) {

            lastDraw = time;

            if(update) {

                update(state);

            }

            if(draw) {

                draw(ctx, images, state);

            }

        }

        reqAnimFrame(drawLoop);

    }

}