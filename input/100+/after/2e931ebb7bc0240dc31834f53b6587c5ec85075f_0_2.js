function j(a){var b;try{b=!!a.sheet.cssRules}catch(c){s=s+1;s<200?setTimeout(function(){j(a)},50):b&&d("css");return}d("css")}function g(){var a=o.css,b;if(a){for(b=w.length;--b>=0;)if(w[b].href===a.urls[0]){d("css");break}s=s+1;a&&(s<200?setTimeout(g,50):d("css"))}}var h,n,o={},s=0,m={css:[],js:[]},w=a.styleSheets,k=[];return{css:function(a,c,d,e){if(b(a))return c;f("css",a,c,d,e)},js:function(a,c,d,e){if(b(a))return c;f("js",a,c,d,e)}}