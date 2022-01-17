function() {
	var toBool = function(str) {
		//localStorage values are always strings, let's make sure we get booleans
		//don't forget to use this!
		if ("false" === str) {
			return false;
		} else {
			return str;
		}
	};

	var settings = {
		log: function() {
			console.log("*** EXTENSION SETTINGS ***");
			console.log("base_domain: " + this.base_domain);
			console.log("logging_enabled: " + this.logging_enabled);
			console.log("disabled_caching: " + this.disabled_caching);
			console.log("isDev: " + this.isDev);
			console.log("devDomain: " + this.devDomain);
			console.log("doKindleImport: " + this.doKindleImport);
			console.log("\n");
		},

		get base_domain() {
			return localStorage['FDGS_BASE_DOMAIN'] || "findings.com";
		},

		set base_domain(val) {
			localStorage['FDGS_BASE_DOMAIN'] = val;
		},

		get logging_enabled() {
			return toBool(localStorage['FDGS_LOGGING_ENABLED']) || false;
		},

		set logging_enabled(val) {
			localStorage['FDGS_LOGGING_ENABLED'] = val;
		},

		get disabled_caching() {
			return toBool(localStorage['FDGS_DISABLE_CACHING']);
		},

		set disabled_caching(val) {
			localStorage['FDGS_DISABLE_CACHING'] = val;
		},

		get isDev() {
			return toBool(localStorage['isDev']) || false;
		},

		set isDev(val) {
			localStorage['isDev'] = val;
		},

		get devDomain() {
			return localStorage['devDomain'] || "dev.findings.com";
		},

		set devDomain(val) {
			localStorage['devDomain'] = val;
		},

		get doKindleImport() {
			return toBool(localStorage['doKindleImport']) || false;
		},

		set doKindleImport(val) {
			localStorage['doKindleImport'] = val;
		},

		get amazonImportInterval() {
			return localStorage['amazonImportInterval'] || -1;
		},

		set amazonImportInterval(val) {
			localStorage['amazonImportInterval'] = val;
		},

		get lastImportDate() {
			return localStorage['lastImportDate'] || "never";
		},

		set lastImportDate(val) {
			//please don't use this...it's only for completeness.
			//use updateLastImportDate();
			localStorage['lastImportDate'] = val;
		},

		updateLastImportDate: function() {
			var now = new Date(); 
			var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
			localStorage['lastImportDate'] = now_utc;
		}
	};

	return settings;
}