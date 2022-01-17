function(){if(typeof this.container.value!=="undefined")
return this.container.value;else
return this.container.innerHTML;},enable:function(){this.container.setAttribute("tabindex","1");joControl.prototype.enable.call(this);},disable:function(){this.container.removeAttribute("tabindex");joControl.prototype.disable.call(this);}