function(){
	// TODO
	// testing...
	parser = { tokenize: koala.lang.tokenize, identify: koala.lang.assoc };
	
	editor = new TextareaDecorator( $("rta_in"), parser );
	
	compiler = new Compiler( parser );
	
	server = new Server();
	
	user = new User( server );
	
	// TODO
	// temporary function testing only, not real button actions
	$("btn_run").onclick = function(){
		compiler.interpret( editor.input.value );
	};
	$("btn_test").onclick = function(){
		throw new Error("NotImplemented");
	};
}