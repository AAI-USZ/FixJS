function(e){if(!e)
e=window.event;if(e.keyCode==27){joEvent.stop(e);joEvent.preventDefault(e);}
else if(e.keyCode==13&&joFocus.get()instanceof joInput){joEvent.stop(e);}
else if(e.keyCode==18){this.altkey=true;}
return;}};joGroup=function(data){joContainer.apply(this,arguments);};joGroup.extend(joContainer,{tagName:"jogroup"});joHTML=function(data){joControl.apply(this,arguments);};joHTML.extend(joControl,{tagName:"johtml",setEvents:function(){joEvent.on(this.container,"click",this.onClick,this);}