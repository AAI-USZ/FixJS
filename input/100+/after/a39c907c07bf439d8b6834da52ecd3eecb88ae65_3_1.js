function(){h('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link);h("style").forEach(StyleFix.styleElement);h("[style]").forEach(StyleFix.styleAttribute)},register:function(a,c){(b.fixers=b.fixers||[]).splice(void 0===c?b.fixers.length:c,0,a)},fix:function(a,c){for(var d=0;d<b.fixers.length;d++)a=b.fixers[d](a,c)||a;return a},camelCase:function(a){return a.replace(/-([a-z])/g,function(a,b){return b.toUpperCase()}).replace("-",
"")},deCamelCase:function(a){return a.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()})}};(function(){setTimeout(function(){h('link[rel="stylesheet"]').forEach(StyleFix.link)}