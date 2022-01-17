function(){MM=previousMM;return this}};(function(a){a.extend=function(d,b){for(var c in b.prototype){if(typeof d.prototype[c]=="undefined"){d.prototype[c]=b.prototype[c]}}return d};a.getFrame=function(){return function(b){(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(c){window.setTimeout(function(){c(+new Date())},10)})(b)}}();a.transformProperty=(function(d){if(!this.document){return}var c=document.documentElement.style;for(var b=0;b<d.length;b++){if(d[b] in c){return d[b]}}return false})(["transformProperty","WebkitTransform","OTransform","MozTransform","msTransform"]);a.matrixString=function(b){if(b.scale*b.width%1){b.scale+=(1-b.scale*b.width%1)/b.width}var c=b.scale||1;if(a._browser.webkit3d){return"translate3d("+b.x.toFixed(0)+"px,"+b.y.toFixed(0)+"px, 0px)scale3d("+c+","+c+", 1)"}else{return"translate("+b.x.toFixed(6)+"px,"+b.y.toFixed(6)+"px)scale("+c+","+c+")"}};a._browser=(function(b){return{webkit:("WebKitCSSMatrix" in b),webkit3d:("WebKitCSSMatrix" in b)&&("m11" in new WebKitCSSMatrix())}})(this);a.moveElement=function(d,b){if(a.transformProperty){if(!b.scale){b.scale=1}if(!b.width){b.width=0}if(!b.height){b.height=0}var c=a.matrixString(b);if(d[a.transformProperty]!==c){d.style[a.transformProperty]=d[a.transformProperty]=c}}else{d.style.left=b.x+"px";d.style.top=b.y+"px";if(b.width&&b.height&&b.scale){d.style.width=Math.ceil(b.width*b.scale)+"px";d.style.height=Math.ceil(b.height*b.scale)+"px"}}};a.cancelEvent=function(b){b.cancelBubble=true;b.cancel=true;b.returnValue=false;if(b.stopPropagation){b.stopPropagation()}if(b.preventDefault){b.preventDefault()}return false};a.coerceLayer=function(b){if(typeof b=="string"){return new a.Layer(new a.TemplatedLayer(b))}else{if("draw" in b&&typeof b.draw=="function"){return b}else{return new a.Layer(b)}}};a.addEvent=function(d,c,b){if(d.addEventListener){d.addEventListener(c,b,false);if(c=="mousewheel"){d.addEventListener("DOMMouseScroll",b,false)}}else{if(d.attachEvent){d["e"+c+b]=b;d[c+b]=function(){d["e"+c+b](window.event)};d.attachEvent("on"+c,d[c+b])}}};a.removeEvent=function(d,c,b){if(d.removeEventListener){d.removeEventListener(c,b,false);if(c=="mousewheel"){d.removeEventListener("DOMMouseScroll",b,false)}}else{if(d.detachEvent){d.detachEvent("on"+c,d[c+b]);d[c+b]=null}}};a.getStyle=function(c,b){if(c.currentStyle){return c.currentStyle[b]}else{if(window.getComputedStyle){return document.defaultView.getComputedStyle(c,null).getPropertyValue(b)}}};a.Point=function(b,c){this.x=parseFloat(b);this.y=parseFloat(c)};a.Point.prototype={x:0,y:0,toString:function(){return"("+this.x.toFixed(3)+", "+this.y.toFixed(3)+")"},copy:function(){return new a.Point(this.x,this.y)}};a.Point.distance=function(c,b){return Math.sqrt(Math.pow(b.x-c.x,2)+Math.pow(b.y-c.y,2))};a.Point.interpolate=function(d,c,b){return new a.Point(d.x+(c.x-d.x)*b,d.y+(c.y-d.y)*b)};a.Coordinate=function(d,b,c){this.row=d;this.column=b;this.zoom=c};a.Coordinate.prototype={row:0,column:0,zoom:0,toString:function(){return"("+this.row.toFixed(3)+", "+this.column.toFixed(3)+" @"+this.zoom.toFixed(3)+")"},toKey:function(){return this.zoom+","+this.row+","+this.column},copy:function(){return new a.Coordinate(this.row,this.column,this.zoom)},container:function(){return new a.Coordinate(Math.floor(this.row),Math.floor(this.column),Math.floor(this.zoom))},zoomTo:function(b){var c=Math.pow(2,b-this.zoom);return new a.Coordinate(this.row*c,this.column*c,b)},zoomBy:function(c){var b=Math.pow(2,c);return new a.Coordinate(this.row*b,this.column*b,this.zoom+c)},up:function(b){if(b===undefined){b=1}return new a.Coordinate(this.row-b,this.column,this.zoom)},right:function(b){if(b===undefined){b=1}return new a.Coordinate(this.row,this.column+b,this.zoom)},down:function(b){if(b===undefined){b=1}return new a.Coordinate(this.row+b,this.column,this.zoom)},left:function(b){if(b===undefined){b=1}return new a.Coordinate(this.row,this.column-b,this.zoom)}};a.Location=function(b,c){this.lat=parseFloat(b);this.lon=parseFloat(c)};a.Location.prototype={lat:0,lon:0,toString:function(){return"("+this.lat.toFixed(3)+", "+this.lon.toFixed(3)+")"},copy:function(){return new a.Location(this.lat,this.lon)}};a.Location.distance=function(i,h,b){if(!b){b=6378000}var o=Math.PI/180,g=i.lat*o,n=i.lon*o,f=h.lat*o,m=h.lon*o,l=Math.cos(g)*Math.cos(n)*Math.cos(f)*Math.cos(m),k=Math.cos(g)*Math.sin(n)*Math.cos(f)*Math.sin(m),j=Math.sin(g)*Math.sin(f);return Math.acos(l+k+j)*b};a.Location.interpolate=function(i,g,m){if(i.lat===g.lat&&i.lon===g.lon){return new a.Location(i.lat,i.lon)}var s=Math.PI/180,k=i.lat*s,n=i.lon*s,j=g.lat*s,l=g.lon*s;var o=2*Math.asin(Math.sqrt(Math.pow(Math.sin((k-j)/2),2)+Math.cos(k)*Math.cos(j)*Math.pow(Math.sin((n-l)/2),2)));var e=Math.sin((1-m)*o)/Math.sin(o);var b=Math.sin(m*o)/Math.sin(o);var r=e*Math.cos(k)*Math.cos(n)+b*Math.cos(j)*Math.cos(l);var q=e*Math.cos(k)*Math.sin(n)+b*Math.cos(j)*Math.sin(l);var p=e*Math.sin(k)+b*Math.sin(j);var c=Math.atan2(p,Math.sqrt(Math.pow(r,2)+Math.pow(q,2)));var h=Math.atan2(q,r);return new a.Location(c/s,h/s)};a.Location.bearing=function(d,c){var e=Math.PI/180,i=d.lat*e,g=d.lon*e,h=c.lat*e,f=c.lon*e;var b=Math.atan2(Math.sin(g-f)*Math.cos(h),Math.cos(i)*Math.sin(h)-Math.sin(i)*Math.cos(h)*Math.cos(g-f))/-(Math.PI/180);return(b<0)?b+360:b};a.Extent=function(g,c,f,e){if(g instanceof a.Location&&c instanceof a.Location){var d=g,b=c;g=d.lat;c=d.lon;f=b.lat;e=b.lon}if(isNaN(f)){f=g}if(isNaN(e)){e=c}this.north=Math.max(g,f);this.south=Math.min(g,f);this.east=Math.max(e,c);this.west=Math.min(e,c)};a.Extent.prototype={north:0,south:0,east:0,west:0,copy:function(){return new a.Extent(this.north,this.west,this.south,this.east)},toString:function(b){if(isNaN(b)){b=3}return[this.north.toFixed(b),this.west.toFixed(b),this.south.toFixed(b),this.east.toFixed(b)].join(", ")},northWest:function(){return new a.Location(this.north,this.west)},southEast:function(){return new a.Location(this.south,this.east)},northEast:function(){return new a.Location(this.north,this.east)},southWest:function(){return new a.Location(this.south,this.west)},center:function(){return new a.Location(this.south+(this.north-this.south)/2,this.east+(this.west-this.east)/2)},encloseLocation:function(b){if(b.lat>this.north){this.north=b.lat}if(b.lat<this.south){this.south=b.lat}if(b.lon>this.east){this.east=b.lon}if(b.lon<this.west){this.west=b.lon}},encloseLocations:function(c){var b=c.length;for(var d=0;d<b;d++){this.encloseLocation(c[d])}},setFromLocations:function(c){var b=c.length,e=c[0];this.north=this.south=e.lat;this.east=this.west=e.lon;for(var d=1;d<b;d++){this.encloseLocation(c[d])}},encloseExtent:function(b){if(b.north>this.north){this.north=b.north}if(b.south<this.south){this.south=b.south}if(b.east>this.east){this.east=b.east}if(b.west<this.west){this.west=b.west}},containsLocation:function(b){return b.lat>=this.south&&b.lat<=this.north&&b.lon>=this.west&&b.lon<=this.east},toArray:function(){return[this.northWest(),this.southEast()]}};a.Extent.fromString=function(c){var b=c.split(/\s*,\s*/);if(b.length!=4){throw"Invalid extent string (expecting 4 comma-separated numbers)"}return new a.Extent(parseFloat(b[0]),parseFloat(b[1]),parseFloat(b[2]),parseFloat(b[3]))};a.Extent.fromArray=function(b){var c=new a.Extent();c.setFromLocations(b);return c};a.Transformation=function(d,f,b,c,e,g){this.ax=d;this.bx=f;this.cx=b;this.ay=c;this.by=e;this.cy=g};a.Transformation.prototype={ax:0,bx:0,cx:0,ay:0,by:0,cy:0,transform:function(b){return new a.Point(this.ax*b.x+this.bx*b.y+this.cx,this.ay*b.x+this.by*b.y+this.cy)},untransform:function(b){return new a.Point((b.x*this.by-b.y*this.bx-this.cx*this.by+this.cy*this.bx)/(this.ax*this.by-this.ay*this.bx),(b.x*this.ay-b.y*this.ax-this.cx*this.ay+this.cy*this.ax)/(this.bx*this.ay-this.by*this.ax))}};a.deriveTransformation=function(l,k,f,e,b,o,h,g,d,c,n,m){var j=a.linearSolution(l,k,f,b,o,h,d,c,n);var i=a.linearSolution(l,k,e,b,o,g,d,c,m);return new a.Transformation(j[0],j[1],j[2],i[0],i[1],i[2])};a.linearSolution=function(f,o,i,e,n,h,d,m,g){f=parseFloat(f);o=parseFloat(o);i=parseFloat(i);e=parseFloat(e);n=parseFloat(n);h=parseFloat(h);d=parseFloat(d);m=parseFloat(m);g=parseFloat(g);var l=(((h-g)*(o-n))-((i-h)*(n-m)))/(((e-d)*(o-n))-((f-e)*(n-m)));var k=(((h-g)*(f-e))-((i-h)*(e-d)))/(((n-m)*(f-e))-((o-n)*(e-d)));var j=i-(f*l)-(o*k);return[l,k,j]};a.Projection=function(c,b){if(!b){b=new a.Transformation(1,0,0,0,1,0)}this.zoom=c;this.transformation=b};a.Projection.prototype={zoom:0,transformation:null,rawProject:function(b){throw"Abstract method not implemented by subclass."},rawUnproject:function(b){throw"Abstract method not implemented by subclass."},project:function(b){b=this.rawProject(b);if(this.transformation){b=this.transformation.transform(b)}return b},unproject:function(b){if(this.transformation){b=this.transformation.untransform(b)}b=this.rawUnproject(b);return b},locationCoordinate:function(c){var b=new a.Point(Math.PI*c.lon/180,Math.PI*c.lat/180);b=this.project(b);return new a.Coordinate(b.y,b.x,this.zoom)},coordinateLocation:function(c){c=c.zoomTo(this.zoom);var b=new a.Point(c.column,c.row);b=this.unproject(b);return new a.Location(180*b.y/Math.PI,180*b.x/Math.PI)}};a.LinearProjection=function(c,b){a.Projection.call(this,c,b)};a.LinearProjection.prototype={rawProject:function(b){return new a.Point(b.x,b.y)},rawUnproject:function(b){return new a.Point(b.x,b.y)}};a.extend(a.LinearProjection,a.Projection);a.MercatorProjection=function(c,b){a.Projection.call(this,c,b)};a.MercatorProjection.prototype={rawProject:function(b){return new a.Point(b.x,Math.log(Math.tan(0.25*Math.PI+0.5*b.y)))},rawUnproject:function(b){return new a.Point(b.x,2*Math.atan(Math.pow(Math.E,b.y))-0.5*Math.PI)}};a.extend(a.MercatorProjection,a.Projection);a.MapProvider=function(b){if(b){this.getTile=b}};a.MapProvider.prototype={tileLimits:[new a.Coordinate(0,0,0),new a.Coordinate(1,1,0).zoomTo(18)],getTileUrl:function(b){throw"Abstract method not implemented by subclass."},getTile:function(b){throw"Abstract method not implemented by subclass."},releaseTile:function(b){},setZoomRange:function(c,b){this.tileLimits[0]=this.tileLimits[0].zoomTo(c);this.tileLimits[1]=this.tileLimits[1].zoomTo(b)},sourceCoordinate:function(f){var c=this.tileLimits[0].zoomTo(f.zoom),d=this.tileLimits[1].zoomTo(f.zoom),b=Math.pow(2,f.zoom),e;if(f.column<0){e=((f.column%b)+b)%b}else{e=f.column%b}if(f.row<c.row||f.row>=d.row){return null}else{if(e<c.column||e>=d.column){return null}else{return new a.Coordinate(f.row,e,f.zoom)}}}};a.Template=function(e,b){var f=e.match(/{(Q|quadkey)}/);if(f){e=e.replace("{subdomains}","{S}").replace("{zoom}","{Z}").replace("{quadkey}","{Q}")}var d=(b&&b.length&&e.indexOf("{S}")>=0);function c(m,k,l){var j="";for(var h=1;h<=l;h++){j+=(((m>>l-h)&1)<<1)|((k>>l-h)&1)}return j||"0"}var g=function(k){var j=this.sourceCoordinate(k);if(!j){return null}var i=e;if(d){var h=parseInt(j.zoom+j.row+j.column,10)%b.length;i=i.replace("{S}",b[h])}if(f){return i.replace("{Z}",j.zoom.toFixed(0)).replace("{Q}",c(j.row,j.column,j.zoom))}else{return i.replace("{Z}",j.zoom.toFixed(0)).replace("{X}",j.column.toFixed(0)).replace("{Y}",j.row.toFixed(0))}};a.MapProvider.call(this,g)};a.Template.prototype={getTile:function(b){return this.getTileUrl(b)}};a.extend(a.Template,a.MapProvider);a.TemplatedLayer=function(c,b){return new a.Layer(new a.Template(c,b))};a.getMousePoint=function(f,d){var b=new a.Point(f.clientX,f.clientY);b.x+=document.body.scrollLeft+document.documentElement.scrollLeft;b.y+=document.body.scrollTop+document.documentElement.scrollTop;for(var c=d.parent;c;c=c.offsetParent){b.x-=c.offsetLeft;b.y-=c.offsetTop}return b};a.MouseWheelHandler=function(){var d={},g,f,c,b=false;function e(k){var l=0;c=c||new Date().getTime();try{f.scrollTop=1000;f.dispatchEvent(k);l=1000-f.scrollTop}catch(i){l=k.wheelDelta||(-k.detail*5)}var j=new Date().getTime()-c;var h=a.getMousePoint(k,g);if(Math.abs(l)>0&&(j>200)&&!b){g.zoomByAbout(l>0?1:-1,h);c=new Date().getTime()}else{if(b){g.zoomByAbout(l*0.001,h)}}return a.cancelEvent(k)}d.init=function(h){g=h;f=document.body.appendChild(document.createElement("div"));f.style.cssText="visibility:hidden;top:0;height:0;width:0;overflow-y:scroll";var i=f.appendChild(document.createElement("div"));i.style.height="2000px";a.addEvent(g.parent,"mousewheel",e);return d};d.precise=function(h){if(!arguments.length){return b}b=h;return d};d.remove=function(){a.removeEvent(g.parent,"mousewheel",e);f.parentNode.removeChild(f)};return d};a.DoubleClickHandler=function(){var b={},d;function c(g){var f=a.getMousePoint(g,d);d.zoomByAbout(g.shiftKey?-1:1,f);return a.cancelEvent(g)}b.init=function(e){d=e;a.addEvent(d.parent,"dblclick",c);return b};b.remove=function(){a.removeEvent(d.parent,"dblclick",c)};return b};a.DragHandler=function(){var f={},e,g;function c(h){if(h.shiftKey||h.button==2){return}a.addEvent(document,"mouseup",b);a.addEvent(document,"mousemove",d);e=new a.Point(h.clientX,h.clientY);g.parent.style.cursor="move";return a.cancelEvent(h)}function b(h){a.removeEvent(document,"mouseup",b);a.removeEvent(document,"mousemove",d);e=null;g.parent.style.cursor="";return a.cancelEvent(h)}function d(h){if(e){g.panBy(h.clientX-e.x,h.clientY-e.y);e.x=h.clientX;e.y=h.clientY;e.t=+new Date()}return a.cancelEvent(h)}f.init=function(h){g=h;a.addEvent(g.parent,"mousedown",c);return f};f.remove=function(){a.removeEvent(g.parent,"mousedown",c)};return f};a.MouseHandler=function(){var c={},d,b;c.init=function(e){d=e;b=[a.DragHandler().init(d),a.DoubleClickHandler().init(d),a.MouseWheelHandler().init(d)];return c};c.remove=function(){for(var e=0;e<b.length;e++){b[e].remove()}return c};return c};a.TouchHandler=function(){var c={},v,q=250,l=30,b=350,u={},o=[],n=true,s=false,i=null;function m(){var x=document.createElement("div");x.setAttribute("ongesturestart","return;");return(typeof x.ongesturestart==="function")}function h(A){for(var z=0;z<A.touches.length;z+=1){var y=A.touches[z];if(y.identifier in u){var x=u[y.identifier];x.x=y.screenX;x.y=y.screenY;x.scale=A.scale}else{u[y.identifier]={scale:A.scale,startPos:{x:y.screenX,y:y.screenY},x:y.screenX,y:y.screenY,time:new Date().getTime()}}}}function e(x,y){return(x&&x.touch)&&(y.identifier==x.touch.identifier)}function d(x){h(x)}function r(x){switch(x.touches.length){case 1:k(x.touches[0]);break;case 2:t(x);break}h(x);return a.cancelEvent(x)}function f(E){var y=new Date().getTime();if(E.touches.length===0&&s){j(i)}for(var C=0;C<E.changedTouches.length;C+=1){var H=E.changedTouches[C],D=u[H.identifier];if(!D||D.wasPinch){continue}var G={x:H.screenX,y:H.screenY},A=y-D.time,z=a.Point.distance(G,D.startPos);if(z>l){}else{if(A>q){G.end=y;G.duration=A;g(G)}else{G.time=y;w(G)}}}var F={};for(var B=0;B<E.touches.length;B++){F[E.touches[B].identifier]=true}for(var x in u){if(!(x in F)){delete F[x]}}return a.cancelEvent(E)}function g(x){}function w(x){if(o.length&&(x.time-o[0].time)<b){p(x);o=[];return}o=[x]}function p(y){var B=v.getZoom(),C=Math.round(B)+1,x=C-B;var A=new a.Point(y.x,y.y);v.zoomByAbout(x,A)}function k(z){var y={x:z.screenX,y:z.screenY},x=u[z.identifier];v.panBy(y.x-x.x,y.y-x.y)}function t(D){var C=D.touches[0],B=D.touches[1],F=new a.Point(C.screenX,C.screenY),E=new a.Point(B.screenX,B.screenY),z=u[C.identifier],y=u[B.identifier];z.wasPinch=true;y.wasPinch=true;var x=a.Point.interpolate(F,E,0.5);v.zoomByAbout(Math.log(D.scale)/Math.LN2-Math.log(z.scale)/Math.LN2,x);var A=a.Point.interpolate(z,y,0.5);v.panBy(x.x-A.x,x.y-A.y);s=true;i=x}function j(x){if(n){var y=v.getZoom(),A=Math.round(y);v.zoomByAbout(A-y,x)}s=false}c.init=function(y){v=y;if(!m()){return c}a.addEvent(v.parent,"touchstart",d);a.addEvent(v.parent,"touchmove",r);a.addEvent(v.parent,"touchend",f);return c};c.remove=function(){if(!m()){return c}a.removeEvent(v.parent,"touchstart",d);a.removeEvent(v.parent,"touchmove",r);a.removeEvent(v.parent,"touchend",f);return c};return c};a.CallbackManager=function(b,d){this.owner=b;this.callbacks={};for(var c=0;c<d.length;c++){this.callbacks[d[c]]=[]}};a.CallbackManager.prototype={owner:null,callbacks:null,addCallback:function(b,c){if(typeof(c)=="function"&&this.callbacks[b]){this.callbacks[b].push(c)}},removeCallback:function(e,f){if(typeof(f)=="function"&&this.callbacks[e]){var c=this.callbacks[e],b=c.length;for(var d=0;d<b;d++){if(c[d]===f){c.splice(d,1);break}}}},dispatchCallback:function(d,c){if(this.callbacks[d]){for(var b=0;b<this.callbacks[d].length;b+=1){try{this.callbacks[d][b](this.owner,c)}catch(f){}}}}};a.RequestManager=function(){this.loadingBay=document.createDocumentFragment();this.requestsById={};this.openRequestCount=0;this.maxOpenRequests=4;this.requestQueue=[];this.callbackManager=new a.CallbackManager(this,["requestcomplete","requesterror"])};a.RequestManager.prototype={loadingBay:null,requestsById:null,requestQueue:null,openRequestCount:null,maxOpenRequests:null,callbackManager:null,addCallback:function(b,c){this.callbackManager.addCallback(b,c)},removeCallback:function(b,c){this.callbackManager.removeCallback(b,c)},dispatchCallback:function(c,b){this.callbackManager.dispatchCallback(c,b)},clear:function(){this.clearExcept({})},clearRequest:function(d){if(d in this.requestsById){delete this.requestsById[d]}for(var b=0;b<this.requestQueue.length;b++){var c=this.requestQueue[b];if(c&&c.id==d){this.requestQueue[b]=null}}},clearExcept:function(f){for(var e=0;e<this.requestQueue.length;e++){var g=this.requestQueue[e];if(g&&!(g.id in f)){this.requestQueue[e]=null}}var b=this.loadingBay.childNodes;for(var d=b.length-1;d>=0;d--){var c=b[d];if(!(c.id in f)){this.loadingBay.removeChild(c);this.openRequestCount--;c.src=c.coord=c.onload=c.onerror=null}}for(var k in this.requestsById){if(!(k in f)){if(this.requestsById.hasOwnProperty(k)){var h=this.requestsById[k];delete this.requestsById[k];if(h!==null){h=h.id=h.coord=h.url=null}}}}},hasRequest:function(b){return(b in this.requestsById)},requestTile:function(e,d,b){if(!(e in this.requestsById)){var c={id:e,coord:d.copy(),url:b};this.requestsById[e]=c;if(b){this.requestQueue.push(c)}}},getProcessQueue:function(){if(!this._processQueue){var b=this;this._processQueue=function(){b.processQueue()}}return this._processQueue},processQueue:function(d){if(d&&this.requestQueue.length>8){this.requestQueue.sort(d)}while(this.openRequestCount<this.maxOpenRequests&&this.requestQueue.length>0){var c=this.requestQueue.pop();if(c){this.openRequestCount++;var b=document.createElement("img");b.id=c.id;b.style.position="absolute";b.coord=c.coord;this.loadingBay.appendChild(b);b.onload=b.onerror=this.getLoadComplete();b.src=c.url;c=c.id=c.coord=c.url=null}}},_loadComplete:null,getLoadComplete:function(){if(!this._loadComplete){var b=this;this._loadComplete=function(d){d=d||window.event;var c=d.srcElement||d.target;c.onload=c.onerror=null;b.loadingBay.removeChild(c);b.openRequestCount--;delete b.requestsById[c.id];if(d.type==="load"&&(c.complete||(c.readyState&&c.readyState=="complete"))){b.dispatchCallback("requestcomplete",c)}else{b.dispatchCallback("requesterror",{element:c,url:(""+c.src)});c.src=null}setTimeout(b.getProcessQueue(),0)}}return this._loadComplete}};a.Layer=function(c,b){this.parent=b||document.createElement("div");this.parent.style.cssText="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; margin: 0; padding: 0; z-index: 0";this.levels={};this.requestManager=new a.RequestManager();this.requestManager.addCallback("requestcomplete",this.getTileComplete());this.requestManager.addCallback("requesterror",this.getTileError());if(c){this.setProvider(c)}};a.Layer.prototype={map:null,parent:null,tiles:null,levels:null,requestManager:null,provider:null,emptyImage:"data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",_tileComplete:null,getTileComplete:function(){if(!this._tileComplete){var b=this;this._tileComplete=function(c,d){b.tiles[d.id]=d;b.positionTile(d)}}return this._tileComplete},getTileError:function(){if(!this._tileError){var b=this;this._tileError=function(c,d){d.src=b.emptyImage;b.tiles[d.id]=d;b.positionTile(d)}}return this._tileError},draw:function(){var p=this.map.coordinate.zoomTo(Math.round(this.map.coordinate.zoom));function f(t,s){if(t&&s){var v=t.coord;var u=s.coord;if(v.zoom==u.zoom){var r=Math.abs(p.row-v.row-0.5)+Math.abs(p.column-v.column-0.5);var w=Math.abs(p.row-u.row-0.5)+Math.abs(p.column-u.column-0.5);return r<w?1:r>w?-1:0}else{return v.zoom<u.zoom?1:v.zoom>u.zoom?-1:0}}return t?1:s?-1:0}var o=Math.round(this.map.coordinate.zoom);var n=this.map.pointCoordinate(new a.Point(0,0)).zoomTo(o).container();var i=this.map.pointCoordinate(this.map.dimensions).zoomTo(o).container().right().down();var k={};var m=this.createOrGetLevel(n.zoom);var h=n.copy();for(h.column=n.column;h.column<=i.column;h.column++){for(h.row=n.row;h.row<=i.row;h.row++){var c=this.inventoryVisibleTile(m,h);while(c.length){k[c.pop()]=true}}}for(var e in this.levels){if(this.levels.hasOwnProperty(e)){var q=parseInt(e,10);if(q>=n.zoom-5&&q<n.zoom+2){continue}var d=this.levels[e];d.style.display="none";var g=this.tileElementsInLevel(d);while(g.length){this.provider.releaseTile(g[0].coord);this.requestManager.clearRequest(g[0].coord.toKey());d.removeChild(g[0]);g.shift()}}}var b=n.zoom-5;var l=n.zoom+2;for(var j=b;j<l;j++){this.adjustVisibleLevel(this.levels[j],j,k)}this.requestManager.clearExcept(k);this.requestManager.processQueue(f)},inventoryVisibleTile:function(m,c){var g=c.toKey(),d=[g];if(g in this.tiles){var f=this.tiles[g];if(f.parentNode!=m){m.appendChild(f);if("reAddTile" in this.provider){this.provider.reAddTile(g,c,f)}}return d}if(!this.requestManager.hasRequest(g)){var l=this.provider.getTile(c);if(typeof l=="string"){this.addTileImage(g,c,l)}else{if(l){this.addTileElement(g,c,l)}}}var e=false;var j=c.zoom;for(var h=1;h<=j;h++){var b=c.zoomBy(-h).container();var k=b.toKey();if(k in this.tiles){d.push(k);e=true;break}}if(!e){var i=c.zoomBy(1);d.push(i.toKey());i.column+=1;d.push(i.toKey());i.row+=1;d.push(i.toKey());i.column-=1;d.push(i.toKey())}return d},tileElementsInLevel:function(d){var b=[];for(var c=d.firstChild;c;c=c.nextSibling){if(c.nodeType==1){b.push(c)}}return b},adjustVisibleLevel:function(c,k,d){if(!c){return}var e=1;var j=this.map.coordinate.copy();if(c.childNodes.length>0){c.style.display="block";e=Math.pow(2,this.map.coordinate.zoom-k);j=j.zoomTo(k)}else{c.style.display="none";return false}var h=this.map.tileSize.x*e;var f=this.map.tileSize.y*e;var b=new a.Point(this.map.dimensions.x/2,this.map.dimensions.y/2);var i=this.tileElementsInLevel(c);while(i.length){var g=i.pop();if(!d[g.id]){this.provider.releaseTile(g.coord);this.requestManager.clearRequest(g.coord.toKey());c.removeChild(g)}else{a.moveElement(g,{x:Math.round(b.x+(g.coord.column-j.column)*h),y:Math.round(b.y+(g.coord.row-j.row)*f),scale:e,width:this.map.tileSize.x,height:this.map.tileSize.y})}}},createOrGetLevel:function(b){if(b in this.levels){return this.levels[b]}var c=document.createElement("div");c.id=this.parent.id+"-zoom-"+b;c.style.cssText=this.parent.style.cssText;c.style.zIndex=b;this.parent.appendChild(c);this.levels[b]=c;return c},addTileImage:function(c,d,b){this.requestManager.requestTile(c,d,b)},addTileElement:function(c,d,b){b.id=c;b.coord=d.copy();this.positionTile(b)},positionTile:function(d){var c=this.map.coordinate.zoomTo(d.coord.zoom);d.style.cssText="position:absolute;-webkit-user-select:none;-webkit-user-drag:none;-moz-user-drag:none;-webkit-transform-origin:0 0;-moz-transform-origin:0 0;-o-transform-origin:0 0;-ms-transform-origin:0 0;";d.ondragstart=function(){return false};var e=Math.pow(2,this.map.coordinate.zoom-d.coord.zoom);a.moveElement(d,{x:Math.round((this.map.dimensions.x/2)+(d.coord.column-c.column)*this.map.tileSize.x),y:Math.round((this.map.dimensions.y/2)+(d.coord.row-c.row)*this.map.tileSize.y),scale:e,width:this.map.tileSize.x,height:this.map.tileSize.y});var b=this.levels[d.coord.zoom];b.appendChild(d);d.className="map-tile-loaded";if(Math.round(this.map.coordinate.zoom)==d.coord.zoom){b.style.display="block"}this.requestRedraw()},_redrawTimer:undefined,requestRedraw:function(){if(!this._redrawTimer){this._redrawTimer=setTimeout(this.getRedraw(),1000)}},_redraw:null,getRedraw:function(){if(!this._redraw){var b=this;this._redraw=function(){b.draw();b._redrawTimer=0}}return this._redraw},setProvider:function(c){var d=(this.provider===null);if(!d){this.requestManager.clear();for(var b in this.levels){if(this.levels.hasOwnProperty(b)){var e=this.levels[b];while(e.firstChild){this.provider.releaseTile(e.firstChild.coord);e.removeChild(e.firstChild)}}}}this.tiles={};this.provider=c;if(!d){this.draw()}},destroy:function(){this.requestManager.clear();this.requestManager.removeCallback("requestcomplete",this.getTileComplete());this.provider=null;if(this.parent.parentNode){this.parent.parentNode.removeChild(this.parent)}this.map=null}};a.Map=function(f,e,g,h){if(typeof f=="string"){f=document.getElementById(f);if(!f){throw"The ID provided to modest maps could not be found."}}this.parent=f;this.parent.style.padding="0";this.parent.style.overflow="hidden";var b=a.getStyle(this.parent,"position");if(b!="relative"&&b!="absolute"){this.parent.style.position="relative"}this.layers=[];if(!e){e=[]}if(!(e instanceof Array)){e=[e]}for(var d=0;d<e.length;d++){this.addLayer(e[d])}this.projection=new a.MercatorProjection(0,a.deriveTransformation(-Math.PI,Math.PI,0,0,Math.PI,Math.PI,1,0,-Math.PI,-Math.PI,0,1));this.tileSize=new a.Point(256,256);this.coordLimits=[new a.Coordinate(0,-Infinity,0),new a.Coordinate(1,Infinity,0).zoomTo(18)];this.coordinate=new a.Coordinate(0.5,0.5,0);if(!g){g=new a.Point(this.parent.offsetWidth,this.parent.offsetHeight);this.autoSize=true;a.addEvent(window,"resize",this.windowResize())}else{this.autoSize=false;this.parent.style.width=Math.round(g.x)+"px";this.parent.style.height=Math.round(g.y)+"px"}this.dimensions=g;this.callbackManager=new a.CallbackManager(this,["zoomed","panned","centered","extentset","resized","drawn"]);if(h===undefined){this.eventHandlers=[a.MouseHandler().init(this),a.TouchHandler().init(this)]}else{this.eventHandlers=h;if(h instanceof Array){for(var c=0;c<h.length;c++){h[c].init(this)}}}};a.Map.prototype={parent:null,dimensions:null,projection:null,coordinate:null,tileSize:null,coordLimits:null,layers:null,callbackManager:null,eventHandlers:null,autoSize:null,toString:function(){return"Map(#"+this.parent.id+")"},addCallback:function(b,c){this.callbackManager.addCallback(b,c);return this},removeCallback:function(b,c){this.callbackManager.removeCallback(b,c);return this},dispatchCallback:function(c,b){this.callbackManager.dispatchCallback(c,b);return this},windowResize:function(){if(!this._windowResize){var b=this;this._windowResize=function(c){b.dimensions=new a.Point(b.parent.offsetWidth,b.parent.offsetHeight);b.draw();b.dispatchCallback("resized",[b.dimensions])}}return this._windowResize},setZoomRange:function(c,b){this.coordLimits[0]=this.coordLimits[0].zoomTo(c);this.coordLimits[1]=this.coordLimits[1].zoomTo(b);return this},zoomBy:function(b){this.coordinate=this.enforceLimits(this.coordinate.zoomBy(b));a.getFrame(this.getRedraw());this.dispatchCallback("zoomed",b);return this},zoomIn:function(){return this.zoomBy(1)},zoomOut:function(){return this.zoomBy(-1)},setZoom:function(b){return this.zoomBy(b-this.coordinate.zoom)},zoomByAbout:function(c,b){var e=this.pointLocation(b);this.coordinate=this.enforceLimits(this.coordinate.zoomBy(c));var d=this.locationPoint(e);this.dispatchCallback("zoomed",c);return this.panBy(b.x-d.x,b.y-d.y)},panBy:function(c,b){this.coordinate.column-=c/this.tileSize.x;this.coordinate.row-=b/this.tileSize.y;this.coordinate=this.enforceLimits(this.coordinate);a.getFrame(this.getRedraw());this.dispatchCallback("panned",[c,b]);return this},panLeft:function(){return this.panBy(100,0)},panRight:function(){return this.panBy(-100,0)},panDown:function(){return this.panBy(0,-100)},panUp:function(){return this.panBy(0,100)},setCenter:function(b){return this.setCenterZoom(b,this.coordinate.zoom)},setCenterZoom:function(b,c){this.coordinate=this.projection.locationCoordinate(b).zoomTo(parseFloat(c)||0);a.getFrame(this.getRedraw());this.dispatchCallback("centered",[b,c]);return this},extentCoordinate:function(p,q){if(p instanceof a.Extent){p=p.toArray()}var t,j;for(var k=0;k<p.length;k++){var l=this.projection.locationCoordinate(p[k]);if(t){t.row=Math.min(t.row,l.row);t.column=Math.min(t.column,l.column);t.zoom=Math.min(t.zoom,l.zoom);j.row=Math.max(j.row,l.row);j.column=Math.max(j.column,l.column);j.zoom=Math.max(j.zoom,l.zoom)}else{t=l.copy();j=l.copy()}}var h=this.dimensions.x+1;var g=this.dimensions.y+1;var m=(j.column-t.column)/(h/this.tileSize.x);var r=Math.log(m)/Math.log(2);var n=t.zoom-(q?r:Math.ceil(r));var o=(j.row-t.row)/(g/this.tileSize.y);var d=Math.log(o)/Math.log(2);var e=t.zoom-(q?d:Math.ceil(d));var b=Math.min(n,e);b=Math.min(b,this.coordLimits[1].zoom);b=Math.max(b,this.coordLimits[0].zoom);var c=(t.row+j.row)/2;var s=(t.column+j.column)/2;var f=t.zoom;return new a.Coordinate(c,s,f).zoomTo(b)},setExtent:function(b,c){this.coordinate=this.extentCoordinate(b,c);this.draw();this.dispatchCallback("extentset",b);return this},setSize:function(b){this.dimensions=new a.Point(b.x,b.y);this.parent.style.width=Math.round(this.dimensions.x)+"px";this.parent.style.height=Math.round(this.dimensions.y)+"px";if(this.autoSize){a.removeEvent(window,"resize",this.windowResize());this.autoSize=false}this.draw();this.dispatchCallback("resized",this.dimensions);return this},coordinatePoint:function(c){if(c.zoom!=this.coordinate.zoom){c=c.zoomTo(this.coordinate.zoom)}var b=new a.Point(this.dimensions.x/2,this.dimensions.y/2);b.x+=this.tileSize.x*(c.column-this.coordinate.column);b.y+=this.tileSize.y*(c.row-this.coordinate.row);return b},pointCoordinate:function(b){var c=this.coordinate.copy();c.column+=(b.x-this.dimensions.x/2)/this.tileSize.x;c.row+=(b.y-this.dimensions.y/2)/this.tileSize.y;return c},locationCoordinate:function(b){return this.projection.locationCoordinate(b)},coordinateLocation:function(b){return this.projection.coordinateLocation(b)},locationPoint:function(b){return this.coordinatePoint(this.locationCoordinate(b))},pointLocation:function(b){return this.coordinateLocation(this.pointCoordinate(b))},getExtent:function(){return new a.Extent(this.pointLocation(new a.Point(0,0)),this.pointLocation(this.dimensions))},extent:function(b,c){if(b){return this.setExtent(b,c)}else{return this.getExtent()}},getCenter:function(){return this.projection.coordinateLocation(this.coordinate)},center:function(b){if(b){return this.setCenter(b)}else{return this.getCenter()}},getZoom:function(){return this.coordinate.zoom},zoom:function(b){if(b!==undefined){return this.setZoom(b)}else{return this.getZoom()}},getLayers:function(){return this.layers.slice()},getLayerAt:function(b){return this.layers[b]},addLayer:function(b){this.layers.push(b);this.parent.appendChild(b.parent);b.map=this;if(this.coordinate){a.getFrame(this.getRedraw())}return this},removeLayer:function(c){for(var b=0;b<this.layers.length;b++){if(c==this.layers[b]){this.removeLayerAt(b);break}}return this},setLayerAt:function(c,d){if(c<0||c>=this.layers.length){throw new Error("invalid index in setLayerAt(): "+c)}if(this.layers[c]!=d){if(c<this.layers.length){var b=this.layers[c];this.parent.insertBefore(d.parent,b.parent);b.destroy()}else{this.parent.appendChild(d.parent)}this.layers[c]=d;d.map=this;a.getFrame(this.getRedraw())}return this},insertLayerAt:function(c,d){if(c<0||c>this.layers.length){throw new Error("invalid index in insertLayerAt(): "+c)}if(c==this.layers.length){this.layers.push(d);this.parent.appendChild(d.parent)}else{var b=this.layers[c];this.parent.insertBefore(d.parent,b.parent);this.layers.splice(c,0,d)}d.map=this;a.getFrame(this.getRedraw());return this},removeLayerAt:function(c){if(c<0||c>=this.layers.length){throw new Error("invalid index in removeLayer(): "+c)}var b=this.layers[c];this.layers.splice(c,1);b.destroy();return this},swapLayersAt:function(c,b){if(c<0||c>=this.layers.length||b<0||b>=this.layers.length){throw new Error("invalid index in swapLayersAt(): "+index)}var f=this.layers[c],d=this.layers[b],e=document.createElement("div");this.parent.replaceChild(e,d.parent);this.parent.replaceChild(d.parent,f.parent);this.parent.replaceChild(f.parent,e);this.layers[c]=d;this.layers[b]=f;return this},enforceZoomLimits:function(e){var c=this.coordLimits;if(c){var d=c[0].zoom;var b=c[1].zoom;if(e.zoom<d){e=e.zoomTo(d)}else{if(e.zoom>b){e=e.zoomTo(b)}}}return e},enforcePanLimits:function(f){if(this.coordLimits){f=f.copy();var d=this.coordLimits[0].zoomTo(f.zoom);var b=this.coordLimits[1].zoomTo(f.zoom);var c=this.pointCoordinate(new a.Point(0,0)).zoomTo(f.zoom);var e=this.pointCoordinate(this.dimensions).zoomTo(f.zoom);if(b.row-d.row<e.row-c.row){f.row=(b.row+d.row)/2}else{if(c.row<d.row){f.row+=d.row-c.row}else{if(e.row>b.row){f.row-=e.row-b.row}}}if(b.column-d.column<e.column-c.column){f.column=(b.column+d.column)/2}else{if(c.column<d.column){f.column+=d.column-c.column}else{if(e.column>b.column){f.column-=e.column-b.column}}}}return f},enforceLimits:function(b){return this.enforcePanLimits(this.enforceZoomLimits(b))},draw:function(){this.coordinate=this.enforceLimits(this.coordinate);if(this.dimensions.x<=0||this.dimensions.y<=0){if(this.autoSize){var b=this.parent.offsetWidth,d=this.parent.offsetHeight;this.dimensions=new a.Point(b,d);if(b<=0||d<=0){return}}else{return}}for(var c=0;c<this.layers.length;c++){this.layers[c].draw()}this.dispatchCallback("drawn")},_redrawTimer:undefined,requestRedraw:function(){if(!this._redrawTimer){this._redrawTimer=setTimeout(this.getRedraw(),1000)}},_redraw:null,getRedraw:function(){if(!this._redraw){var b=this;this._redraw=function(){b.draw();b._redrawTimer=0}}return this._redraw},destroy:function(){for(var b=0;b<this.layers.length;b++){this.layers[b].destroy()}this.layers=[];this.projection=null;for(var c=0;c<this.eventHandlers.length;c++){this.eventHandlers[c].remove()}if(this.autoSize){a.removeEvent(window,"resize",this.windowResize())}}};a.mapByCenterZoom=function(d,f,b,e){var c=a.coerceLayer(f),g=new a.Map(d,c,false);g.setCenterZoom(b,e).draw();return g};a.mapByExtent=function(d,f,e,c){var b=a.coerceLayer(f),g=new a.Map(d,b,false);g.setExtent([e,c]).draw();return g};if(typeof module!=="undefined"&&module.exports){module.exports={Point:a.Point,Projection:a.Projection,MercatorProjection:a.MercatorProjection,LinearProjection:a.LinearProjection,Transformation:a.Transformation,Location:a.Location,MapProvider:a.MapProvider,Template:a.Template,Coordinate:a.Coordinate,deriveTransformation:a.deriveTransformation}}