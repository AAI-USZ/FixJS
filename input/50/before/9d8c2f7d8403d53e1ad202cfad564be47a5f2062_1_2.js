function() {
	expect(3);
	equal( compileTmpl( "A_{{if true}}{{/if}}_B" ), "compiled", "Empty if block: {{if}}{{/if}}" );
	equal( compileTmpl( "A_{{if true}}yes{{/if}}_B" ), "compiled", "{{if}}...{{/if}}" );
	equal( compileTmpl( "A_{{if true/}}yes{{/if}}_B" ), "error:Expected block tag", "Mismatching block tags: {{if/}} {{/if}}" );
}