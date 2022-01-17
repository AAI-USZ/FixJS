function(){this.push(this.data);}});joControl=function(data,value){this.selectEvent=new joSubject(this);this.enabled=true;this.value=null;if(typeof value!=="undefined"&&value!==null){if(value instanceof joDataSource)
this.setValueSource(value);else
this.value=value;}
if(typeof data!=="undefined"&&data instanceof joDataSource){joView.call(this);this.setDataSource(data);}
else{joView.apply(this,arguments);}};joControl.extend(joView,{tagName:"jocontrol",setEvents:function(){joEvent.capture(this.container,"click",this.onMouseDown,this);joEvent.on(this.container,"blur",this.onBlur,this);joEvent.on(this.container,"focus",this.onFocus,this);},onMouseDown:function(e){this.select(e);}