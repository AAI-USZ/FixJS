function(c,b,g,f,j){if(!f&&(f=a.data(c,"placeHolder"),!f))return;a(c).unbind(".placeholderremove");if("focus"==j||!j&&c===i.activeElement)("password"==c.type||d||a(c).hasClass("placeholder-visible"))&&h(c,f,"",!0);else if(!1===b&&(b=a.prop(c,"value")),b)h(c,f,b);else if(!1===g&&(g=a.attr(c,"placeholder")||""),g&&!b){b=f;!1===g&&(g=a.prop(c,"placeholder"));if(!d&&"password"!=c.type)c.value=g;b.box.addClass("placeholder-visible")}else h(c,f,b)}