function(){
	// TODO
	// testing...
	parser = { tokenize: koala.lang.tokenize, identify: koala.lang.assoc };
	
	editor = new TextareaDecorator( $("rta_in"), parser );
	
	compiler = new Compiler( parser );
	
	server = new Server();
	
	user = new User( server );
	
	anim = new Animator();
	
	function ToggleMenu( elem ){
		var lock = true;
		elem.onmousedown = function(){ lock = false; };
		elem.onmouseup = function(){ lock = true; };
		elem.onmouseover = function(){
			elem.children[0].style.display = 'block';
		};
		elem.onmouseout = function(){
			lock && (elem.children[0].style.display = 'none');
		};
	};
	
	toolbar = {
		settings: $("toolbar_settings"),
		login: $("toolbar_login") };
	
	for( menu in toolbar ) new ToggleMenu(toolbar[menu]);
	
	// TODO
	// temporary function testing only, not real button actions
	$("btn_run").onclick = function(){
		compiler.interpret( editor.input.value );
	};
	$("btn_test").onclick = function(){
		throw new Error("NotImplemented");
	};
}