function(c){if(!p[a.prop(c,"type")]||!a.prop(c,"willValidate"))return!1;c=a.prop(c,"validity");return!(!c||c.rangeOverflow||c.rangeUnderflow)},"out-of-range":function(c){if(!p[a.prop(c,"type")]||!a.prop(c,"willValidate"))return!1;c=a.prop(c,"validity");return!(!c||!c.rangeOverflow&&!c.rangeUnderflow)}});["valid","invalid","required","optional"].forEach(function(c){a.expr.filters[c]=a.expr.filters[c+"-element"]});a.expr.filters.focus=function(a){try{var b=
a.ownerDocument;return a===b.activeElement&&(!b.hasFocus||b.hasFocus())}catch(d){}return!1};var q=a.event.customEvent||{};(l.bustedValidity||l.findRequired)&&function(){var c=a.find,b=a.find.matchesSelector,d=/(\:valid|\:invalid|\:optional|\:required|\:in-range|\:out-of-range)(?=[\s\[\~\.\+\>\:\#*]|$)/ig,j=function(a){return a+"-element"}