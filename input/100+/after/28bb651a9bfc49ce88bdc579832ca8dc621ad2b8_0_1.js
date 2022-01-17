function(err,data){
        if(err) return cb(err);
        d&&console.log("data toString()",data.toString(),data);
        var xmlDoc = libxmljs.parseXmlString(data);
        d&&console.log("c",c);
        paths[c] = xmlDoc.find('//path');
        var g = xmlDoc.childNodes()[3];
        var w = xmlDoc.root().attr("width").value(),
            h = xmlDoc.root().attr("height").value();
        
        for(var p = 0; p < g.childNodes().length; p++){
          var pa = g.childNodes()[p];
          if(pa.name()!== "text"){
            d&&console.log("bf attr",pa.attrs(),pa.name());
            pa.attr({
              fill : c
            });
            d&&console.log("bf attr");
          }
        }
        (w>maxw)&& (maxw=w);
        (h>maxh)&& (maxh=h);
        g&&(gs[c] = g); 
        (!--n)&&mergeGroups(gs,maxh,maxw);
      }