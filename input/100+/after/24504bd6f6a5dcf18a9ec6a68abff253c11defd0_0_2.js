function(document){
	"use strict";
	// default config
	var config = {};
	var trim = function(s){ return s.replace(/^\s|\s$/g, "") };

	var getter = function(){
		delete document.cookie;
		var cookie = document.cookie;
		set_setter();
		return cookie;
	};

	var custom_validator = {};
	var validator = function(key, val, cookie_name, cookie_value) {
		var res;
		if (custom_validator["*"]) {
			res = custom_validator["*"](key, val, cookie_name, cookie_value)
			if (res) return res;
		}
		if (custom_validator[key]) {
			res = custom_validator[key](key, val, cookie_name, cookie_value);
			if (res) return res;
		}
		return false;
	};
	
	var validate_cookie = function(orig_cookie){
		if (config.debug) console.log(orig_cookie);
		var pair = trim(orig_cookie).split(";");
		var special_keys = ["path", "domain", "max-age", "expires"];
		var new_cookie = [];
		var exists = {};
		var rewrite_flag, cookie_name, cookie_value;

		for (var i=0; i < pair.length; i++) {
			if (!pair[i]) continue;
			var tmp = trim(pair[i]).split("=");
			var key = trim(tmp[0] || "");
			var val = trim(tmp[1] || "");
			if (i == 0) {
				cookie_name = key;
				cookie_value = val;
			}
			exists[key] = true;
			// special key
			if (key === "secure") {
				new_cookie.push("secure");
				continue;
			}
			var res = validator(key, val, cookie_name, cookie_value);
			if (res) {
				rewrite_flag = true;
				new_cookie.push(res.join("="));
				continue;
			}
			new_cookie.push([key, val].join("="));
		}
		// set default for special keys
		for (i = 0; i < special_keys.length; i++) {
			var k = special_keys[i];
			if (!exists[k] && config["default_" + k]) {
				new_cookie.push([k, config["default_" + k]].join("="));
				rewrite_flag = true;
			}
		}
	
		delete document.cookie;
		if (rewrite_flag) {
			if (config.debug) console.log(new_cookie);
			document.cookie = new_cookie.join(";");
		} else {
			if (config.debug) console.log(orig_cookie);
			document.cookie = orig_cookie;
		}
		set_setter()
	};
	var set_setter = function() {
		try{
			Object.defineProperty(document, "cookie", {
				set: validate_cookie,
				get: getter
			});
		} catch(e){ /* not supported */ }
	};
	
	return {
		configure: function(options){
			for(var key in options) {
				config[key] = options[key];
			}
		},
		isSupported: !!Object.defineProperty,
		set_rule: function(key, func){ custom_validator[key] = func },
		on: function(){ set_setter()  },
		off: function(){ delete document.cookie }
	}
}