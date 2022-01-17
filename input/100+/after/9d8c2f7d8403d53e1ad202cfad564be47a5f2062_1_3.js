function() {
	expect(5);
	jsviews.helpers({
		not: function( value ) {
			return !value;
		},
		concat: function() {
			return "".concat.apply( "", arguments ) + "inner";
		}
	});

	jsviews.templates({
		encapsulate1: {
			markup: "{{str:~not(true)}} {{sort people reverse=true tmpl='personTmpl'/}} {{str:~not2(false)}}",
			tags: {
				sort2: sort
			},
			templates: {
				personTmpl: "{{upper:name}}"
			},
			helpers: {
				not2: function( value ) {
					return "not2:" + !value;
				}
			},
			converters: {
				str: function( value ) {
					return value.toString() + ":tostring";
				},
				upper: function( value ) {
					return value.toUpperCase();
				}
			}
		}
	});
	equal( $.trim( jsviews.render.encapsulate1({ people: people })), "false:tostring BILLJO not2:true:tostring", 'jsviews.templates( "myTmpl", tmplObjWithNestedItems);' );

	jsviews.templates({
		useLower: "{{lower a/}}",
		tmplWithNestedResources: {
			markup: "{{lower a/}} {{:~concat2(a, 'b', ~not2(false))}} {{for #data tmpl='nestedTmpl1'/}} {{for #data tmpl='nestedTmpl2'/}}",
			helpers: {
				not2: function( value ) {
					return !value;
				},
				concat2: function() {
					return "".concat.apply( "", arguments ) + "%";
				}
			},
			converters: {
				"double": function( value ) {
					return "(double:" +  value + "&" + value + ")";
				}
			},
			tags: {
				lower: function( val ) {
					return val.toLowerCase()
				}
			},
			templates: {
				nestedTmpl1: "{{double:a}}",
				nestedTmpl2: {
					markup: "{{double:~upper(a)}}",
					helpers: {
						upper: function( value ) {
							return value.toUpperCase();
						}
					},
					converters: {
						"double": function( value ) {
							return "(override outer double:" +  value + "|" + value + ")";
						}
					}
				},
				templateWithDebug: {
					markup: "{{double:~upper(a)}}",
					debug: true
				}
			}
		}
	});
	var context = {
		upper: function( value ) {
			return "contextualUpper" + value.toUpperCase();
		},
		not: function( value ) {
			return "contextualNot" + !value;
		},
		not2: function( value ) {
			return "contextualNot2" + !value;
		}
	};
	equal( jsviews.render.tmplWithNestedResources({ a: "aVal" }), "aval aValbtrue% (double:aVal&aVal) (override outer double:AVAL|AVAL)", 'Access nested resources from template' );
	equal( jsviews.render.useLower({ a: "aVal" }), "Error: Unknown tag: {{lower}}. ", 'Cannot access nested resources from a different template' );
	equal( jsviews.render.tmplWithNestedResources({ a: "aVal" }, context), "aval aValbcontextualNot2true% (double:aVal&aVal) (override outer double:contextualUpperAVAL|contextualUpperAVAL)", 'Resources passed in with context override nested resources' );
	equal( jsviews.templates.tmplWithNestedResources.templates.templateWithDebug.fn.toString().indexOf("debugger;") > 0, true, 'Can set debug=true on nested template' );
}