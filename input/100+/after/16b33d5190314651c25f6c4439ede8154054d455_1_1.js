fj.body.appendChild(b);a=b.offsetWidth-b.clientWidth;j.body.removeChild(b);return a};m=function(){function b(a,c){this.el=a;this.options=c;i||(i=o());this.$el=d(this.el);this.doc=d(j);this.win=d(h);this.generate();this.createEvents();this.addEvents();this.reset()}b.prototype.preventScrolling=function(a,c){this.isActive&&("DOMMouseScroll"===a.type?("down"===c&&0<a.originalEvent.detail||"up"===c&&0>a.originalEvent.detail)&&a.preventDefault():"mousewheel"===a.type&&a.originalEvent&&a.originalEvent.wheelDelta&&