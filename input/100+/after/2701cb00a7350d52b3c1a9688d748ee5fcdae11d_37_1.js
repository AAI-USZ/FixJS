function(b,a){if(i=a.form)e=!1,f=[],d.fromSubmit&&(e=a)}).bind("invalid",function(a){-1==f.indexOf(a.target)?f.push(a.target):a.stopImmediatePropagation()}).bind("lastinvalid",function(b,c){var l=c.invalidlist[0];l&&(m||a.nodeName(l,"select"))&&a(l).not(":focus")&&e&&!e.isInvalidUIPrevented()&&d.validityAlert.showFor(l);e=!1;f=[];i&&a(i).unbind("submit.preventInvalidSubmit")}