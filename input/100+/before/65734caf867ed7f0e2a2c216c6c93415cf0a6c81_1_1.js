function(c,d){if(d&&"undefined"!==typeof a.helpers[c]&&e.isFunction(a.helpers[c][b]))a.helpers[c][b](d)});e.event.trigger(b+".fb")}},isImage:function(a){return a&&a.match(/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i)},isSWF:function(a){return a&&a.match(/\.(swf)(.*)?$/i)},_start:function(b){var c=a.group[b]||null,d=e.extend(!0,{},a.opts,c&&e.metadata?e(c).metadata():{