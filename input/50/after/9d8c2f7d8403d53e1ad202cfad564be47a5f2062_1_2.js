function() {
	expect(3);
	equal( compileTmpl( "A_{{if true}}{{/if}}_B" ), "compiled", "Empty if block: {{if}}{{/if}}" );
	equal( compileTmpl( "A_{{if true}}yes{{/if}}_B" ), "compiled", "{{if}}...{{/if}}" );
	equal( compileTmpl( "A_{{if true/}}yes{{/if}}_B" ), "Syntax error\nUnmatched or missing tag: \"{{/if}}\" in template:\nA_{{if true/}}yes{{/if}}_B");
}