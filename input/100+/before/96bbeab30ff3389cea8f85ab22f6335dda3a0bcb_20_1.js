function() {

	expect(1);



	//  This must be maintained and equal baidu.attrFix when appropriate

	//  Ensure that accidental or erroneous property

	//  overwrites don't occur

	//  This is simply for better code coverage and future proofing.

	var props = {

		"tabindex": "tabIndex",

		"readonly": "readOnly",

		"for": "htmlFor",

		"class": "className",

		"maxlength": "maxLength",

		"cellspacing": "cellSpacing",

		"cellpadding": "cellPadding",

		"rowspan": "rowSpan",

		"colspan": "colSpan",

		"usemap": "useMap",

		"frameborder": "frameBorder",

		"contenteditable": "contentEditable"

	};



	if ( !baidu.support.enctype ) {

		props.enctype = "encoding";

	}



	deepEqual(props, baidu.propFix, "baidu.propFix passes integrity check");

}