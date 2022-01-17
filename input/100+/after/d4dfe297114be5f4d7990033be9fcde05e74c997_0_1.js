function runit(myDiv,theButton,includes) {
    //var prog = document.getElementById(myDiv + "_code").value;

    $(theButton).attr('disabled','disabled');
    Sk.isTurtleProgram = false;
    if (theButton !== undefined) {
        Sk.runButton = theButton;
    }
    var editor = cm_editors[myDiv+"_code"];
    if (editor.acEditEvent) {
        logBookEvent({'event':'activecode','act': 'edit', 'div_id':myDiv}); // Log the run event
        editor.acEditEvent = false;
    }
    logBookEvent({'event':'activecode','act': 'run', 'div_id':myDiv}); // Log the run event
    var prog = "";
    var text = "";
    if (includes !== undefined ) {
        // iterate over the includes, in-order prepending to prog
		for (var x in includes) {
			text = cm_editors[includes[x] + "_code"].getValue();
			prog = prog + text + "\n"
		}
    }
    prog = prog + editor.getValue();
    var mypre = document.getElementById(myDiv + "_pre");
    if (mypre) mypre.innerHTML = '';
    Sk.canvas = myDiv + "_canvas";
    Sk.pre = myDiv + "_pre";
    var can = document.getElementById(Sk.canvas);
    // The following lines reset the canvas so that each time the run button
    // is pressed the turtle(s) get a clean canvas.
    if (can) {
        can.width = can.width;
        if (Sk.tg) {
            Sk.tg.canvasInit = false;
            Sk.tg.turtleList = [];
        }
    }
    // set execLimit in milliseconds  -- for student projects set this to 
    // 30 seconds?
    Sk.execLimit = 30000;
    // configure Skulpt output function, and module reader
    Sk.configure({output:outf,
                read: builtinRead
            });
    try {
        Sk.importMainWithBody("<stdin>", false, prog);
    } catch (e) {
        logBookEvent({'event':'ac_error','act':e.toString(), 'div_id':myDiv})
        alert(e);
    }
    if (! Sk.isTurtleProgram ) {
        $(theButton).removeAttr('disabled');
    }
}