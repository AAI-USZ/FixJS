function initStorer(a,b){function l(a,b){var c={STORE_TYPE:"ref"+a,key:function(a){return b.key(a)},getItem:function(a){return b.getItem(a)},setItem:function(a,c){return b.setItem(a,c)},removeItem:function(a){return b.removeItem(a)},clear:function(){return b.clear()}};return Object.defineProperty(c,"length",{get:function(){return b.length}}),c}function m(a,b){var c=document.createElement("div");return c.STORE_TYPE="DOM"+a,c.key=b.key,c.getItem=b.getItem,c.setItem=b.setItem,c.removeItem=b.removeItem,c.clear=b.clear,Object.defineProperty(c,"length",{get:function(){return b.length}}),c}function n(a){a=(a||"")+e;var d=new RegExp("(?:^|;)s*"+a+"[^=]+s*=[^;]*","g"),f=new RegExp("^;?s*"+a),g=new RegExp("(?:^|;)s*[^=]+s*=[^;]*","g"),h=new RegExp("^;?s*"),i=(new Date(1979)).toGMTString(),j={STORE_TYPE:"cookieStorage",DEFAULT_DOMAIN:escape(b.default_domain||""),DEFAULT_PATH:escape(b.default_path||""),getAll:function(a,b){var c=b?h:f,e=document.cookie.match(b?g:d)||[],i=e.length,j;if(a===!0)for(j={length:i};i--;)j[unescape((e[i]=e[i].split("="))[0].replace(c,""))]=e[i][1];else for(j=[];i--;)j.push({key:unescape((e[i]=e[i].split("="))[0].replace(c,"")),value:e[i][1]});return j},getItem:function(b,c){return!b||!this.hasItem(b,c)?null:(c=document.cookie.match(new RegExp("(?:^|;) *"+escape((c?"":a)+b)+"=([^;]*)(?:;|$)")),c&&c[0]?unescape(c[1]):null)},setItem:function(b,c,d,e,f,g,h){if(!b||b==="expires"||b==="max-age"||b==="path"||b==="domain"||b==="secure")return!1;var i="";if(d)switch(typeof d){case"number":i="; max-age="+d;break;case"string":i="; expires="+d;break;case"object":d.hasOwnProperty("toGMTString")&&(i="; expires="+d.toGMTString())}return c!==undefined&&c!==null?(f=(f=typeof f=="string"?escape(f):j.DEFAULT_DOMAIN)?"; domain="+f:"",e=(e=typeof e=="string"?escape(e):j.DEFAULT_PATH)?"; path="+e:"",document.cookie=escape((h?"":a)+b)+"="+escape(c)+i+f+e+(g?"; secure":""),!0):j.removeItem(b,f,e,g,h)},removeItem:function(b,c,d,e,f){return!b||!this.hasItem(b,f)?!1:(c=(c=typeof c=="string"?escape(c):j.DEFAULT_DOMAIN)?"; domain="+c:"",d=(d=typeof d=="string"?escape(d):j.DEFAULT_PATH)?"; path="+d:"",document.cookie=escape((f?"":a)+b)+"=; expires="+i+c+d+(e?"; secure":""),!0)},hasItem:function(b,c){return(new RegExp("(?:^|;) *"+escape((c?"":a)+b)+"=")).test(document.cookie)}};return j.setItem(c,4),j.getItem(c)==4?(j.removeItem(c),j):o()}function o(){var a={},b=[],c={},d={STORE_TYPE:"memoryStorage",length:0,key:function(a){return b[a]},getItem:function(b){return a[b]},setItem:function(e,f){return f!==null&&f!==undefined?(c[e]===undefined&&(c[e]=(d.length=b.push(e))-1),a[e]=f):d.removeItem(e)},removeItem:function(e){var f=a[e]!==undefined;if(c[e]!==undefined){for(var g=b.length;--g>c[e];)c[b[g]]--;b.splice(c[e],1),delete c[e]}return delete a[e],d.length=b.length,f},clear:function(){for(var e in a)a.hasOwnProperty(e)&&delete a[e];d.length=b.length=0,c={}}};return d}function p(a){function x(){var c=a.name,d=c.indexOf(j),f=c.indexOf(k),g=v.length;d>-1&&f>d&&(a.name=c.slice(0,d)+c.slice(f+q));for(c="";g--;)u[v[g]]&&u[v[g]].value&&(c+=l+(""+v[g]).length+":"+(""+u[v[g]].value).length+m+v[g]+m+u[v[g]].value+n);a.name+=j+encodeURI(b.encode(e,c))+k}function y(){var c=a.name,d=c.indexOf(j),f=c.indexOf(k),g=0,h="",i=0,o=0;if(d>-1&&f>d){a.name=c.slice(0,d)+c.slice(f+q),c=b.decode(e,decodeURI(c.slice(d+p,f)));while((d=c.indexOf(l,g))!==-1)g=d+r,(f=c.indexOf(m,g))!==-1&&(i=c.slice(g,f).split(":"),o=parseInt(i[1],10),i=parseInt(i[0],10),g=f+s,(f=c.indexOf(m,g))===g+i&&(h=c.substr(g,i),g=f+s,(f=c.indexOf(n,g))===g+o&&w.setItem(h,c.substr(g,o))))}a.addEventListener?a.addEventListener("beforeunload",x,!0):a.attachEvent&&a.attachEvent("onbeforeunload",x)}a||(a=d);var b=function(a,b,c){return{decode:function(a,b){return this.encode(a,b)},encode:function(c,d){for(var e=c.length,f=d.length,g=[],h=[],i=0,j=0,k=0,l=0,m;i<256;i++)h[i]=i;for(i=0;i<256;i++)j=(j+(m=h[i])+c.charCodeAt(i%e))%256,h[i]=h[j],h[j]=m;for(j=0;k<f;k++)i=k%256,j=(j+(m=h[i]))%256,e=h[i]=h[j],h[j]=m,g[l++]=d.charCodeAt(k)^h[(e+m)%256];return b.apply(a,g)},key:function(d){for(var e=0,f=[];e<d;e++)f[e]=1+(c()*255<<0);return b.apply(a,f)}}}(String,String.fromCharCode,Math.random),c=Object.prototype.toString.call(window.opera)==="[object Opera]",e;try{e=decodeURI(g.getItem(".sessionStorageKey"))}catch(f){}if(!e||e.length!==o)e=b.key(o),g.setItem(".sessionStorageKey",encodeURI(e));var h=a.document.domain,i=b.encode(e,h),j="#"+String.fromCharCode(1)+"STOR/"+i,k=i+"/STOR"+String.fromCharCode(4)+"#",l=String.fromCharCode(2)+";",m=String.fromCharCode(23)+";",n=";"+String.fromCharCode(3),o=32,p=j.length,q=k.length,r=l.length,s=m.length,t=n.length,u={},v=[],w={STORE_TYPE:"name",length:0,key:function(a){return v[a]},getItem:function(a){return u[a]?u[a].value:null},setItem:function(a,b){return u[a]?u[a].value=b:u[a]={value:b,index:(w.length=v.push(a))-1},c&&x(),b},removeItem:function(a){if(u[a]){if(v[u[a].index]===a){v.splice(u[a].index,1),w.length=v.length;for(var b=u[a].index,d=v.length;b<d;b++)u[v[b]].index--}return delete u[a],c&&x(),!0}return!1},clear:function(){v.length=0,u={},c&&x()}};try{y()}catch(f){}return w}var c="__SG__",d=window,e=(b=b||{}).prefix||"",f=!0,g,h,i,j;try{while(d!==d.top)d=d.top}catch(k){}var q={cookieStorage:null,localStorage:null,memoryStorage:null,sessionStorage:null,_createCookieStorage:n,_createMemoryStorage:o};return q.cookieStorage=g=n(),q.memoryStorage=i=o(),q.sessionStorage=j=function(){var a=d.sessionStorage;if(a)try{a.setItem(c,1),a.removeItem(c);var b=function(){};b.prototype=a,b=new b,b.getItem?Object.prototype.toString.apply(Storage.prototype)==="[object StoragePrototype]"?a=l("sessionstorage",a):a=b:a=m("sessionstorage",a)}catch(f){a=null}if(!a){try{a=p(),a.setItem(c,2),a.getItem(c)==2?a.removeItem(c):a=null}catch(f){a=null}a||(a=o())}return a._getItem=a.getItem,a._setItem=a.setItem,a._removeItem=a.removeItem,a._key=a.key,a.getItem=function(b){return a._getItem(e+b)},a.setItem=function(b,c){return a._setItem(e+b,c)},a.removeItem=function(b){return a._removeItem(e+b)},a.key=function(b){return(b=a._key(b))!==undefined&&b!==null?b.indexOf(e)===0?b.substr(e.length):b:null},a.clear=function(){for(var b=a.length,c;b--;)(c=a._key(b)).indexOf(e)===0&&a._removeItem(c)},a}(),q.localStorage=h=function(){var b;if(d.localStorage||d.globalStorage)try{b=d.localStorage||d.globalStorage[location.hostname],b.setItem(c,1),b.removeItem(c);var g=function(){};g.prototype=b,g=new g,g.getItem?Object.prototype.toString.apply(Storage.prototype)==="[object StoragePrototype]"?b=l("localstorage",b):b=g:b=m("localstorage",b)}catch(i){b=null}return b||(b=function(){var d=function(a){return"PS"+a.replace(g,"__").replace(i,"_s")},g=/_/g,i=/ /g,j=d(e+"uData"),k=d("Storer");if(window.ActiveXObject)try{var l={},m=[],o={},p={STORE_TYPE:"userData",length:0,key:function(a){return m[a]},getItem:function(a){return r.getAttribute(d(a))},setItem:function(a,b){return b!==null&&b!==undefined?(r.setAttribute(d(a),b),o[a]===undefined&&(o[a]=(p.length=m.push(a))-1),r.save(j+k),l[a]=b):p.removeItem(a)},removeItem:function(a){r.removeAttribute(d(a));if(o[a]!==undefined){for(var b=m.length;--b>o[a];)o[m[b]]--;m.splice(o[a],1),delete o[a]}return r.save(j+k),p.length=m.length,!0},clear:function(){for(var a=r.xmlDocument,b=a.firstChild.attributes,c,d=b.length;0<=--d;)c=b[d],delete l[c.nodeName],r.removeAttribute(c.nodeName),p.length--;r.save(j+k),p.length=m.length=0,l={},o={}}},r=document.createElement("input");r.style.display="none",r.addBehavior("#default#userData");var s=typeof domReady=="function"?domReady:typeof jQuery!="undefined"?jQuery(document).ready:!1;return f=!s,s&&s(function(){try{var d=document.body||document.getElementsByTagName("head")[0];d.appendChild(r),r.load(j+k),p.setItem(c,3);if(p.getItem(c)==3){p.removeItem(c);var e,f=r.xmlDocument,g=f.firstChild.attributes,i=-1,s=g.length;while(++i<s)e=g[i],e.nodeValue!==undefined&&e.nodeValue!==null&&(o[e.nodeName]=m.push(e.nodeName)-1,l[e.nodeName]=e.nodeValue);q.localStorage=h=p,a&&a(q)}else p=null}catch(t){p=null}p||(q.localStorage=h=b=n(),a&&a(q))}),p}catch(t){}}()),b||(b=n()),e?(b._getItem=b.getItem,b._setItem=b.setItem,b._removeItem=b.removeItem,b._key=b.key,b.getItem=function(a){return b._getItem(e+a)},b.setItem=function(a,c){return b._setItem(e+a,c)},b.removeItem=function(a){return b._removeItem(e+a)},b.key=function(a){return(a=b._key(a))!==undefined&&a!==null?a.indexOf(e)===0?a.substr(e.length):a:null},b.clear=function(){for(var a=b.length,c;a--;)(c=b._key(a)).indexOf(e)===0&&b._removeItem(c)},b):b}(),f&&a&&a(q),q}