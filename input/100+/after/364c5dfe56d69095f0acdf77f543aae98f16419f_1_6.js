function(j){return this.each(function(l,k){var m,n,p,o;
m=a(k);m.css("border",0);o=c.getMapData(k);if(o){f.unbind.apply(m);if(!o.complete){m.bind();
return true;}o=null;}p=this.getAttribute("usemap");n=p&&a('map[name="'+p.substr(1)+'"]');
if(!(m.is("img")&&p&&n.size()>0)){return true;}if(!o){o=new c.MapData(this,j);o.index=e(o);
o.map=n;o.bindImages(true);}});}