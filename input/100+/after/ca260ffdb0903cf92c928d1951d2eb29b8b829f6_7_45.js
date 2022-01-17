function(){if(!this.stack)
return this;joDOM.removeCSSClass(this.back,'selected');joDOM.removeCSSClass(this.back,'focus');if(this.stack.data.length>1)
joDOM.addCSSClass(this.back,'active');else
joDOM.removeCSSClass(this.back,'active');var title=this.stack.getTitle();if(typeof title==='string')
this.titlebar.setData(title);else
this.titlebar.setData(this.firstTitle);return this;},setTitle:function(title){this.titlebar.setData(title);this.firstTitle=title;return this;}});joBackButton=function(){joButton.apply(this,arguments);};joBackButton.extend(joButton,{tagName:"jobackbutton"});joSelect=function(data,value){