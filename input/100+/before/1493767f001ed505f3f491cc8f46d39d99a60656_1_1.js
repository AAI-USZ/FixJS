function(){var e={},j={},b=0,h=1,a=2,c=3;function g(k){return e[k]=e[k]||{name:k,status:b}}function i(n,o,l){var k=false;document.getElementsByTagName("body")[0].appendChild(n);function p(){k=true;o()}function m(){k=true;l()}n.onreadystatechange=function(){if(k){return}if(this.readyState!=="complete"&&this.readyState!=="loaded"){return}p()};n.onload=p;n.onerror=m}function d(l,n,k){var m=document.createElement("link");m.rel="stylesheet";m.type="text/css";m.href=l;i(m,n,k)}function f(l,n,k){var m=document.createElement("script");m.charset="utf-8";m.type="text/javascript";m.src=l;i(m,n,k)}return{packageHeader:function(m){var r=g(m.name);if(r.status===c){throw new Error('Package "'+m.name+'" is loaded twice')}r.status=c;var t=m.requires||[];for(var o=0,n=t.length;o<n;++o){g(t[o]).status=c}var q=m.loaders||[];for(var o=0,n=q.length;o<n;++o){var s=q[o],p=g(s.name);if(p.loadInfo){continue}p.loadInfo={requires:s.requires,js:s.js,css:s.css}}var k=m.timestamps||{};for(var o in k){j[o]=k[o]}},loadPackage:function(k,y,v,z){var s=false;var x=function(){var l=s?v:y;if(l){l.apply(z||this,arguments)}};var w=g(k);if(w.status===h){throw new Error('Dependency loop detected while loading "'+k+'" package')}if(w.status===a){w.callbacks.push(x);return}if(w.status===c){setTimeout(x,1);return}var o=w.loadInfo;if(!o){throw new Error('Package "'+k+'" does not have loading info. Add it to "loaders" list of dependent package configuration')}w.status=h;var A=o.requires||[];for(var p=0,n=A.length;p<n;++p){JWSDK.loadPackage(A[p])}w.status=a;w.callbacks=[];w.callbacks.push(x);var q=o.css||[];var m=o.js||[];var r=q.length+m.length;function u(){if(--r){return}var D=w.callbacks.concat();for(var C=0,B=D.length;C<B;++C){D[C]()}}function t(){s=true;u()}for(var p=0,n=q.length;p<n;++p){d(q[p],u,t)}for(var p=0,n=m.length;p<n;++p){f(m[p],u,t)}},getTimestamp:function(k){return j[k]}}}