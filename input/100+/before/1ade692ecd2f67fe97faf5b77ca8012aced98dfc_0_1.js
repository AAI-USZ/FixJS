fj)}i.prototype.draw=function(){this.drawChartFrame();this.drawMeasures();this.drawScore();this.drawLable()};i.prototype.polygon=function(b){var c="M 100 100",d,f=b.length,a,e;for(d=0;d<f;++d)a=b[d].x,e=b[d].y,a=0==d?"M "+a+" "+e+" ":"L "+a+" "+e+" ",d===f-1&&(a+="L "+b[0].x+" "+b[0].y+" "),c+=a;return this.raphael.path(c)};i.prototype.drawChartFrame=function(){var b=this.labels.length,c=-90,d,f,a;for(d=this.bottom=0;d<b;d++)a=c/360*2*Math.PI,f=this.cx+this.radius*Math.cos(a),a=this.cy+this.radius*