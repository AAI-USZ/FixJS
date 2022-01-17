function() {

      self.saved.css = [];
      
      if (!self.ispage || (!self.cantouch && !self.isieold)) {
      
        var cont = self.docscroll;
        if (self.ispage) cont = (self.haswrapper)?self.win:self.doc;
        self.css(cont,{'overflow-y':'hidden'});
      
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
        rail.width = 1+Math.max(parseFloat(self.opt.cursorwidth),cursor.outerWidth());
        rail.css({"padding-left":"0px","padding-right":"1px",width:rail.width+"px",'zIndex':(self.ispage)?self.opt.zindex:self.opt.zindex+2,"background":self.opt.background});
        
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
        
//        if (self.ie10touch) self.opt.touchbehavior = true; // fix for IE10 & WP7
        
        if (self.cantouch||self.opt.touchbehavior) {
          self.scrollmom = {
            y:new ScrollMomentumClass(self)
          };
        
          self.onmousedown = function(e) {
            if (!self.locked) {
              self.cancelScroll();
              self.rail.drag = {x:e.clientX,y:e.clientY,sx:self.scroll.x,sy:self.scroll.y,st:self.getScrollTop()};
              self.hasmoving = false;
              self.lastmouseup = false;
              self.scrollmom.y.reset(e.clientY);
              if (!self.cantouch) return self.cancelEvent(e);
            }
          };
          self.onmouseup = function(e) {
            if (self.rail.drag) {            
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

          self.onclick = (self.isios) ? false : function(e) { 
            if (self.lastmouseup) {
              self.lastmouseup = false;
              return self.cancelEvent(e);
            } else {
              return true;
            }
          }; 
          
          self.onmousemove = function(e) {
            if (self.rail.drag) {
              if (self.cantouch&&(typeof e.original == "undefined")) return true;  // prevent ios "ghost" events by clickable elements
            
              self.hasmoving = true;
              var my = (e.clientY-self.rail.drag.y);

              var fy = e.clientY;
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
              
              if (self.prepareTransition) self.prepareTransition(0);
              self.setScrollTop(ny);

              self.showCursor(ny);

              self.scrollmom.y.update(fy);
              
              return self.cancelEvent(e);
            }
          };
          
          if (self.cursorgrabvalue) {
            self.css((self.ispage)?self.doc:self.win,{'cursor':self.cursorgrabvalue});            
            self.css(self.rail,{'cursor':self.cursorgrabvalue});
          }
        } else {
          self.onmousedown = function(e) {
            if (self.locked) return self.cancelEvent(e);
            self.cancelScroll();
            self.rail.drag = {x:e.pageX,y:e.clientY,sx:self.scroll.x,sy:self.scroll.y};
            return self.cancelEvent(e);
          };
          self.onmouseup = function(e) {
            if (self.rail.drag) {
              self.rail.drag = false;
              return self.cancelEvent(e);
            }
          };        
          self.onmousemove = function(e) {
            if (self.rail.drag) {
              self.scroll.y = self.rail.drag.sy + (e.clientY-self.rail.drag.y);
              if (self.scroll.y<0) self.scroll.y=0;
              var my = self.scrollvaluemax;
              if (self.scroll.y>my) self.scroll.y=my;
              self.showCursor();
              self.cursorfreezed = true;
              self.doScroll(Math.round(self.scroll.y*self.scrollratio.y));          
              return self.cancelEvent(e);
            } else {
              self.checkarea = true;
            }
          };
        }

        if (self.cantouch||self.opt.touchbehavior) {
/*        
          if (self.isios) {  // avoid click grey fx & scroll stuck
            self.bind(document,"mousedown",function(e){
              if (self.hasParent(e,self.iddoc)) self.onmousedown(e);
            });            
          } else {
*/          
            self.bind(self.win,"mousedown",self.onmousedown);
//          }
        }
        
        self.bind(self.cursor,"mousedown",self.onmousedown);          
        self.bind(self.cursor,"mouseup",function(e) {
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
        
/* DISABLED - No cross-browser implementation 
        if (!self.ispage&&!self.haswrapper) {
          self.bind(self.win,(self.isie&&!self.isie9)?"propertychange":"DOMAttrModified",self.onAttributeChange);
        }
*/        

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