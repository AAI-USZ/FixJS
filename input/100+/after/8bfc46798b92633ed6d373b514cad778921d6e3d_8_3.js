function() {
	expect(2);
	//expect(3);

	baidu("<form id='kk' name='kk'><select id='kkk'><option value='cf'>cf</option><option value='gf'>gf</option></select></form>").appendTo("#qunit-fixture");

	baidu("#kkk").val( "gf" );

	document["kk"].reset();

	equal( baidu("#kkk")[0].value, "cf", "Check value of select after form reset." );
	equal( baidu("#kkk").val(), "cf", "Check value of select after form reset." );

	//修改
	// re-verify the multi-select is not broken (after form.reset) by our fix for single-select
	//deepEqual( baidu("#select3").val(), ["1", "2"], "Call val() on a multiple=\"multiple\" select" );

	baidu("#kk").remove();
}