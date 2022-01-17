function() {
	expect(7);
	equal( jsviews.templates( "A_{{if true}}yes{{else}}no{{/if}}_B" ).render(), "A_yes_B", "{{if a}} {{else}}: a" );
	equal( jsviews.templates( "A_{{if false}}yes{{else}}no{{/if}}_B" ).render(), "A_no_B", "{{if a}} {{else}}: !a" );
	equal( jsviews.templates( "A_{{if true}}yes{{else true}}or{{else}}no{{/if}}_B" ).render(), "A_yes_B", "{{if a}} {{else b}} {{else}}: a" );
	equal( jsviews.templates( "A_{{if false}}yes{{else true}}or{{else}}no{{/if}}_B" ).render(), "A_or_B", "{{if a}} {{else b}} {{else}}: b" );
	equal( jsviews.templates( "A_{{if false}}yes{{else false}}or{{else}}no{{/if}}_B" ).render(), "A_no_B", "{{if a}} {{else b}} {{else}}: !a!b" );
	equal( jsviews.templates( "A_{{if false}}<div title='yes'{{else}}<div title='no'{{/if}}>x</div>_B" ).render(), "A_<div title='no'>x</div>_B", "{{if}} and {{else}} work across HTML tags" );
	equal( jsviews.templates( "A_<div title='{{if true}}yes'{{else}}no'{{/if}}>x</div>_B" ).render(), "A_<div title='yes'>x</div>_B", "{{if}} and {{else}} work across quoted strings" );
}