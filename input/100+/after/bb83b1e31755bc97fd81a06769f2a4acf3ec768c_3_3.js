function (result, index) {
                    var photo = $('<div class="photo" id="photo' 
                        + index + '"><img src="' + result.url+ '"></div>').appendTo(container.find('.photos'));    
                    var rotation = (Math.random() * 90 - 45),
                        scale = 0.4 + Math.random() * 0.2,
                        transform = 'rotate(' + rotation + 'deg)';
                    // Using a scale() transform causes all kind of problems when used with draggable,
                    // as the element's bounding box and thus its offset will be moved. This could 
                    // be fixed by applying the matrix operation the origins and apply the value to 
                    // the draggable's 'cursorAt' options property. 
                    var img = photo.find('img');
                    img.css('-webkit-transform', transform)
                        .css('-moz-transform', transform)
                        .attr('width', photo.find('img').width() * scale);
                    photo.css({
                            left: Math.random() * ($(container).width() - img.width() - 50),
                            top: Math.random() * ($(container).height() - img.height() - 50)
                        })
                        .draggable()
                        .mousedown(function () {
                            $(selectedPhoto).removeClass('selected');
                            $(this).addClass('selected');
                            selectedPhoto = this;
                        })
                        .data({
                            rotation: rotation,
                            scale: scale
                        });
                }