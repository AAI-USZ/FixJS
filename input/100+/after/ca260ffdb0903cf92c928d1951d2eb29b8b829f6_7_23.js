function(){if(typeof this.container=='undefined'||!this.container['childNodes'])
return;var node=this.getNode(this.value);if(node){if(this.lastNode){joDOM.removeCSSClass(this.lastNode,"selected");this.value=null;}}
return this;}