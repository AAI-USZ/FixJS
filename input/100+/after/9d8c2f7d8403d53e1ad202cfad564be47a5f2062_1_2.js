function() {
	expect(15);
	jsviews.templates( {
		forTmpl: "header_{{for people}}{{:name}}{{/for}}_footer",
		templateForArray: "header_{{for #data}}{{:name}}{{/for}}_footer",
		pageTmpl: '{{for [people] tmpl="templateForArray"/}}',
		simpleFor: "a{{for people}}Content{{:#data}}|{{/for}}b",
		forPrimitiveDataTypes: "a{{for people}}|{{:#data}}{{/for}}b"
	});

	equal( jsviews.render.forTmpl({ people: people }), "header_JoBill_footer", '{{for people}}...{{/for}}' );
	equal( jsviews.render.templateForArray( [people] ), "header_JoBill_footer", 'Can render a template against an array, as a "layout template", by wrapping array in an array' );
	equal( jsviews.render.pageTmpl({ people: people }), "header_JoBill_footer", '{{for [people] tmpl="templateForArray"/}}' );
	equal( jsviews.templates( "{{for people towns}}{{:name}}{{/for}}" ).render({ people: people, towns: towns }), "JoBillSeattleParisDelhi", "concatenated targets: {{for people towns}}" );
	equal( jsviews.templates( "{{for}}xxx{{:#data===~test}}{{/for}}" ).render({},{test:undefined}), "xxxtrue", "no parameter - renders once with #data undefined: {{for}}" );
	equal( jsviews.templates( "{{for missingProperty}}xxx{{:#data===~undefined}}{{/for}}" ).render({}), "xxxtrue", "missingProperty - renders once with #data undefined: {{for missingProperty}}" );
	equal( jsviews.templates( "{{for null}}xxx{{:#data===null}}{{/for}}" ).render(), "xxxtrue", "null - renders once with #data null: {{for null}}" );
	equal( jsviews.templates( "{{for false}}xxx{{:#data}}{{/for}}" ).render(), "xxxfalse", "false - renders once with #data false: {{for false}}" );
	equal( jsviews.templates( "{{for 0}}xxx{{:#data}}{{/for}}" ).render(), "xxx0", "0 - renders once with #data false: {{for 0}}" );
	equal( jsviews.templates( "{{for ''}}xxx{{:#data===''}}{{/for}}" ).render(), "xxxtrue", "'' - renders once with #data false: {{for ''}}" );

	equal( jsviews.render.simpleFor({people:[]}), "ab", 'Empty array renders empty string' );
	equal( jsviews.render.simpleFor({people:["",false,null,undefined,1]}), "aContent|Contentfalse|Content|Content|Content1|b", 'Empty string, false, null or undefined members of array are also rendered' );
	equal( jsviews.render.simpleFor({people:null}), "aContent|b", 'null is rendered once with #data null' );
	equal( jsviews.render.simpleFor({}), "aContent|b", 'if #data is undefined, renders once with #data undefined' );
	equal( jsviews.render.forPrimitiveDataTypes({people:[0,1,"abc","",,null,true,false]}), "a|0|1|abc||||true|falseb", 'Primitive types render correctly, even if falsey' );
}