fvar x,k=this.get("plugins");j=this.get("listeners");i(k);p(this,k,"initializer");for(x in j)k=j[x],this.on(x,k.fn||k,k.scope);a&&a.autoRender&&this.render()}function h(a,b,c){for(var d=a.constructor,e=[],h,f,i,g;d;){g=[];if(i=d.__ks_exts)for(var l=0;l<i.length;l++)if(h=i[l])"constructor"!=c&&(h=h.prototype.hasOwnProperty(c)?h.prototype[c]:null),h&&g.push(h);d.prototype.hasOwnProperty(b)&&(f=d.prototype[b])&&g.push(f);g.length&&e.push.apply(e,g.reverse());d=d.superclass&&d.superclass.constructor}for(l=