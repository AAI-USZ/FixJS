function( elem, name ) {
	var attr,
		xml = isXML( elem ),
		normalized = xml ? name : name.toLowerCase();
	if ( Expr.attrHandle[ normalized ] ) {
		return Expr.attrHandle[ normalized ]( elem );
	}
	if ( assertAttributes || xml ) {
		return elem.getAttribute( normalized );
	}
	attr = elem.attributes || {};
	attr = attr[ normalized ] || attr[ name ];
	return attr ?
		typeof elem[ normalized ] === "boolean" ?
			elem[ normalized ] ? normalized : null :
			attr.specified ? attr.value : null :
		null;
}