function(options) {

					o = $.extend({}, defaults, options);

					$(this).removeAttr('id');

					if (!o.video_id && src) { o.video_id = src.split('video/')[1].split('?')[0]; }

					if (src.indexOf('autoplay') !== -1) { o.autoplay = src.split('autoplay=')[1].split('&');}

					div = $('<div class="' + o.className + '">');

					$(this).before(div);

					$(this).remove(); 

					div.append($('<div id="'+id+'">'));

					swfobject.embedSWF(o.swfpath + o.swfname, id, width, height, o.swfminversion, o.swfpath + o.swfupdater,	flashvars(o), params(o), attribs(o), o.callback);

				}