function(prop) {
	var ucProp = prop.charAt(0).toUpperCase() + prop.substr(1);
	var props = (prop + ' ' + npf.userAgent.Support.domPrefixes.join(ucProp + ' ') + ucProp).split(' ');

	return this._testProps(props);
}