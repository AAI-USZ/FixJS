function(){d.isDefaultPrevented()&&j(b,!1,!1,c)},9))},a(l).bind("beforeunload",f),c.box=a(b),b.form&&a(b.form).submit(f);return c},update:function(d,f){if(!c[a.prop(d,"type")]&&!a.nodeName(d,"textarea"))b.warn("placeholder not allowed on type: "+a.prop(d,"type"));else{var g=m.create(d);g.text&&g.text.text(f);j(d,!1,f,g)}}}}();a.webshims.publicMethods={pHolder:m};f.forEach(function(a){b.defineNodeNameProperty(a,"placeholder",{attr:{set:function(a){