function CS(el,pid){

	var plugin = pluginMap[pid];

	if(plugin){

		var key = 'cs-plugin-'+pid;

		var runtimeStyle  = el.runtimeStyle;

		var expressionStyleKey = setupKeyMap[pid];

		if(expressionStyleKey){

			//if(inc++>1)测试一下

			runtimeStyle[expressionStyleKey] =  el.currentStyle[expressionStyleKey]

				||el.parentNode.currentStyle[expressionStyleKey];

			if(runtimeStyle[key]){

				console.error('插件:'+pid+'被多次初始化了'+runtimeStyle[key])

				return;

			}

			runtimeStyle[key] = 1;

			plugin.update(el,{})

		}

		//console.log(key,el.tagName,!!pplm[pid])

	}

}