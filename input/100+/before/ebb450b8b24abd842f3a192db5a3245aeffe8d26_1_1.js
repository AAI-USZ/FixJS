function(p,k){var e={},h={};function i(t,r,w){var v={c:t,f:r},u=[],q=k.setTimeout(function(){q=null;s()},0),x;function s(){while(true){if(w){w(v.c)}if(v.j==0){return}if(v.f.g){x=v.c[v.f.g];if(!x){throw"no such method: "+v.f.g}v=v.j?{c:v.j,h:typeof v.b=="function"&&v.b.apply(v.j,p(u).map(function(){return this.d}).get()),f:(v.j=0)||v.f.h}:x._timing?x._timing(s,v,u)||v:{c:x.apply(v.c,v.f.a),f:v.f.h}}else{if(!u[0]){return v.c}if(q){return}v=b._timing(s,false,u)}}}return s}function l(t,r,q){var u={},s;for(s in t){if(typeof t[s]=="function"){h[s]=s}}$.each(h,function(v){u[v]=function(){r.g=v;r.a=arguments;r=r.h={};return q&&q()||u}});u._=t._=t;return u}l(new Object());l(new Array());l(new String());l(new Function());function a(s){var q={},t,r=i(s,q,function(u){t.length=0;Array.prototype.push.apply(t,p.makeArray(u))});return t=l(s,q,r)}function g(){return a(this).wait.apply(this,arguments)}g._timing=function(s,u){var r,q,t;u.j=0;if(typeof u.f.a[0]=="function"){u.b=u.f.a[0]}else{r=u.f.a[0];u.b=u.f.a[1]}if(typeof r=="string"){q=function(){p(this).unbind(r,q).unbind("__unwait__",t);u.j=u.j&&u.j.add(this)||p(this);s()};t=function(){p(this).unbind("__unwait__",t);u.c=u.c.not(this);u.j=u.c.length&&u.j&&u.j.not(this);p(this).unbind(r,q)};u.c.bind(r,q)}else{q=k.setTimeout(function(){u.c.unbind("__unwait__",t);u.j=u.c;s()},Math.max(0,r));t=function(){p(this).unbind("__unwait__",t);u.c=u.c.not(this);u.j=u.c.length&&u.j&&u.j.not(this);if(!u.c.length){k.clearTimeout(q)}}}u.c.bind("__unwait__",t)};function n(){return this.trigger("__unwait__")}function c(){return a(this).repeat.apply(this,arguments)}c._timing=function(s,v,u,w){var r,q,t;v.j=0;if(typeof v.f.a[0]=="function"){v.b=v.f.a[0]}else{if(typeof v.f.a[1]=="function"){r=v.f.a[0];v.b=v.f.a[1]}else{r=v.f.a[0];v.j=!!v.f.a[1]&&v.c;v.b=v.f.a[2]}}if(r==null){q=true;t=function(){p(this).unbind("__unrepeat__",t);v.c=v.c.not(this);v.j=v.c.length&&v.j&&v.j.not(this);q=v.c.length&&q};v.l=function(x){if(!x&&q){v.j=v.c}else{v.c.unbind("__unrepeat__",t)}};v.j=v.c}else{if(typeof r=="string"){q=function(){v.j=v.j&&v.j.add(this)||p(this);s()};t=function(){p(this).unbind("__unrepeat__",t);v.c=v.c.not(this);v.j=v.c.length&&v.j&&v.j.not(this);p(this).unbind(r,q)};v.l=function(x){if(x){v.c.unbind("__unrepeat__",t).unbind(r,q)}};v.c.bind(r,q)}else{q=k.setInterval(function(){v.j=v.c;s()},Math.max(0,r));t=function(){p(this).unbind("__unrepeat__",t);v.c=v.c.not(this);v.j=v.c.length&&v.j&&v.j.not(this);if(!v.c.length){k.clearInterval(q)}};v.l=function(x){if(x){v.c.unbind("__unrepeat__",t);k.clearInterval(q)}}}}v.c.bind("__unrepeat__",t);v.d=0;u.unshift(v)};function m(){return this.trigger("__unrepeat__")}function b(){throw".until() method must be used after .repeat() only"}b._timing=function(q,s,r){var t=s&&s.f.a[0];if(t==null){t=!s.c.size()}if(typeof t=="function"){t=t.apply(s.c,p(r).map(function(){return this.d}).get())}if(typeof t=="object"){t=t.toString()}if(typeof t=="number"){t=r[0].d>=t-1}if(t&&s){s.j=s.c;s=r.shift();s.l(true)}else{s=r[0];s.d++;s.l();return s}};function f(q){q.apply(this);return this}f._timing=function(q,r){r.b=r.f.a[0];r.j=r.c};function d(){return a(this).join.apply(this,arguments)}d._timing=function(q,t){var r,s,u=p(t.c);t.j=0;if(typeof t.f.a[0]=="function"){t.b=t.f.a[0]}else{s=t.f.a[0];t.b=t.f.a[1]}t.c.queue(s==null?"fx":s,function(v){if(u.length&&!(u=u.not(this)).length){t.j=t.c;if(r){q()}}v()});r=true};$.each(["bind","on","one"],function(r,q){var s=p.fn[q];p.fn[q]=s&&function(v){if(typeof v!="object"){var t,w,u;for(w=1;w<arguments.length;w++){if(typeof arguments[w]=="function"){if(arguments[w]!==p){arguments[w].guid=arguments[w].guid||p.guid++;t=true}break}}if(!t){u={};arguments[w]=function(){return(i(p(this),u))()};arguments.length=Math.max(arguments.length,w+1);return l(s.apply(this,arguments),u)}}return s.apply(this,arguments)}});function j(r,s,q){if(typeof r=="string"){Array.prototype.shift.apply(q)}else{r=""}return s.apply(e[r]=(e[r]||p("<div>").text(r)),q)}function o(t,w,s){if(typeof t=="string"){s=new Function("x","return ["+t+"\n,x]");t=function(z,y){y=s(z);r.x=y[1];return y[0]}}var q=typeof w=="function",v=typeof t=="function",r=function(x){if(arguments.length==1){r.x=x;if(q){w(x)}}else{return r.$()}};function u(x){x=q?w():r.x;return v?t(x):x}u.toString=u;p.extend(r,{x:0,$:u,toString:u,_:{toString:r.$},mod:function(x){return o(function(y){return y%x},r)},add:function(x){return o(function(y){return y+x},r)},neg:function(){return o("-x",r)},$$:function(x){return o(x,r)}});p.each("abcdefghij",function(x,y){r[x]=r[y]=function(){r(arguments[x])}});return r}k.$$=o;p.fn.extend({wait:g,unwait:n,repeat:c,unrepeat:m,until:b,then:f,join:d,$:p});p.extend({wait:function(q){return j(q,g,arguments)},unwait:function(q){return j(q,n,arguments)},repeat:function(q){return j(q,c,arguments)},unrepeat:function(q){return j(q,m,arguments)},then:function(q){return j(q,f,arguments)},join:function(q){return j(q,d,arguments)},$$:o})}