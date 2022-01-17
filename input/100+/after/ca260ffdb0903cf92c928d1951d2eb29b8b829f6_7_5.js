function(e){e.preventDefault();},block:function(e){if(window.event)
e=window.event;if(typeof e.target=='undefined')
e.target=e.srcElement;switch(e.target.nodeName.toLowerCase()){case'input':case'textarea':return true;default:return false;}}};joSubject=function(subject){this.subscriptions=[];this.subject=subject;};joSubject.prototype={