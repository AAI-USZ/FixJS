function(a){a.placeholder={defaults:{css:"placeholder",attr:"placeholder"},supportedNatively:"placeholder"in a("<input/>").get(0)};a.fn.placeholder=function(c){if(!a.placeholder.supportedNatively){if(b[c]){return b[c].apply(this,Array.prototype.slice.call(arguments,1))}else if(typeof c==="object"||!c){return b.init.apply(this,arguments)}else{a.error("Method "+c+" does not exist on jQuery.placeholder")}}};var b={init:function(c){c=a.extend({},a.placeholder.defaults,c);a(this).each(function(d,e){var e=a(e);var f=e.attr(c.attr);if(f&&f.length>0){e.data("$.placeholder.text",f).data("$.placeholder.class",c.css).blur(b.apply).focus(b.clear).parents("form").submit(function(){b.clear.apply(e,Array.prototype.slice.call(arguments,1))});e.blur()}});return this},apply:function(){a(this).each(function(b,c){var c=a(c);var d=c.data("$.placeholder.text");var e=c.data("$.placeholder.class");if(c.val()==""&&!c.is(":focus")){c.addClass(e);c.val(d)}});return this},clear:function(){a(this).each(function(b,c){var c=a(c);var d=c.data("$.placeholder.text");var e=c.data("$.placeholder.class");if(c.val()==d&&c.hasClass(e)){c.val("");c.removeClass(e)}});return this},destroy:function(){return this.each(function(b,c){var c=a(c);c.placeholder("clear");c.removeData("$.placeholder.text",null);c.removeData("$.placeholder.class",null)});return this}}}