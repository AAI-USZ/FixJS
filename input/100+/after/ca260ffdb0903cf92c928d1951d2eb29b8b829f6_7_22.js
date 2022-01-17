function(){var html="";var length=0;if(typeof this.data==='undefined'||!this.data||!this.data.length){if(this.defaultMessage)
this.container.innerHTML=this.defaultMessage;return;}
for(var i=0,l=this.data.length;i<l;i++){var element=this.formatItem(this.data[i],i,length);if(!element)
continue;if(typeof element==="string")
html+=element;else
this.container.appendChild((element instanceof joView)?element.container:element);++length;}
if(html.length)
this.container.innerHTML=html;if(this.value>=0)
this.setValue(this.value,true);return;}