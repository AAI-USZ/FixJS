function (i,s) {

                shapeContext.save();

                if (s.options.fill) {

                    if (s.options.alt_image) {

                        me.addAltImage(shapeContext, s.options.alt_image, s.mapArea, s.options);

                    } else {

                        shapeContext.beginPath();

                        me.renderShape(shapeContext, s.mapArea);

                        shapeContext.closePath();

                        //shapeContext.clip();

                        shapeContext.fillStyle = me.css3color(s.options.fillColor, s.options.fillOpacity);

                        shapeContext.fill();

                    }

                }

                shapeContext.restore();

            }