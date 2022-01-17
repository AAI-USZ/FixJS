function (detailed) {
		var msg = toLogMsg(
			(detailed !== zk) ? arguments :
				(function (args) {
					var a = [];
					for (var j = args.length; --j > 0;)
						a.unshift(args[j]);
					return a;
				})(arguments)
			, (detailed === zk)
		);
		_logmsg = (_logmsg ? _logmsg + msg: msg) + '\n';
		if (zk.mobile) {
			console.log(_logmsg);
			_logmsg = null;
		} else setTimeout(function(){jq(doLog);}, 300);
	}