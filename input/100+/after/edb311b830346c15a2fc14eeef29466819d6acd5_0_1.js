function init() {
	$("#debug_button").button({ icons: { primary: "ui-icon-play" } });
	$("#save_button").button({ icons: { primary: "ui-icon-disk" } });
	$("#open_button").button({ icons: { primary: "ui-icon-folder-open" } });
	$("#new_button").button({ icons: { primary: "ui-icon-document" } });
	$("#post_button").button({ icons: { primary: "ui-icon-extlink" } });
	
	$("#run_button").button({ icons: { primary: "ui-icon-play" } }).hide();
	$("#step_button").button({ icons: { primary: "ui-icon-arrowreturnthick-1-e" } }).hide();
	$("#pause_button").button({ icons: { primary: "ui-icon-pause" } }).hide();
	$("#stop_button").button({ icons: { primary: "ui-icon-stop" } }).hide();
	$("#reset_button").button({ icons: { primary: "ui-icon-arrowrefresh-1-s" } }).hide();
	$("#clone_button").button({ icons: { primary: "ui-icon-copy" } }).hide();
	$("#about_button").button({ icons: { primary: "ui-icon-help" } });
	
	$("#about_dialog").dialog({ 
		modal: true, 
		autoOpen: false, 
		resizable: false,
		minWidth: 350,
		buttons: { "Ok": function() { $(this).dialog("close"); editor.focus(); } } 
	});
	
	$("#save_dialog").dialog({ 
		modal: true, 
		autoOpen: false, 
		resizable: false,
		minWidth: 300,
		buttons: { 
			"Ok": function() {  
				doSave($("#file_name").val());
				$(this).dialog("close"); 
				editor.focus();
			},
			"Cancel": function() { $(this).dialog("close"); editor.focus(); }
		} 
	});
	
	$("#open_dialog").dialog({ 
		modal: true, 
		autoOpen: false, 
		resizable: false,
		minWidth: 400,
		buttons: { 
			"Ok": function() {  
				openFile($("#selectable_file_list").data("selected"));
				persist();
				$(this).dialog("close"); 
				editor.focus();
			},
			"Cancel": function() { $(this).dialog("close"); editor.focus(); }
		} 
	});
	$("#selectable_file_list").selectable({
		selected: function(event, ui) { 
			$("#selectable_file_list").data("selected", event.srcElement.innerHTML);
		}
	});
	
	
	$("#listing").scroll(updateDebuggerLine);
	$("#memory_container").scroll(updateMemoryWindow);
	
	$(".register-memory-value").click(function() { 
		gotoMemoryLocation(parseInt($(this).html()));
	});
	
	
	$("#watches_add_button").click(function() {  
		addWatch();
	});
	$("#watches_remove_button").click(function() {  
		removeWatch();
	});
	$("#watches_list").selectable({
		cancel: ":input,option",
		filter: "li",
		selected: function(event, ui) { 
			$("#watches_list").data("selected", ui.selected.id);
		}
	});

	editor = ace.edit("editor");
	editor.setTheme("ace/theme/monokai");
	var DCPU16Mode = require("ace/mode/dcpu16").Mode;
	editor.getSession().setMode(new DCPU16Mode());
	editor.setHighlightActiveLine(false);
	editor.resize();
	editor.getSession().setUseSoftTabs(true);
	editor.getSession().on('change', function() { 
		assemble();
	});
	
	editor.renderer.on("gutterclick", function(e){
		//console.log("gutterclick", e);
		var target = e.htmlEvent.target;
		if (target.className.indexOf("ace_gutter-cell") == -1)
			return;
		if (!editor.isFocused())
			return;
		if (e.clientX > 25 + target.getBoundingClientRect().left)
			return;

		toggleBreakpoint(e.row);
	});
	
	emulator = new Emulator();
	emulator.async = true;
	emulator.verbose = false;
	emulator.paused = true;
	var m = new Monitor(emulator);
	document.getElementById("monitor").appendChild(m.getDOMElement());
	
	emulator.devices.push(m);
	emulator.devices.push(new Keyboard(emulator));
	emulator.devices.push(new Clock(emulator));
	
	_debugger = new Debugger(emulator);
	_debugger.onStep = function(location) {
		updateDebugger(location);
	};
	_debugger.onPaused = function(location) {
		updateDebugger(location);
	};
	_debugger.onInstruction = function(location) {
		
	}
	
	setInterval(realtimeUpdate, 50);
	
	// load userData
	//clearUserData();
	var data = localStorage.getItem('userData');
	if(data != null && data.length > 0) {
		userData = JSON.parse(data);
	}
	if(userData == null) {
		userData = { 
			fileSaved: false,
			files: { },
			last: null
		};
	}
	userData.watches = userData.watches || [];
	
	
	if(urlParams["program"]) {
		if(!urlParams["clone"])
			readOnly = true;
	
		// load specified program if an ID was provided
		load(urlParams["program"]).success(function(data) { 
			editor.getSession().setValue(data)
			assemble(data);
			
			if(readOnly) 
				startDebugger();
		});
	}
	else if(userData.last == null || !openFile(userData.last)) {
		// load default file if we couldn't fine one to open
		$.ajax({
			url: 			"/programs/diagnostics.asm",
			context:		this,
			dataType: 		"text",
			success: 		function(data) { 
				editor.getSession().setValue(data);
			}
		});
	}
	
	if(!readOnly)
		editor.focus();
	
	
	//$("#source-dialog").resizable( { autoHide: true, handles: "s" });
	//$("#assembly-dialog").resizable( { autoHide: true, handles: "n" });
}