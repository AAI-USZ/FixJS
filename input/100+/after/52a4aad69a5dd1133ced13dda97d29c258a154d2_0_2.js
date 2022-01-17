function () {

                    switch (inst.mode) {

                    case 'h':

                        $('.ui-colorpicker-map-layer-1', e).css({'background-position': '0 0', 'opacity': ''}).show();

                        $('.ui-colorpicker-map-layer-2', e).hide();

                        break;



                    case 's':

                    case 'a':

                        $('.ui-colorpicker-map-layer-1', e).css({'background-position': '0 -260px', 'opacity': ''}).show();

                        $('.ui-colorpicker-map-layer-2', e).css({'background-position': '0 -520px', 'opacity': ''}).show();

                        break;



                    case 'v':

                        $(e).css('background-color', 'black');

                        $('.ui-colorpicker-map-layer-1', e).css({'background-position': '0 -780px', 'opacity': ''}).show();

                        $('.ui-colorpicker-map-layer-2', e).hide();

                        break;



                    case 'r':

                        $('.ui-colorpicker-map-layer-1', e).css({'background-position': '0 -1040px', 'opacity': ''}).show();

                        $('.ui-colorpicker-map-layer-2', e).css({'background-position': '0 -1300px', 'opacity': ''}).show();

                        break;



                    case 'g':

                        $('.ui-colorpicker-map-layer-1', e).css({'background-position': '0 -1560px', 'opacity': ''}).show();

                        $('.ui-colorpicker-map-layer-2', e).css({'background-position': '0 -1820px', 'opacity': ''}).show();

                        break;



                    case 'b':

                        $('.ui-colorpicker-map-layer-1', e).css({'background-position': '0 -2080px', 'opacity': ''}).show();

                        $('.ui-colorpicker-map-layer-2', e).css({'background-position': '0 -2340px', 'opacity': ''}).show();

                        break;

                    }

                    that.repaint();

                }