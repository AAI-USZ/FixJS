function(){var b=(pv.renderer()=="svgweb"?pv.event.clientX*1:pv.event.pageX)||0,c=(pv.renderer()=="svgweb"?pv.event.clientY*1:pv.event.pageY)||0,d=this.root.canvas();if(pv.renderer()!="svgweb"){do{b-=d.offsetLeft;c-=d.offsetTop}while(d=d.offsetParent)}d=pv.Transform.identity;var f=this.properties.transform?this:this.parent,g=[];do g.push(f);while(f=f.parent);for(;f=g.pop();)d=d.translate(f.left(),f.top()).times(f.transform());d=d.invert();return pv.vector(b*d.k+d.x,c*d.k+d.y)}