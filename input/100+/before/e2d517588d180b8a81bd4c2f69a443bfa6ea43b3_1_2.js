function() {
	expect(16);
	equal( jsviews.templates( "{{:a}}" ).render({ a: "aVal" }), "aVal", "a" );
	equal( jsviews.templates( "{{:a.b}}" ).render({ a: { b: "bVal" }}), "bVal", "a.b" );
	equal( jsviews.templates( "{{:a.b.c}}" ).render({ a: { b: { c: "cVal" }}}), "cVal", "a.b.c" );
	equal( jsviews.templates( "{{:a.name}}" ).render({ a: { name: "aName" }} ), "aName", "a.name" );
	equal( jsviews.templates( "{{:a['name']}}" ).render({ a: { name: "aName"} } ), "aName", "a['name']");
	equal( jsviews.templates( "{{:a['x - _*!']}}" ).render({ a: { "x - _*!": "aName"} } ), "aName", "a['x - _*!']");
	equal( jsviews.templates( '{{:a["x - _*!"]}}').render({ a: { "x - _*!": "aName"} }), "aName", 'a["x - _*!"]');
	equal( jsviews.templates( "{{:a.b[1].d}}" ).render({ a: { b: [0, { d: "dVal"}]} }), "dVal", "a.b[1].d");
	equal( jsviews.templates( "{{:a.b[1].d}}" ).render({ a: { b: {1:{ d: "dVal" }}}}), "dVal", "a.b[1].d" );
	equal( jsviews.templates( "{{:a.b[~incr(1-1)].d}}" ).render({ a: { b: {1:{ d: "dVal" }}}}, { incr:function(val) { return val + 1; }}), "dVal", "a.b[~incr(1-1)].d" );
	equal( jsviews.templates( "{{:a.b.c.d}}" ).render({ a: { b: {'c':{ d: "dVal" }}}}), "dVal", "a.b.c.d" );
	equal( jsviews.templates( "{{:a[0]}}" ).render({ a: [ "bVal" ]}), "bVal", "a[0]" );
	equal( jsviews.templates( "{{:a.b[1][0].msg}}" ).render({ a: { b: [22,[{ msg: " yes - that's right. "}]] }}), " yes - that's right. ", "a.b[1][0].msg" );
	equal( jsviews.templates( "{{:#data.a}}" ).render({ a: "aVal" }), "aVal", "#data.a" );
	equal( jsviews.templates( "{{:#view.data.a}}" ).render({ a: "aVal" }), "aVal", "#view.data.a" );
	equal( jsviews.templates( "{{:#index === 0}}" ).render([{ a: "aVal" }]), "true", "#index" );
}