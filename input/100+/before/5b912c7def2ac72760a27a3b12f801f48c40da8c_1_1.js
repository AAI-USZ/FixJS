function(b){var N=0,H=0,O=0,E=0,B="ontouchstart"in window,aa="onorientationchange"in window,I=!1,X=!1,Y=!1,P="pointer",T="pointer",Q=[],M=[],Z=[],U=[],R=[],n=[],f={showScrollbar:function(j,a){j.scrollbarHide&&b("."+a).css({opacity:j.scrollbarOpacity,filter:"alpha(opacity:"+100*j.scrollbarOpacity+")"})},hideScrollbar:function(b,a,c,d,e,g,D,s,q,i){if(b.scrollbar&&b.scrollbarHide)for(var k=c;k<c+25;k++)a[a.length]=f.hideScrollbarIntervalTimer(10*k,d[c],(c+24-k)/24,e,g,D,s,q,i,b)},hideScrollbarInterval:function(j, a,c,d,e,g,D,s,q){E=-1*j/c*(g-D-s-e);f.setSliderOffset("."+d,E);b("."+d).css({opacity:q.scrollbarOpacity*a,filter:"alpha(opacity:"+100*q.scrollbarOpacity*a+")"})},slowScrollHorizontalInterval:function(j,a,c,d,e,g,D,s,q,i,k,m,y,x,o,l){newChildOffset=f.calcActiveOffset(l,a,0,k,c,g,y,i);newChildOffset!=n[o]&&""!=l.onSlideChange&&(n[o]=newChildOffset,l.onSlideChange(new f.args(l,j,b(j).children(":eq("+i+")"),i%y)));a=Math.floor(a);f.setSliderOffset(j,a);l.scrollbar&&(E=Math.floor(-1*a/c*(D-s-e)),j=e-q, 0<=a?(j=e-q- -1*E,f.setSliderOffset(b("."+d),0)):(a<=-1*c+1&&(j=D-s-q-E),f.setSliderOffset(b("."+d),E)),b("."+d).css({width:j+"px"}))},slowScrollHorizontal:function(j,a,c,d,e,g,D,s,q,i,k,m,y,x,o,l,w){var g=[],h=f.getSliderOffset(j,"x"),t=0,r=25/1024*s;frictionCoefficient=w.frictionCoefficient;elasticFrictionCoefficient=w.elasticFrictionCoefficient;snapFrictionCoefficient=w.snapFrictionCoefficient;snapToChildren=w.snapToChildren;5<e&&snapToChildren?t=1:-5>e&&snapToChildren&&(t=-1);e<-1*r?e=-1*r:e> r&&(e=r);var v=f.getAnimationSteps(w,e,h,c,0,m),r=f.calcActiveOffset(w,v[v.length-1],t,m,c,s,x,n[y]);w.infiniteSlider&&(m[r]>m[l+1]+s&&(r+=l),m[r]<m[2*l-1]-s&&(r-=l));if(v[v.length-1]<m[r]&&0>t||v[v.length-1]>m[r]&&0<t||!snapToChildren)for(;1<e||-1>e;){e*=frictionCoefficient;h+=e;if(0<h||h<-1*c)e*=elasticFrictionCoefficient,h+=e;g[g.length]=h}if(snapToChildren||0<h||h<-1*c){for(;h<m[r]-0.5||h>m[r]+0.5;)h=(h-m[r])*snapFrictionCoefficient+m[r],g[g.length]=h;g[g.length]=m[r]}e=1;0!=g.length%2&&(e=0); w.infiniteSlider&&(r=r%l+l);for(h=0;h<a.length;h++)clearTimeout(a[h]);t=0;for(h=e;h<g.length;h+=2)if(w.infiniteSlider&&g[h]<m[2*l]+s&&(g[h]-=m[l]),h==e||1<Math.abs(g[h]-t)||h>=g.length-2)t=g[h],a[a.length]=f.slowScrollHorizontalIntervalTimer(10*h,j,g[h],c,d,D,s,q,i,k,r,m,o,x,l,y,w);a[a.length]=f.onSlideCompleteTimer(10*(h+1),w,j,b(j).children(":eq("+r+")"),r%x,y);R[y]=a;f.hideScrollbar(w,a,h,g,c,d,D,s,i,k)},onSlideComplete:function(j,a,c,d,e){if(Q[e]!=d)j.onSlideComplete(new f.args(j,b(a),c,d));Q[e]= d},getSliderOffset:function(j,a){var c=0,a="x"==a?4:5;B||I?(c=b(j).css("-webkit-transform").split(","),c=parseInt(c[a],10)):c=parseInt(b(j).css("left"),10);return c},setSliderOffset:function(j,a){B||I?b(j).css({webkitTransform:"translateX("+a+"px)"}):b(j).css({left:a+"px"})},setBrowserInfo:function(){null!=navigator.userAgent.match("WebKit")?(I=!0,P="-webkit-grab",T="-webkit-grabbing"):null!=navigator.userAgent.match("Gecko")?(P="move",T="-moz-grabbing"):null!=navigator.userAgent.match("MSIE 7")? X=!0:null!=navigator.userAgent.match("MSIE 8")?Y=!0:navigator.userAgent.match("MSIE 9")},getAnimationSteps:function(b,a,c,d,e){var g=[];for(1>=a&&0<=a?a=-2:-1<=a&&0>=a&&(a=2);1<a||-1>a;){a*=b.frictionCoefficient;c+=a;if(c>e||c<-1*d)a*=b.elasticFrictionCoefficient,c+=a;g[g.length]=c}activeChildOffset=0;return g},calcActiveOffset:function(b,a,c,d,e,g,f,s){for(var q=!1,b=[],i,e=0;e<d.length;e++)d[e]<=a&&d[e]>a-g&&(!q&&d[e]!=a&&(b[b.length]=d[e-1]),b[b.length]=d[e],q=!0);0==b.length&&(b[0]=d[d.length- 1]);for(e=q=0;e<b.length;e++){var k=Math.abs(a-b[e]);k<g&&(q=b[e],g=k)}for(e=0;e<d.length;e++)q==d[e]&&(i=e);0>c&&i%f==s%f?(i=s+1,i>=d.length&&(i=d.length-1)):0<c&&i%f==s%f&&(i=s-1,0>i&&(i=0));return i},changeSlide:function(j,a,c,d,e,g,n,s,q,i,k,m,y,x,o,l){f.autoSlidePause(m);for(var w=0;w<c.length;w++)clearTimeout(c[w]);var h=Math.ceil(l.autoSlideTransTimer/10)+1,t=f.getSliderOffset(a,"x");l.infiniteSlider&&t>k[o+1]+n&&j==2*o-2&&(t-=x);var w=k[j]-t,r=[],v;f.showScrollbar(l,e);for(var p=0;p<=h;p++)v= p,v/=h,v--,v=t+w*(Math.pow(v,5)+1),l.infiniteSlider&&(v>k[o+1]+n&&(v-=x),v<k[2*o-1]-n&&(v+=x)),r[r.length]=v;l.infiniteSlider&&(j=j%o+o);for(p=h=0;p<r.length;p++)if(l.infiniteSlider&&r[p]<k[2*o]+n&&(r[p]-=k[o]),0==p||1<Math.abs(r[p]-h)||p>=r.length-2)h=r[p],c[p]=f.slowScrollHorizontalIntervalTimer(10*(p+1),a,r[p],d,e,g,n,s,q,i,j,k,x,y,o,m,l);0!=w&&(c[c.length]=f.onSlideCompleteTimer(10*(p+1),l,a,b(a).children(":eq("+j+")"),j%y,m));R[m]=c;f.hideScrollbar(l,c,p,r,d,e,g,n,q,i);f.autoSlide(a,c,d,e,g, n,s,q,i,k,m,y,x,o,l);return j},autoSlide:function(b,a,c,d,e,g,D,s,q,i,k,m,y,x,o){if(!o.autoSlide)return!1;f.autoSlidePause(k);M[k]=setTimeout(function(){!o.infiniteSlider&&n[k]>i.length-1&&(n[k]-=x);n[k]=f.changeSlide(o.infiniteSlider?n[k]+1:(n[k]+1)%x,b,a,c,d,e,g,D,s,q,i,k,m,y,x,o);f.autoSlide(b,a,c,d,e,g,D,s,q,i,k,m,y,x,o)},o.autoSlideTimer+o.autoSlideTransTimer)},autoSlidePause:function(b){clearTimeout(M[b])},slowScrollHorizontalIntervalTimer:function(b,a,c,d,e,g,n,s,q,i,k,m,y,x,o,l,w){return setTimeout(function(){f.slowScrollHorizontalInterval(a, c,d,e,g,n,s,q,i,k,m,y,x,o,l,w)},b)},onSlideCompleteTimer:function(b,a,c,d,e,g){return setTimeout(function(){f.onSlideComplete(a,c,d,e,g)},b)},hideScrollbarIntervalTimer:function(b,a,c,d,e,g,n,s,q,i){return setTimeout(function(){f.hideScrollbarInterval(a,c,d,e,g,n,s,q,i)},b)},args:function(b,a,f,d){this.settings=b;this.sliderObject=a;this.currentSlideObject=f;this.currentSlideNumber=d},preventDrag:function(b){b.preventDefault()},preventClick:function(b){b.stopImmediatePropagation();return!1},enableClick:function(){return!0}}; f.setBrowserInfo();var L={init:function(j){var a=b.extend({elasticPullResistance:0.6,frictionCoefficient:0.92,elasticFrictionCoefficient:0.6,snapFrictionCoefficient:0.92,snapToChildren:!1,startAtSlide:1,scrollbar:!1,scrollbarHide:!0,scrollbarLocation:"top",scrollbarContainer:"",scrollbarOpacity:0.4,scrollbarHeight:"4px",scrollbarBorder:"0",scrollbarMargin:"5px",scrollbarBackground:"#000",scrollbarBorderRadius:"100px",scrollbarShadow:"0 0 0 #000",desktopClickDrag:!1,responsiveSlideWidth:!0,navSlideSelector:"", navPrevSelector:"",navNextSelector:"",autoSlideToggleSelector:"",autoSlide:!1,autoSlideTimer:5E3,autoSlideTransTimer:750,infiniteSlider:!1,onSliderLoaded:function(){},onSlideChange:"",onSlideComplete:function(){}},j);return this.each(function(){function c(){f.autoSlidePause(d);b(o).css("width","");b(o).css("height","");b(V).css("width","");g=0;p=[];y=b(o).parent().width();l=b(o).outerWidth(!0);a.responsiveSlideWidth&&(l=b(o).outerWidth(!0)>y?y:b(o).outerWidth(!0));b(o).css({position:"relative",top:"0", left:"0",overflow:"hidden",zIndex:1,width:l});a.responsiveSlideWidth&&b(V).each(function(){var a=b(this).outerWidth(!0),a=a>l?l+-1*(b(this).outerWidth(!0)-b(this).width()):b(this).width();b(this).css({width:a})});b(u).children().each(function(a){b(this).css({"float":"left"});p[a]=-1*g;g+=b(this).outerWidth(!0)});for(var c=0;c<p.length&&!(p[c]<=-1*(g-l));c++)M=c;p.splice(M+1,p.length);p[p.length]=-1*(g-l);g-=l;b(u).css({webkitPerspective:1E3,webkitBackfaceVisibility:"hidden",position:"relative",cursor:P, width:g+l+"px",overflow:"hidden"});x=b(o).parent().height();w=b(o).height();a.responsiveSlideWidth&&(w=b(o).height()>x?x:b(o).height());b(o).css({height:w});f.setSliderOffset(u,p[n[d]]);if(0>=g)return b(u).css({cursor:"default"}),!1;!B&&!a.desktopClickDrag&&b(u).css({cursor:"default"});a.scrollbar&&(b("."+q).css({margin:a.scrollbarMargin,overflow:"hidden",display:"none"}),b("."+q+" ."+i).css({border:a.scrollbarBorder}),h=parseInt(b("."+q).css("marginLeft"))+parseInt(b("."+q).css("marginRight")),t= parseInt(b("."+q+" ."+i).css("borderLeftWidth"),10)+parseInt(b("."+q+" ."+i).css("borderRightWidth"),10),k=""!=a.scrollbarContainer?b(a.scrollbarContainer).width():l,m=(k-h)/z,a.scrollbarHide||(I=a.scrollbarOpacity),b("."+q).css({position:"absolute",left:0,width:k-h+"px",margin:a.scrollbarMargin}),"top"==a.scrollbarLocation?b("."+q).css("top","0"):b("."+q).css("bottom","0"),b("."+q+" ."+i).css({borderRadius:a.scrollbarBorderRadius,background:a.scrollbarBackground,height:a.scrollbarHeight,width:m- t+"px",minWidth:a.scrollbarHeight,border:a.scrollbarBorder,webkitPerspective:1E3,webkitBackfaceVisibility:"hidden",webkitTransform:"translateX("+Math.floor(-1*p[n[d]]/g*(k-h-m))+"px)",opacity:I,filter:"alpha(opacity:"+100*I+")",boxShadow:a.scrollbarShadow}),b("."+q).css({display:"block"}),B||b("."+i).css({position:"relative",left:Math.floor(-1*p[n[d]]/g*(k-h-m))}));a.infiniteSlider&&(C=(g+l)/3);""!=a.navSlideSelector&&b(a.navSlideSelector).each(function(c){b(this).css({cursor:"pointer"});b(this).unbind("click.iosSliderEvent").bind("click.iosSliderEvent", function(){var b=c;a.infiniteSlider&&(b=c+A);n[d]=f.changeSlide(b,u,e,g,i,m,l,k,h,t,p,d,A,C,z,a)})});""!=a.navPrevSelector&&(b(a.navPrevSelector).css({cursor:"pointer"}),b(a.navPrevSelector).unbind("click.iosSliderEvent").bind("click.iosSliderEvent",function(){if(n[d]>0||a.infiniteSlider)n[d]=f.changeSlide(n[d]-1,u,e,g,i,m,l,k,h,t,p,d,A,C,z,a)}));""!=a.navNextSelector&&(b(a.navNextSelector).css({cursor:"pointer"}),b(a.navNextSelector).unbind("click.iosSliderEvent").bind("click.iosSliderEvent",function(){if(n[d]< p.length-1||a.infiniteSlider)n[d]=f.changeSlide(n[d]+1,u,e,g,i,m,l,k,h,t,p,d,A,C,z,a)}));a.autoSlide&&((""!=a.autoSlideToggleSelector&&(b(a.autoSlideToggleSelector).css({cursor:"pointer"}),b(a.autoSlideToggleSelector).unbind("click.iosSliderEvent").bind("click.iosSliderEvent",function(){if(K){f.autoSlide(u,e,g,i,m,l,k,h,t,p,d,A,C,z,a);K=false;b(a.autoSlideToggleSelector).removeClass("on")}else{f.autoSlidePause(d);K=true;b(a.autoSlideToggleSelector).addClass("on")}})),K||f.autoSlide(u,e,g,i,m,l,k, h,t,p,d,A,C,z,a),B)?b(o).bind("touchend.iosSliderEvent",function(){K||f.autoSlide(u,e,g,i,m,l,k,h,t,p,d,A,C,z,a)}):(b(o).bind("mouseenter.iosSliderEvent",function(){f.autoSlidePause(d)}),b(o).bind("mouseleave.iosSliderEvent",function(){K||f.autoSlide(u,e,g,i,m,l,k,h,t,p,d,A,C,z,a)})));b(o).data("iosslider",{obj:$,settings:a,scrollerNode:u,numberOfSlides:z,sliderNumber:d,childrenOffsets:p,sliderMax:g,scrollbarClass:i,scrollbarWidth:m,scrollbarStageWidth:k,stageWidth:l,scrollMargin:h,scrollBorder:t, infiniteSliderOffset:A,infiniteSliderWidth:C});return!0}N++;var d=N,e=[];Z[d]=a;var g,j=[0,0],s=[0,0],q="scrollbarBlock"+N,i="scrollbar"+N,k,m,y,x,o=b(this),l,w,h,t,r;n[d]=a.startAtSlide-1;var v=-1,p,I=0,F=0,L=0,u=b(this).children(":first-child"),V,z=b(u).children().size(),J=!1,M=0,W=!1,S=void 0,C,A=z;Q[d]=-1;var K=!1;U[d]=!1;R[d]=[];var $=b(this);if(void 0!=$.data("iosslider"))return!0;a.infiniteSlider&&(a.scrollbar=!1,b(u).children().clone(!0,!0).prependTo(u).clone(!0,!0).appendTo(u),A=z);V=b(u).children(); a.scrollbar&&(""!=a.scrollbarContainer?b(a.scrollbarContainer).append("<div class = '"+q+"'><div class = '"+i+"'></div></div>"):b(u).parent().append("<div class = '"+q+"'><div class = '"+i+"'></div></div>"));if(!c())return!0;a.infiniteSlider&&(n[d]+=A,f.setSliderOffset(u,p[n[d]]));b(this).find("a").bind("mousedown",f.preventDrag);b(this).find("[onclick]").bind("click",f.preventDrag).each(function(){b(this).data("onclick",this.onclick)});a.onSliderLoaded(new f.args(a,u,b(u).children(":eq("+n[d]+")"), n[d]%A));Q[d]=n[d]%A;if(Z[d].responsiveSlideWidth){var G=aa?"orientationchange":"resize";b(window).bind(G+".iosSliderEvent",function(){if(!c())return true})}if(B||a.desktopClickDrag)if(G=B?"touchstart.iosSliderEvent":"mousedown.iosSliderEvent",b(u).bind(G,function(c){f.autoSlidePause(d);if(B){eventX=event.touches[0].pageX;eventY=event.touches[0].pageY}else{window.getSelection?window.getSelection().empty?window.getSelection().empty():window.getSelection().removeAllRanges&&window.getSelection().removeAllRanges(): document.selection&&document.selection.empty();eventX=c.pageX;eventY=c.pageY;W=true;S=this;b(this).css({cursor:T})}j=[0,0];s=[0,0];H=0;J=false;for(c=0;c<e.length;c++)clearTimeout(e[c]);c=f.getSliderOffset(this,"x");a.infiniteSlider&&n[d]%z==0&&b(this).children().each(function(a){a%z==0&&a!=n[d]&&b(this).replaceWith(function(){return b(u).children(":eq("+n[d]+")").clone(true)})});if(c>0){f.setSliderOffset(this,0);b("."+i).css({width:m-t+"px"})}else if(c<g*-1){c=g*-1;f.setSliderOffset(this,c);f.setSliderOffset(b("."+ i),k-h-m);b("."+i).css({width:m-t+"px"})}F=(f.getSliderOffset(this,"x")-eventX)*-1;f.getSliderOffset(this,"y");j[1]=eventX;s[1]=eventY}),G=B?"touchmove.iosSliderEvent":"mousemove.iosSliderEvent",b(u).bind(G,function(c){var e=0;B||(window.getSelection?window.getSelection().empty?window.getSelection().empty():window.getSelection().removeAllRanges&&window.getSelection().removeAllRanges():document.selection&&document.selection.empty());if(B){eventX=event.touches[0].pageX;eventY=event.touches[0].pageY}else{eventX= c.pageX;eventY=c.pageY;if(!W)return false}if(a.infiniteSlider){f.getSliderOffset(this,"x")>p[z+1]+l&&(F=F+C);f.getSliderOffset(this,"x")<p[z*2-1]-l&&(F=F-C)}j[0]=j[1];j[1]=eventX;H=(j[1]-j[0])/2;s[0]=s[1];s[1]=eventY;O=(s[1]-s[0])/2;if((H>5||H<-5)&&B){event.preventDefault();J=true}else B||(J=true);if(J){c=f.getSliderOffset(this,"x");if(B){L!=event.touches.length&&(F=c*-1+eventX);L=event.touches.length}elasticPullResistance=a.elasticPullResistance;c>0&&(e=(F-eventX)*elasticPullResistance);c<g*-1&& (e=(g+(F-eventX)*-1)*elasticPullResistance*-1);f.setSliderOffset(this,(F-eventX-e)*-1);if(a.scrollbar){f.showScrollbar(a,i);E=Math.floor((F-eventX-e)/g*(k-h-m));var o=m;if(c>=0){o=m-t-E*-1;f.setSliderOffset(b("."+i),0);b("."+i).css({width:o+"px"})}else if(c<=g*-1+1){o=k-h-t-E;f.setSliderOffset(b("."+i),E);b("."+i).css({width:o+"px"})}else f.setSliderOffset(b("."+i),E)}if(B)r=event.touches[0].pageX}v=f.calcActiveOffset(a,(F-eventX-e)*-1,0,p,g,l,A,void 0);if(v!=n[d]&&a.onSlideChange!=""){n[d]=v;a.onSlideChange(new f.args(a, this,b(this).children(":eq("+v+")"),v%A))}}),b(u).bind("touchend.iosSliderEvent",function(){if(event.touches.length!=0)for(var b=0;b<sizeof(event.touches.length);b++)event.touches[b].pageX==r&&f.slowScrollHorizontal(this,e,g,i,H,O,m,l,k,h,t,p,d,A,C,z,a);else f.slowScrollHorizontal(this,e,g,i,H,O,m,l,k,h,t,p,d,A,C,z,a)}),!B){G=b(window);if(Y||X)G=b(document);b(G).bind("mouseup.iosSliderEvent",function(){J?b(u).children(":eq("+n[d]+")").find("a").unbind("click.disableClick").bind("click.disableClick", f.preventClick):b(u).children(":eq("+n[d]+")").find("a").unbind("click.disableClick").bind("click.disableClick",f.enableClick);b(u).children(":eq("+n[d]+")").find("[onclick]").each(function(){this.onclick=function(a){if(J)return false;b(this).data("onclick").call(this,a||window.event)}});b(u).children(":eq("+n[d]+")").find("*").each(function(){var a=b(this).data("events");if(a!=void 0&&a.click[0].namespace!="iosSliderEvent"){if(!J)return false;b(this).one("click.disableClick",f.preventClick);var a= b(this).data("events").click,c=a.pop();a.splice(0,0,c)}});if(!U[d]){b(u).css({cursor:P});W=false;if(S==void 0)return false;f.slowScrollHorizontal(S,e,g,i,H,O,m,l,k,h,t,p,d,A,C,z,a);S=void 0}})}})},destroy:function(j){return this.each(function(){var a=b(this),c=a.data("iosslider");if(void 0==c)return!1;void 0==j&&(j=!0);f.autoSlidePause(c.sliderNumber);U[c.sliderNumber]=!0;b(window).unbind(".iosSliderEvent");b(this).unbind(".iosSliderEvent");b(this).children(":first-child").unbind(".iosSliderEvent"); b(this).children(":first-child").children().unbind(".iosSliderEvent");j&&(b(this).attr("style",""),b(this).children(":first-child").attr("style",""),b(this).children(":first-child").children().attr("style",""),b(c.settings.navSlideSelector).attr("style",""),b(c.settings.navPrevSelector).attr("style",""),b(c.settings.navNextSelector).attr("style",""),b(c.settings.autoSlideToggleSelector).attr("style",""));c.settings.infiniteSlider&&(b(this).children(":first-child").html(),b(this).children(":first-child").html(b(this).children(":first-child").children(":nth-child(-n+"+ c.numberOfSlides+")").clone(!0)));a.removeData("iosslider")})},goToSlide:function(j){return this.each(function(){var a=b(this).data("iosslider");if(void 0==a)return!1;j=(j-1)%a.numberOfSlides;a.settings.infiniteSlider&&(j+=a.infiniteSliderOffset);f.changeSlide(j,b(a.scrollerNode),R[a.sliderNumber],a.sliderMax,a.scrollbarClass,a.scrollbarWidth,a.stageWidth,a.scrollbarStageWidth,a.scrollMargin,a.scrollBorder,a.childrenOffsets,a.sliderNumber,a.infiniteSliderOffset,a.infiniteSliderWidth,a.numberOfSlides, a.settings);n[a.sliderNumber]=j})}};b.fn.iosSlider=function(f){if(L[f])return L[f].apply(this,Array.prototype.slice.call(arguments,1));if("object"===typeof f||!f)return L.init.apply(this,arguments);b.error("invalid method call!")}}