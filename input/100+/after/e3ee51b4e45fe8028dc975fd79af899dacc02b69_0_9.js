function(e,d){var g=this.instances,a=g.length,f=a,c=new Array(a),b=this;g.each(function(h,j){h.addEvent(e,function(){if(!c[j]){f--;}c[j]=arguments;
if(!f){d.call(b,g,h,c);f=a;c=new Array(a);}});});}