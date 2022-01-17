function() {
	expect(8);
	equal( compileTmpl( "{{:a++}}" ), "Syntax error\na++", "a++" );
	equal( compileTmpl( "{{:(a,b)}}" ), "Syntax error\n(a,b)", "(a,b)" );
	equal( jsviews.templates( "{{: a+2}}" ).render({ a: 2, b: false }), "4", "a+2");
	equal( jsviews.templates( "{{: b?'yes':'no' }}" ).render({ a: 2, b: false }), "no", "b?'yes':'no'");
	equal( jsviews.templates( "{{:(a||-1) + (b||-1) }}" ).render({ a: 2, b: 0 }), "1", "a||-1");
	equal( jsviews.templates( "{{:3*b()*!a*4/3}}" ).render({ a: false, b: function () { return 3; }}), "12", "3*b()*!a*4/3");
	equal( jsviews.templates( "{{:a%b}}" ).render({ a: 30, b: 16}), "14", "a%b");
	equal( jsviews.templates( "A_{{if v1 && v2 && v3 && v4}}no{{else !v1 && v2 || v3 && v4}}yes{{/if}}_B" ).render({v1:true,v2:false,v3:2,v4:"foo"}), "A_yes_B", "x && y || z");
}