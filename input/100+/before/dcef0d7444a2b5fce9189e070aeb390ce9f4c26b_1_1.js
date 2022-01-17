function(){var a,b,c,d,e;c={SILENT:0,ERROR:1,WARN:2,INFO:3,DEBUG:4},b=function(){function a(a){this.loglevel=a}return a.prototype.log=function(a,b){if(window.console&&this.loglevel>=a)return window.console.log(b)},a}(),e=function(a,b){var c,d;for(c in b)d=b[c],a[c]||(a[c]=d);return a},window.myna={callbacks:[]},a={callbackCounter:0,removeCallback:function(a){if(!this.readyState||this.readyState==="complete"||this.readyState==="loaded"){this.onload=null;try{return this.parentNode.removeChild(this)}catch(b){}finally{window.myna.callbacks[a]=null}}},doJsonP:function(b){var c,d,e,f,g,h,i;f=!1,c="callback"+a.callbackCounter++,window.myna.callbacks[c]=function(a){if(!f)return f=!0,b.success.apply(this,arguments)},g=b.url+"?",i=b.data;for(e in i)h=i[e],g+=""+e+"="+h+"&";return g+="callback=window.myna.callbacks."+c,b.timeout>0&&window.setTimeout(function(){if(!f)return f=!0,a.removeCallback.call(d,c),b.error({typename:"problem",subtype:500,messages:[{typename:"timeout",item:"The server took longer than "+b.timeout+" ms to reply"}]})},b.timeout),d=document.createElement("script"),d.setAttribute("type","text/javascript"),d.setAttribute("async","true"),d.onload=d.onreadystatechange=function(){return a.removeCallback.call(d,c)},d.setAttribute("src",g),document.getElementsByTagName("head")[0].appendChild(d)}},d=function(){function d(a,c){var d;this.experiment=a,this.options=c!=null?c:{},d={cookieLifespan:365,cookieName:"myna"+this.experiment,timeout:1e3,baseurl:"http://api.mynaweb.com",loglevel:1},this.options=e(e({},d),c),this.logger=new b(this.options.loglevel)}return d.prototype.token=null,d.prototype.parseSuggestResponse=function(a){return{token:a.token,choice:a.choice}},d.prototype.parseErrorResponse=function(a){return{code:a.subtype,messages:a.messages}},d.prototype.doAjax=function(b,d,f,g){var h;return this.logger.log(c.DEBUG,"myna.doAjax called"),h=e(e({},this.options),{url:this.options.baseurl+b,data:d,success:f,error:g}),this.logger.log(c.DEBUG,h),a.doJsonP(h)},d.prototype.suggest=function(a,b){var d,e,f,g=this;return this.logger.log(c.DEBUG,"myna.suggest called"),d={},f=function(d,e,f){var h;g.logger.log(c.DEBUG,"myna.suggest successWrapper called"),g.logger.log(c.DEBUG,d);if(d.typename==="suggestion")return h=g.parseSuggestResponse(d),g.logger.log(c.INFO,"Myna suggested "+h.suggestion),g.logger.log(c.DEBUG,"Response token stored "+h.token),myna.token=h.token,a?a(h):g.logger.log(c.WARN,"You should pass a success function to myna.suggest. See the docs for details.");if(d.typename==="problem"){g.logger.log(c.ERROR,"Myna.suggest returned an API error: "+d.subtype+" "+d.messages);if(b)return b(parseErrorResponse(d))}else{g.logger.log(c.ERROR,"Myna.suggest did something unexpected"),g.logger.log(c.ERROR,d);if(b)return b(400,[{typename:"unexpected",item:d}])}},e=function(a){var d;g.logger.log(c.DEBUG,"myna.suggest errorWrapper called"),d=g.parseErrorResponse(a),g.logger.log(c.ERROR,a),g.logger.log(c.ERROR,"myna.suggest failed: error "+d);if(b)return b(d)},this.doAjax("/v1/experiment/"+this.experiment+"/suggest",d,f,e)},d.prototype.reward=function(a,b,d){var e,f,g;this.logger.log(c.DEBUG,"myna.reward called"),typeof a=="object"&&a.target&&(this.logger.log(c.WARN,"You used myna.reward directly as an event handler, which is strictly speaking bad."),this.logger.log(c.WARN,"To suppress this message, wrap the call to myna.reward in an anonymous function, e.g.:"),this.logger.log(c.WARN,'  $("foo").click(function() { myna.reward() })'),a=null,b=null,d=null);if(!myna.token){this.logger.log(c.ERROR,"You must call suggest before you call reward.");return}return e={token:myna.token,amount:a||1},g=function(a,d,e){this.logger.log(c.DEBUG,"myna.reward successWrapper called"),myna.token=null,this.logger.log(c.INFO,"myna.reward succeeded");if(b)return b()},f=function(a,b,d){var e;this.logger.log(c.DEBUG,"myna.reward errorWrapper called"),e=parseErrorResponse(a.responseText),this.logger.log(c.ERROR,"myna.reward failed: error "+e.code+" "+e.message);if(d)return d(e.code,e.message)},myna.doAjax("/v1/experiment/"+this.experiment+"/reward",e,g,f)},d.prototype.saveToken=function(a){return this.logger.log(c.DEBUG,"myna.saveToken called with token"+a),a=a||myna.token,a?createCookie(myna.options.cookieName,a,myna.options.cookieLifespan):this.logger.log(c.WARN,"myna.saveToken called with empty token and myna.token also empty")},d.prototype.loadToken=function(){var a;a=readCookie(myna.options.cookieName);if(!a)return this.logger.log(c.WARN,"myna.loadToken loaded empty token")},d.prototype.clearToken=function(){return clearCookie(myna.options.cookieName)},d}(),window.Myna=d}