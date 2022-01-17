function (inst) {

                var that	= this,

                    e		= null,

					mousemove_timeout = null,

                    _mousedown, _mouseup, _mousemove, _html;



                _mousedown = function (event) {

                    if (!inst.opened) {

                        return;

                    }



                    var div		= $('.ui-colorpicker-map-layer-pointer', e),

                        offset	= div.offset(),

                        width	= div.width(),

                        height	= div.height(),

                        x		= event.pageX - offset.left,

                        y		= event.pageY - offset.top;



                    if (x >= 0 && x < width && y >= 0 && y < height) {

                        event.stopImmediatePropagation();

                        event.preventDefault();

						e.unbind('mousedown', _mousedown);

                        $(document).bind('mouseup', _mouseup);

                        $(document).bind('mousemove', _mousemove);

                        _mousemove(event);

                    }

                };



                _mouseup = function (event) {

                    event.stopImmediatePropagation();

                    event.preventDefault();

                    $(document).unbind('mouseup', _mouseup);

                    $(document).unbind('mousemove', _mousemove);

                    e.bind('mousedown', _mousedown);

                };



                _mousemove = function (event) {

                    event.stopImmediatePropagation();

                    event.preventDefault();



                    if (event.pageX === that.x && event.pageY === that.y) {

                        return;

                    }

                    that.x = event.pageX;

                    that.y = event.pageY;



                    var div = $('.ui-colorpicker-map-layer-pointer', e),

                        offset = div.offset(),

                        width = div.width(),

                        height = div.height(),

                        x = event.pageX - offset.left,

                        y = event.pageY - offset.top;



                    x = Math.max(0, Math.min(x / width, 1));

                    y = Math.max(0, Math.min(y / height, 1));



                    // interpret values

                    switch (inst.mode) {

                    case 'h':

						inst.color.setHSV(null, x, 1 - y);

                        break;



                    case 's':

                    case 'a':

						inst.color.setHSV(x, null, 1 - y);

                        break;



                    case 'v':

						inst.color.setHSV(x, 1 - y, null);

                        break;



                    case 'r':

						inst.color.setRGB(null, 1 - y, x);

                        break;



                    case 'g':

						inst.color.setRGB(1 - y, null, x);

                        break;



                    case 'b':

						inst.color.setRGB(x, 1 - y, null);

                        break;

                    }



                    inst._change();

                };



                _html = function () {

                    var html = '<div class="ui-colorpicker-map" class="ui-colorpicker-border">'

                            + '<span class="ui-colorpicker-map-layer-1">&nbsp;</span>'

                            + '<span class="ui-colorpicker-map-layer-2">&nbsp;</span>'

                            + (inst.options.alpha ? '<span class="ui-colorpicker-map-layer-alpha">&nbsp;</span>' : '')

                            + '<span class="ui-colorpicker-map-layer-pointer"><span class="ui-colorpicker-map-pointer"></span></span></div>';

                    return html;

                };



                this.update = function () {

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

                };



                this.repaint = function () {

                    var div = $('.ui-colorpicker-map-layer-pointer', e),

                        x = 0,

                        y = 0;



                    switch (inst.mode) {

                    case 'h':

                        x = inst.color.getHSV().s * div.width();

                        y = (1 - inst.color.getHSV().v) * div.width();

                        $(e).css('background-color', inst.color.copy().normalize().toCSS());

                        break;



                    case 's':

                    case 'a':

                        x = inst.color.getHSV().h * div.width();

                        y = (1 - inst.color.getHSV().v) * div.width();

                        $('.ui-colorpicker-map-layer-2', e).css('opacity', 1 - inst.color.getHSV().s);

                        break;



                    case 'v':

                        x = inst.color.getHSV().h * div.width();

                        y = (1 - inst.color.getHSV().s) * div.width();

                        $('.ui-colorpicker-map-layer-1', e).css('opacity', inst.color.getHSV().v);

                        break;



                    case 'r':

                        x = inst.color.getRGB().b * div.width();

                        y = (1 - inst.color.getRGB().g) * div.width();

                        $('.ui-colorpicker-map-layer-2', e).css('opacity', inst.color.getRGB().r);

                        break;



                    case 'g':

                        x = inst.color.getRGB().b * div.width();

                        y = (1 - inst.color.getRGB().r) * div.width();

                        $('.ui-colorpicker-map-layer-2', e).css('opacity', inst.color.getRGB().g);

                        break;



                    case 'b':

                        x = inst.color.getRGB().r * div.width();

                        y = (1 - inst.color.getRGB().g) * div.width();

                        $('.ui-colorpicker-map-layer-2', e).css('opacity', inst.color.getRGB().b);

                        break;

                    }



                    if (inst.options.alpha) {

                        $('.ui-colorpicker-map-layer-alpha', e).css('opacity', 1 - inst.color.getAlpha());

                    }



                    $('.ui-colorpicker-map-pointer', e).css({

                        'left': x - 7,

                        'top': y - 7

                    });

                };



                this.init = function () {

                    e = $(_html()).appendTo($('.ui-colorpicker-map-container', inst.dialog));



                    e.bind('mousedown', _mousedown);

                };

            }