function f(){VMM.DragSlider.cancelSlide();if(l.nav.multiplier.current<l.nav.multiplier.max){l.nav.multiplier.current=l.nav.multiplier.current>4?l.nav.multiplier.current>16?Math.round(l.nav.multiplier.current+10):Math.round(l.nav.multiplier.current+4):Math.round(l.nav.multiplier.current+1);if(l.nav.multiplier.current>=l.nav.multiplier.max)l.nav.multiplier.current=
l.nav.multiplier.max;fa()}}function j(){VMM.DragSlider.cancelSlide();V(0);VMM.fireEvent(r,"UPDATE")}function g(a){VMM.DragSlider.cancelSlide();V(a.data.number);VMM.fireEvent(r,"UPDATE")}function h(a){VMM.Lib.toggleClass(a.data.elem,"zFront")}function n(a,b){VMM.Lib.animate(E,b.time/2,l.ease,{left:b.left})}trace("VMM.Timeline.TimeNav");var o={},r=a,m=[],w=[],k=[],z=[],y=[],s,q=[],t="",i="",p="",C=0,x=false,u={type:"year",number:10,first:1970,last:2011,multiplier:100,classname:"_idd",interval_type:"interval"}