function(){},setToggleEvent:function(){joEvent.on(this.container.childNodes[0],"click",this.toggle,this);},toggle:function(){if(this.container.className.indexOf("open")>=0)
return this.close();else
return this.open();},open:function(){joDOM.addCSSClass(this.container,"open");this.openEvent.fire();return this;},close:function(){joDOM.removeCSSClass(this.container,"open");this.closeEvent.fire();return this;}});joExpandoContent=function(){joContainer.apply(this,arguments);};joExpandoContent.extend(joContainer,{tagName:"joexpandocontent"});joExpandoTitle=function(data){joControl.apply(this,arguments);};joExpandoTitle.extend(joControl,{tagName:"joexpandotitle",setData:function(){joView.prototype.setData.apply(this,arguments);this.draw();return this;}