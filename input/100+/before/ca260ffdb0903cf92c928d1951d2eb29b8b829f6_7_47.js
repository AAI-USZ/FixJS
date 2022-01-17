function(e){joEvent.stop(e);this.blur();},draw:function(){if(!this.container)
return;if(!this.container.firstChild){this.button=joDOM.create("div");this.container.appendChild(this.button);}
this.button.innerHTML=this.labels[(this.data)?1:0];if(this.data)
joDOM.addCSSClass(this.container,"on");else
joDOM.removeCSSClass(this.container,"on");}});joSlider=function(value){this.min=0;this.max=1;this.snap=0;this.range=1;this.thumb=null;this.horizontal=1;this.vertical=0;this.moved=false;this.jump=true;joControl.call(this,null,value);};joSlider.extend(joControl,{