function(){return a};g[k]=c;return H(g,i)}b=a.split(".");return function(e){var n=e.context||e,o=e[b[0]];e=0;if(o&&o.item){e+=1;if(b[e]==="pos")return o.pos;else n=o.item}for(o=b.length;e<o;e++){if(!n)break;n=n[b[e]]}return!n&&n!==0?"":n}}function D(a,b,f){var c,g,i,k,l,e=[];if(typeof b==="string"){