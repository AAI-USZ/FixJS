function(h){var c=40,a=13,e=27,g=9,b=38,f=39;var d=function(i){d.superclass.constructor.apply(this,arguments);};d.NAME="Navigation";d.ATTRS={node:{setter:function(i){var j=h.one(i);if(!j){}return j;}}};h.extend(d,h.Base,{container:{containerId:null,children:[],childIndexInFocus:-1},initializer:function(i){var j=this.get("node");if(j){this.registerNavigableContainer(j);}},destructor:function(){delete this.anim;},animateScroll:function(i){this.anim=new h.Anim({node:"window",from:{scroll:[h.DOM.docScrollX(),h.DOM.docScrollY()]},to:{scroll:[h.DOM.docScrollX(),i]},duration:0.5,easing:h.Easing.easeOutStrong}).run();},scrollToCenter:function(k){var m=k.getY();var i=k.get("clientHeight");var n=i/2;var j=k.get("winHeight");if(i>j){n=0;}var l=j/2;if(m>l){if(this.anim&&this.anim.get("running")){this.anim.pause();}this.animateScroll(m-l+n);}},getNextIndex:function(k){var i=this.container,j=i.children.length;if(k!=-1){i.children[k].removeClass("highlight");}if(k===j-1){k=-1;this.wasChildLast=true;}else{this.wasChildLast=false;}k++;return k;},getPreviousIndex:function(k){var i=this.container,j=i.children.length;if(k>=0){i.children[k].removeClass("highlight");}if(k===0){k=j;}k--;if(k<0){k=0;}return k;},bringChildtoFocus:function(i){i.addClass("highlight").focus();if(this.wasChildLast){if(this.anim&&this.anim.get("running")){this.anim.pause();}i.scrollIntoView();}this.scrollToCenter(i);},onMyKeyDown:function(k){this.wasChildLast=false;k.preventDefault();var i=this.container,j=i.children.length,m=i.childIndexInFocus,l=this.getNextIndex(m);this.bringChildtoFocus(i.children[l]);i.childIndexInFocus=l;},onMyKeyUp:function(k){k.preventDefault();var i=this.container,j=i.children.length,l=i.childIndexInFocus;newindex=this.getPreviousIndex(l);this.bringChildtoFocus(i.children[newindex]);i.childIndexInFocus=newindex;},initiateNavigation:function(){h.on("keypress",h.bind(function(i){if(i.keyCode===39){i.halt();alert("right key pressed");}}));h.one("body").on("down",h.bind(this.onMyKeyDown,this));h.one("body").on("up",h.bind(this.onMyKeyUp,this));},registerNavigableContainer:function(k){var j=k.all("> *");var i=[];j.each(function(n,l,m){i[l]=n;});this.container.children=i;this.container.containerId=k.generateID();return this.container;},splash:function(j){if(j){}try{}catch(i){}}});h.Nav=d;},"@VERSION@",{requires:["node","event","event-key","gallery-event-nav-keys","base","anim"],skinnable:false}