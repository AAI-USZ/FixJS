function() {

      self.saved.css = [];
      
      if (self.isie7mobile) return true; // SORRY, DO NOT WORK!
      
//      if (self.hasmstouch) $("html").css('-ms-content-zooming','none');
      if (self.hasmstouch) self.css((self.ispage)?$("html"):self.win,{'-ms-touch-action':'none'});
      
      if (!self.ispage || (!self.cantouch && !self.isieold && !self.isie9mobile)) {
      
        var cont = self.docscroll;
        if (self.ispage) cont = (self.haswrapper)?self.win:self.doc;
        
        if (!self.isie9mobile) self.css(cont,{'overflow-y':'hidden'});      
        
        if (self.ispage&&self.isie7&&self.win[0].nodeName=='BODY') self.css($("html"),{'overflow-y':'hidden'});  //IE7 double scrollbar issue
        
        var cursor = $(document.createElement('div'));
        cursor.css({
          position:"relative",top:0,"float":"right",width:self.opt.cursorwidth,height:"0px",
          'background-color':self.opt.cursorcolor,
          border:self.opt.cursorborder,
          'background-clip':'padding-box',
          '-webkit-border-radius':self.opt.cursorborderradius,
          '-moz-border-radius':self.opt.cursorborderradius,
          'border-radius':self.opt.cursorborderradius
        });   
        
        cursor.hborder = parseFloat(cursor.outerHeight() - cursor.innerHeight());        
        self.cursor = cursor;        
        
        var rail = $(document.createElement('div'));
        rail.attr('id',self.id);
        rail.width = Math.max(parseFloat(self.opt.cursorwidth),cursor.outerWidth());
        rail.css({width:rail.width+"px",'zIndex':(self.ispage)?self.opt.zindex:self.opt.zindex+2,"background":self.opt.background});
        
        var kp = ["top","bottom","left","right"];
        for(var a in kp) {
          var v = self.opt.railpadding[a];
          if (v) rail.css("padding-"+a,v+"px");
        }
        
        rail.append(cursor);
        
        self.rail = rail;
        
        self.rail.drag = false;
        
        var zoom = false;
        if (self.opt.boxzoom&&!self.ispage&&!self.isieold) {
          zoom = document.createElement('div');          
          self.bind(zoom,"click",self.doZoom);
          self.zoom = $(zoom);
          self.zoom.css({"cursor":"pointer",'z-index':self.opt.zindex,'backgroundImage':'url('+scriptpath+'zoomico.png)','height':18,'width':18,'backgroundPosition':'0px 0px'});
          if (self.opt.dblclickzoom) self.bind(self.win,"dblclick",self.doZoom);
          if (self.cantouch&&self.opt.gesturezoom) {
            self.ongesturezoom = function(e) {
              if (e.scale>1.5) self.doZoomIn(e);
              if (e.scale<0.8) self.doZoomOut(e);
              return self.cancelEvent(e);
            };
            self.bind(self.win,"gestureend",self.ongesturezoom);             
          }
        }
        
        if (self.ispage) {
          rail.css({position:"fixed",top:"0px",right:"0px",height:"100%"});
          self.body.append(rail);          
        } else {
          if (self.ishwscroll) {
            if (self.win.css('position')=='static') self.css(self.win,{'position':'relative'});
            var bd = (self.win[0].nodeName == 'HTML') ? self.body : self.win;
            if (self.zoom) {
              self.zoom.css({position:"absolute",top:1,right:0,"margin-right":rail.width+4});
              bd.append(self.zoom);
            }
            rail.css({position:"absolute",top:0,right:0});
            bd.append(rail);
          } else {
            rail.css({position:"absolute"});
            if (self.zoom) self.zoom.css({position:"absolute"});
            self.updateScrollBar();
            self.body.append(rail);           
            if (self.zoom) self.body.append(self.zoom);
          }
          
          if (self.isios) self.css(self.win,{'-webkit-tap-highlight-color':'rgba(0,0,0,0)','-webkit-touch-callout':'none'});  // prevent grey layer on click
          
        }
        
        if (self.opt.autohidemode===false) {
          self.autohidedom = false;
        }
        else if (self.opt.autohidemode===true) {
          self.autohidedom = self.rail;
        }
        else if (self.opt.autohidemode=="cursor") {
          self.autohidedom = self.cursor;
        }        
        
        if (self.isie9mobile) {

          self.scrollmom = {            
            y:new ScrollMomentumClass(self)
          };        

          self.onmangotouch = function(e) {
            var py = self.getScrollTop();
            if (py == self.scrollmom.y.lastscrolly) return true;
            var df = py-self.mangotouch.sy;
            if (df==0) return;
            var dr = (df<0)?-1:1;
            var tm = (new Date()).getTime();            
            if (self.mangotouch.lazy) clearTimeout(self.mangotouch.lazy);
            if (((tm-self.mangotouch.tm)>60)||(self.mangotouch.dry!=dr)) {
              self.scrollmom.y.stop();
              self.scrollmom.y.reset(py);
              self.mangotouch.sy = py;
              self.mangotouch.ly = py;
              self.mangotouch.dry = dr;
              self.mangotouch.tm = tm;
            } else {
              self.scrollmom.y.stop();
              self.scrollmom.y.update(self.mangotouch.sy-df);
              var gap = tm - self.mangotouch.tm;
              self.mangotouch.tm = tm;
              var px = Math.abs(self.mangotouch.ly-py);
              self.mangotouch.ly = py;
              if (px>2) {
                self.mangotouch.lazy = setTimeout(function(){
                  self.mangotouch.lazy = false;
                  self.mangotouch.dry = 0;
                  self.mangotouch.tm = 0;
                  self.scrollmom.y.doMomentum(gap);
                },80);
              }
            }
          }
          
          var top = self.getScrollTop()
          self.mangotouch = {sy:top,ly:top,dry:0,lazy:false,tm:0};
          
          self.bind(self.docscroll,"scroll",self.onmangotouch);
        
        } else {
        
          if (self.cantouch||self.opt.touchbehavior||self.hasmstouch) {
          
            self.scrollmom = {
              y:new ScrollMomentumClass(self)
            };        
          
            self.ontouchstart = function(e) {
              if (e.pointerType&&e.pointerType!=2) return false;
              
              if (!self.locked) {
              
                if (self.hasmstouch) {
                  var tg = (e.target) ? e.target : false;
                  while (tg) {
                    var nc = $(tg).getNiceScroll();
                    if ((nc.length>0)&&(nc[0].me == self.me)) break;
                    if (nc.length>0) return false;
                    if ((tg.nodeName=='DIV')&&(tg.id==self.id)) break;
                    tg = (tg.parentNode) ? tg.parentNode : false;
                  }
                }
              
                self.cancelScroll();
                self.rail.drag = {x:e.clientX,y:e.clientY,sx:self.scroll.x,sy:self.scroll.y,st:self.getScrollTop(),pt:2};
                
                self.hasmoving = false;
                self.lastmouseup = false;
                self.scrollmom.y.reset(e.clientY);
                if (!self.cantouch&&!self.hasmstouch) {
                  var tg = self.getTarget(e);                
                  var ip = (tg)?/INPUT|SELECT|TEXTAREA/i.test(tg.nodeName):false;
                  if (!ip) return self.cancelEvent(e);
                  if (/SUBMIT|CANCEL|BUTTON/i.test($(tg).attr('type'))) {
                    pc = {"tg":tg,"click":false};
                    self.preventclick = pc;
                  }
                }
              }
              
            };
            
            self.ontouchend = function(e) {
              if (e.pointerType&&e.pointerType!=2) return false;
              if (self.rail.drag&&(self.rail.drag.pt==2)) {            
                self.scrollmom.y.doMomentum();
                self.rail.drag = false;
                if (self.hasmoving) {
                  self.hasmoving = false;
                  self.lastmouseup = true;
                  self.hideCursor();
                  if (!self.cantouch) return self.cancelEvent(e);
                }                            
              }                        
              
            };
            
            self.ontouchmove = function(e) {            
              
              if (e.pointerType&&e.pointerType!=2) return false;
    
              if (self.rail.drag&&(self.rail.drag.pt==2)) {
                if (self.cantouch&&(typeof e.original == "undefined")) return true;  // prevent ios "ghost" events by clickable elements
              
                self.hasmoving = true;

                if (self.preventclick&&!self.preventclick.click) {
                  self.preventclick.click = self.preventclick.tg.onclick||false;                
                  self.preventclick.tg.onclick = self.onpreventclick;
                }

                var fy = e.clientY;
                var my = (fy-self.rail.drag.y);
                
                var ny = self.rail.drag.st-my;
                
                if (self.ishwscroll) {
                  if (ny<0) {
                    ny = Math.round(ny/2);
                    fy = 0;
                  }
                  else if (ny>self.page.maxh) {
                    ny = self.page.maxh+Math.round((ny-self.page.maxh)/2);
                    fy = 0;
                  }
                } else {
                  if (ny<0) ny=0;
                  if (ny>self.page.maxh) ny=self.page.maxh;
                }
                              
                self.synched("touchmove",function(){
                  if (self.rail.drag&&(self.rail.drag.pt==2)) {
                    if (self.prepareTransition) self.prepareTransition(0);
                    self.setScrollTop(ny);
                    self.showCursor(ny);
                    self.scrollmom.y.update(fy);
                  }
                });
                
                return self.cancelEvent(e);
              }
              
            };
          
          }
         
          if (self.cantouch||self.opt.touchbehavior) {
          
            self.onpreventclick = function(e) {
              if (self.preventclick) {
                self.preventclick.tg.onclick = self.preventclick.click;
                self.preventclick = false;            
                return self.cancelEvent(e);
              }
            }
          
            self.onmousedown = self.ontouchstart;
            
            self.onmouseup = self.ontouchend;

            self.onclick = (self.isios) ? false : function(e) { 
              if (self.lastmouseup) {
                self.lastmouseup = false;
                return self.cancelEvent(e);
              } else {
                return true;
              }
            }; 
            
            self.onmousemove = self.ontouchmove;
            
            if (self.cursorgrabvalue) {
              self.css((self.ispage)?self.doc:self.win,{'cursor':self.cursorgrabvalue});            
              self.css(self.rail,{'cursor':self.cursorgrabvalue});
            }
            
          } else {
          
            self.onmousedown = function(e) {            
              if (self.rail.drag&&self.rail.drag.pt!=1) return;
              if (self.locked) return self.cancelEvent(e);            
              self.cancelScroll();
              self.rail.drag = {x:e.clientX,y:e.clientY,sx:self.scroll.x,sy:self.scroll.y,pt:1};
              return self.cancelEvent(e);
            };
            self.onmouseup = function(e) {
              if (self.rail.drag) {
                if(self.rail.drag.pt!=1)return;
                self.rail.drag = false;
                return self.cancelEvent(e);
              }
            };        
            self.onmousemove = function(e) {

              if (self.rail.drag) {
                if(self.rail.drag.pt!=1)return;
                self.scroll.y = self.rail.drag.sy + (e.clientY-self.rail.drag.y);
                if (self.scroll.y<0) self.scroll.y=0;
                var my = self.scrollvaluemax;
                if (self.scroll.y>my) self.scroll.y=my;
                
                self.synched('mousemove',function(){
                  if (self.rail.drag&&(self.rail.drag.pt==1)) {
                    self.showCursor();
                    self.cursorfreezed = true;
                    self.doScroll(Math.round(self.scroll.y*self.scrollratio.y));          
                  }
                });
                
                return self.cancelEvent(e);
              } else {
                self.checkarea = true;
              }
            };
          }

          if (self.cantouch||self.opt.touchbehavior) {
            self.bind(self.win,"mousedown",self.onmousedown);
          }
          
          if (self.hasmstouch) {
            self.css(self.rail,{'-ms-touch-action':'none'});
            self.css(self.cursor,{'-ms-touch-action':'none'});
            
            self.bind(self.win,"MSPointerDown",self.ontouchstart);
            self.bind(document,"MSPointerUp",self.ontouchend);
            self.bind(document,"MSPointerMove",self.ontouchmove);
            self.bind(self.cursor,"MSGestureHold",function(e){e.preventDefault();});
            self.bind(self.cursor,"contextmenu",function(e){e.preventDefault();});
          }

          self.bind(self.cursor,"mousedown",self.onmousedown);
          self.bind(self.cursor,"mouseup",function(e) {
            if (self.rail.drag&&self.rail.drag.pt==2) return;
            self.rail.drag = false;
            self.hasmoving = false;
            self.hideCursor();
            return self.cancelEvent(e);
          });
          
          self.bind(document,"mouseup",self.onmouseup);
          self.bind(document,"mousemove",self.onmousemove);
          if (self.onclick) self.bind(document,"click",self.onclick);
    
          if (!self.cantouch) {
            self.rail.mouseenter(function() {
              self.showCursor();
              self.rail.active = true;
            });          
            self.rail.mouseleave(function() { 
              self.rail.active = false;
              if (!self.rail.drag) self.hideCursor();
            });
            if (!self.isiframe) self.bind((self.isie&&self.ispage) ? document : self.docscroll,"mousewheel",self.onmousewheel);
            self.bind(self.rail,"mousewheel",self.onmousewheel);
          }

          if (self.zoom) {
            self.zoom.mouseenter(function() {
              self.showCursor();
              self.rail.active = true;
            });          
            self.zoom.mouseleave(function() { 
              self.rail.active = false;
              if (!self.rail.drag) self.hideCursor();
            });
          }
          
          if (!self.ispage&&!self.cantouch&&!(/HTML|BODY/.test(self.win[0].nodeName))) {
            if (!self.win.attr("tabindex")) self.win.attr({"tabindex":tabindexcounter++});
            
            if (self.ischrome&&self.opt.disableoutline) self.win.css({"outline":"none"});
            
            self.win.focus(function(e) {
              domfocus = (self.getTarget(e)).id||true;
              self.hasfocus = true;
              self.noticeCursor();
            });
            self.win.blur(function(e) {
              domfocus = false;
              self.hasfocus = false;
            });
            self.win.mouseenter(function(e) {
              mousefocus = (self.getTarget(e)).id||true;
              self.hasmousefocus = true;
              self.noticeCursor();
            });
            self.win.mouseleave(function() {
              mousefocus = false;
              self.hasmousefocus = false;
            });
          };
          
        }  // !ie9mobile
        
        //Thanks to http://www.quirksmode.org !!
        self.onkeypress = function(e) {
          if (self.locked&&self.page.maxh==0) return true;
          e = (e) ? e : window.e;
          var tg = self.getTarget(e);
          if (tg&&/INPUT|TEXTAREA|SELECT|OPTION/.test(tg.nodeName)) {
            var tp = tg.getAttribute('type')||tg.type||false;            
            if ((!tp)||!(/submit|button|cancel/i.tp)) return true;
          }
          
          if (self.hasfocus||(self.hasmousefocus&&!domfocus)||(self.ispage&&!domfocus&&!mousefocus)) {
            var key = e.keyCode;
            
            if (self.locked&&key!=27) return self.cancelEvent(e);
            
            var ret = false;
            switch (key) {
              case 38:
              case 63233: //safari
                self.doScrollBy(24*3);
                ret = true;
                break;
              case 40:
              case 63235: //safari
                self.doScrollBy(-24*3);
                ret = true;
                break;
              case 33:
              case 63276: // safari
                self.doScrollBy(self.view.h);
                ret = true;
                break;
              case 34:
              case 63277: // safari
                self.doScrollBy(-self.view.h);
                ret = true;
                break;
              case 36:
              case 63273: // safari
                self.doScrollTo(0);
                ret = true;
                break;
              case 35:
              case 63275: // safari
                self.doScrollTo(self.page.maxh);
                ret = true;
                break;
              case 32:
                if (self.opt.spacebarenabled) {
                  self.doScrollBy(-self.view.h);
                  ret = true;
                }
                break;
              case 27: // ESC
                if (self.zoomactive) {
                  self.doZoom();
                  ret = true;
                }
                break;
            }
            if (ret) return self.cancelEvent(e);
          }
        };
        
        self.bind(document,(self.isopera)?"keypress":"keydown",self.onkeypress);
        
        
        self.bind(window,'resize',self.resize);
        self.bind(window,'orientationchange',self.resize);
        
        self.bind(window,"load",self.resize);

        
// Trying a cross-browser implementation - good luck!

        self.onAttributeChange = function(e) {
          self.lazyResize();
        }
        
        if (!self.ispage&&!self.haswrapper) {
          // thanks to Filip http://stackoverflow.com/questions/1882224/        
          if ("WebKitMutationObserver" in window) {
            var observer = new WebKitMutationObserver(function(mutations) {
              mutations.forEach(self.onAttributeChange);
            });
            observer.observe(self.win[0],{attributes:true,subtree:false});
          } else {        
            self.bind(self.win,(self.isie&&!self.isie9)?"propertychange":"DOMAttrModified",self.onAttributeChange);
            if (self.isie9) self.win[0].attachEvent("onpropertychange",self.onAttributeChange); //IE9 DOMAttrModified bug
          }
        }
        
//

        if (!self.ispage&&self.opt.boxzoom) self.bind(window,"resize",self.resizeZoom);
        if (self.istextarea) self.bind(self.win,"mouseup",self.resize);
        
        self.resize();
        
      }
      
      if (this.doc[0].nodeName == 'IFRAME') {
        function oniframeload(e) {
          self.iframexd = false;
          try {
            var doc = 'contentDocument' in this ? this.contentDocument : this.contentWindow.document;
            var a = doc.domain;            
          } catch(e){self.iframexd = true;doc=false};
          
          if (self.iframexd) return true;  //cross-domain - I can't manage this        
          
          if (self.isiframe) {
            self.iframe = {
              html:self.doc.contents().find('html')[0],
              body:self.doc.contents().find('body')[0]
            };
            self.getContentSize = function(){
              return {
                w:Math.max(self.iframe.html.scrollWidth,self.iframe.body.scrollWidth),
                h:Math.max(self.iframe.html.scrollHeight,self.iframe.body.scrollHeight)
              }
            }            
            self.docscroll = $(this.contentWindow);
          }
          if (self.opt.iframeautoresize&&!self.isiframe) {
            self.win.scrollTop(0); // reset position
            self.doc.height("");  //reset height to fix browser bug
            var hh=Math.max(doc.getElementsByTagName('html')[0].scrollHeight,doc.body.scrollHeight);
            self.doc.height(hh);          
          }
          self.resize();
          
          if (self.isie7) self.css($(doc).find('html'),{'overflow-y':'hidden'});
          self.css($(doc.body),{'overflow-y':'hidden'});
          if ('contentWindow' in this) {
            self.bind(this.contentWindow,"scroll",self.onscroll);  //IE8 & minor
          } else {          
            self.bind(doc,"scroll",self.onscroll);
          }          
          self.bind(doc,"mouseup",self.onmouseup);
          self.bind(doc,"mousewheel",self.onmousewheel);
          self.bind(doc,(self.isopera)?"keypress":"keydown",self.onkeypress);          
          if (self.cantouch||self.opt.touchbehavior) {
            self.bind(doc,"mousedown",self.onmousedown);
            if (self.cursorgrabvalue) self.css($(doc.body),{'cursor':self.cursorgrabvalue});
          }
          
          self.bind(doc,"mousemove",self.onmousemove);
          
          if (self.zoom) {
            if (self.opt.dblclickzoom) self.bind(doc,'dblclick',self.doZoom);
            if (self.ongesturezoom) self.bind(doc,"gestureend",self.ongesturezoom);             
          }
        };
        
        if (this.doc[0].readyState&&this.doc[0].readyState=="complete"){
          setTimeout(function(){oniframeload.call(self.doc[0],false)},500);
        }
        self.bind(this.doc,"load",oniframeload);
        
      }
      
    }