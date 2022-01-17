function(title,msg,options,context){var buttons=[];var callback;var context=(typeof context==='object')?context:null;if(typeof options==='object'){if(options instanceof Array){for(var i=0;i<options.length;i++)
addbutton(options[i]);}
else{addbutton(options);}}
else if(typeof options==='string'){addbutton({label:options});}
else{if(typeof options==='function')
callback=options;addbutton();}
var view=[new joTitle(title),new joHTML(msg),buttons];this.showPopup(view);var self=this;function addbutton(options){if(!options)
var options={label:'OK'};var button=new joButton(options.label);button.selectEvent.subscribe(function(){if(options.action)
options.action.call(options.context);defaultaction();},options.context||self);buttons.push(button);}
function defaultaction(){self.hidePopup();if(callback){if(context)
callback.call(context);else
callback();}}}});joShim=function(){this.showEvent=new joSubject(this);this.hideEvent=new joSubject(this);this.selectEvent=new joSubject(this);joContainer.apply(this,arguments);};joShim.extend(joContainer,{tagName:"joshim",setEvents:function(){joEvent.on(this.container,"mousedown",this.onMouseDown,this);},onMouseDown:function(e){joEvent.stop(e);this.hide();},hide:function(){this.container.className='';joEvent.on(this.container,"webkitTransitionEnd",this.onHide,this);}