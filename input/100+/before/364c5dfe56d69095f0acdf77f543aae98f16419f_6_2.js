function (img, src, altId) {

        var image, source, me = this,

        getImageIndex=function(img) {

            return $.inArray(img, me.images);

        },



        // fires on image onLoad evens, could mean everything is ready

        load=function() {

            var index = getImageIndex(this);

            if (index>=0) {



                me.imageStatus[index] = true;

                if ($.inArray(false, me.imageStatus) < 0 &&

                            (!me.options.safeLoad || m.windowLoaded)) {

                    me.initialize();

                }

            }

        },

        storeImage=function(image) {

            var index = me.images.push(image) - 1;

            me.imageSources[index] = source;

            me.imageStatus[index] = false;

            if (altId) {

                me.altImagesXref[altId] = index;

            }

        };



        if (!img && !src) { return; }



        image = img;

        // use attr because we want the actual source, not the resolved path the browser will return directly calling image.src

        source = src || $(image).attr('src');

        if (!source) { throw ("Missing image source"); }



        if (!image) {

            image = $('<img class="mapster_el" />').hide()[0];



            //$(this.images[0]).before(image);



            //image = new Image();

            //image.src = source;



            $('body').append(image);

            storeImage(image);

            $(image).bind('onload',load).bind('onerror',function(e) {

                me.imageLoadError.call(me,e);

            });

            $(image).attr('src', source);



        } else {

            storeImage(image);

        }



    }