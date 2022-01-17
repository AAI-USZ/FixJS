function(image,id) {

            var index,src,me = this;



            if (!image) { return; }



            if (typeof image === 'string') {

                src = image;

                image = me[src];

                if (typeof image==='object') {

                    return me.indexOf(image);

                }



                image = $('<img />')

                    .addClass('mapster_el')

                    .hide();



                index=me._add(image[0]);

                

                image

                    // .bind('load',function(e) {

                    //     me.imageLoaded.call(me,e);

                    // })

                    .bind('ferror',function(e) {

                        me.imageLoadError.call(me,e);

                    });

                

                image.attr('src', src);

            } else {



                // use attr because we want the actual source, not the resolved path the browser will return directly calling image.src

                

                index=me._add($(image)[0]);

            }

            if (id) {

                if (this[id]) {

                    throw(id+" is already used or is not available as an altImage alias.");

                }

                me.ids.push(id);

                me[id]=me[index];

            }

            return index;

        }