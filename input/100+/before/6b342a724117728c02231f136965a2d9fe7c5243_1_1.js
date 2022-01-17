function () {
                            var box = this.getContent().parentNode,
                                projection = this.getProjection(),
                                location = projection.fromLatLngToContainerPixel(marker.position),
                                targetX = location.x + box.offsetWidth / 2 + (this.pixelOffset_.width||0),
                                targetY = location.y - box.offsetHeight + (this.pixelOffset_.height||0) + (container.offsetHeight / 2)
                                    - $(search.form.parentNode).offset().top - search.form.parentNode.offsetHeight - 40,
                                target = projection.fromContainerPixelToLatLng(new google.maps.Point(targetX, targetY));
                            
                            gmap.panTo(target);
                        }