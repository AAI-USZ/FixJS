function($){

// UI Chrome Section

function test_block(block){
    var name = block.data('klass') + ': ' + block.data('label');
    try{
        eval(block.wrap_script());
        // console.log('passed: %s', name);
        return true;
    }catch(e){
        if (e.name === 'SyntaxError'){
            console.error('failed: %s, %o', name, e);
            return false;
        }else{
            // console.warn('passed with error: %s, %o', name, e);
            return true;
        }
    }
}

function test(){
    var blocks = $('#accordion .wrapper');
    var total = blocks.length;
    var success = 0;
    var fail = 0;
    console.log('running %d tests', total);
    blocks.each(function(idx, elem){
        setTimeout(function(){
            // console.log('running test %d', idx);
            test_block($(elem)) ? success++ : fail++;
            if( success + fail === total){
                console.log('Ran %d tests, %d successes, %s failures', total, success, fail);
            }
        }, 10);
    });
}
window.test = test;

function clear_scripts(event, force){
    if (force || confirm('Throw out the current script?')){
        $('.workspace:visible > *').empty();
        $('.stage').replaceWith('<div class="stage"></div>');
    }
}
$('.clear_scripts').click(clear_scripts);
$('.goto_script').click(function(){$('#accordion')[0].scrollIntoView();});
$('.goto_stage').click(function(){$('.stage')[0].scrollIntoView();});
$('.clear_canvas').click(function(){$('.stage').replaceWith('<div class="stage"></div>');});

// Load and Save Section

function save_named_scripts(){
    var title = $('#script_name').val();
    var description = $('#script_description').val();
    var date = Date.now();
    if (title){
        if (localStorage[title]){
            if (!confirm('A script with that title exist. Overwrite?')){
                return;
            }
        }
        localStorage[title] = JSON.stringify({
            title: title,
            description: description,
            date: date,
            scripts: scripts_as_object()
        });
        $("#save_dialog").dialog("close");
    }
	else
        alert("You must enter a name");
}
    
/*function restore_from_export(){
    reset_and_close_restore_dialog();
    $('#exp h2').html('Paste Exported Code below');
    $('#exp small').html('Paste Exported Code below');
    $('#exp').bPopup();

    $('#exp .done').click(function(){
    $('#exp .done').unbind('click');
    var script = $('#exp textarea').val();
    console.log(script);
    $('#exp').bPopup().close();
    clear_scripts();

    var ps = JSON.parse(script);
    console.log(ps.scripts);

    load_scripts_from_object(ps.scripts);   
    }); 
}

function reset_and_close_restore_dialog(){
    $('#script_list').empty();
    $('#restore_dialog').bPopup().close();
}
*/
function populate_and_show_restore_dialog(){
    var list = $('#script_list');
    var script_obj;
    var idx, value, key, script_li;
	var len = localStorage.length;
    for (idx = 0; idx < len; idx++){
        key = localStorage.key(idx);
        if (key === '__current_scripts') continue;
        value = localStorage[key];
        script_obj = JSON.parse(value);
        if (script_obj.description){
            script_li = $('<li><span class="title">' + script_obj.title + '</span><button class="restore action">Restore</button><button class="delete action">Delete</button><button class="show_description action">Description</button><br /><span class="timestamp">Saved on ' + new Date(script_obj.date).toDateString() + '</span><p class="description hidden">' + script_obj.description + '<br /><p></li>');
        }else{
            script_li = $('<li><span class="title">' + script_obj.title + '</span><button class="restore action">Restore</button><button class="delete action">Delete</button><br /><span class="timestamp">Saved on ' + new Date(script_obj.date).toDateString() + '</span></li>');
        }
		
        script_li.data('scripts', script_obj.scripts); // avoid re-parsing later
        list.append(script_li);
    }
	$('button.action').button();
	$('#restore_dialog').dialog("open");
}

function save_current_scripts(){
	show_workspace();
	$('#accordion')[0].scrollIntoView();
	localStorage['__current_scripts'] = JSON.stringify(scripts_as_object());
}
$(window).unload(save_current_scripts);

var allDemos = {};

function populate_demos_dialog(demos){
    var list = $('#demo_list');
    var idx, value, key, script_li;
    $.each(demos, function(){
        allDemos[this.title] = this.scripts;
        if (this.description){
            script_li = $('<li><span class="title">' + this.title + '</span><button class="load action">Load</button><button class="show_description action">Description</button><p class="description hidden">' + this.description + '<p></li>');
        }else{
            script_li = $('<li><span class="title">' + this.title + '</span><button class="load action">Load</button></li>');
        }
        script_li.data('scripts', this.scripts); // avoid re-parsing later
        list.append(script_li);
    });
}

window.populate_demos_dialog = populate_demos_dialog; // expose this as a public method

function restore_named_scripts(event){
    clear_scripts();
    load_scripts_from_object($(this).closest('li').data('scripts'));
    reset_and_close_restore_dialog();
}

function restore_demo_scripts(event){
    clear_scripts();
    load_scripts_from_object($(this).closest('li').data('scripts'));
    $('#demos_dialog').bPopup().close();
}
function restore_demo_by_name(name){
    clear_scripts();
    load_scripts_from_object(allDemos[name]);
}

window.restore_demo_by_name = restore_demo_by_name; // expose as public so we can link to a demo.

function delete_named_scripts(event){
    if (confirm('Are you sure you want to delete this script?')){
        var title = $(this).siblings('.title').text();
        $(this).parent().remove();
        console.log('remove %s', title);
        localStorage.removeItem(title);
    }
}

function toggle_description(event){
    $(this).siblings('.description').toggleClass('hidden');
}

$('.save_scripts').click(function(){$('#save_dialog').dialog("open");});

/*
$('.restore_scripts').click( populate_and_show_restore_dialog );
$('#restore_dialog .cancel').click(reset_and_close_restore_dialog);
$('#restore_dialog .exp').click(restore_from_export);*/
$('#restore_dialog').delegate('.restore', 'click', restore_named_scripts)
                    .delegate('.show_description', 'click', toggle_description)
                    .delegate('.delete', 'click', delete_named_scripts);

$('.restore_scripts').click(populate_and_show_restore_dialog);
					
$('#demos_dialog').delegate('.load', 'click', restore_demo_scripts)
                  .delegate('.show_description', 'click', toggle_description);
$('#demos_dialog .cancel').click(function(){$('#demos_dialog').bPopup().close();});
$('.demo_scripts').click(function(){$('#demos_dialog').bPopup();});

function scripts_as_object(){
	var blocks = $('.workspace:visible .scripts_workspace > .wrapper');
	if (blocks.length){
		return blocks.map(function(){return $(this).block_description();}).get();
	}
	else{
		return [];
	}   
}

function load_scripts_from_object(blocks){
    var workspace = $('.workspace:visible .scripts_workspace');
    $.each(blocks, function(idx, value){
        console.log('restoring block %s', idx);
        var block = Block(value);
        workspace.append(block);
        block.css({position: 'relative', left: 0, top: 0, display: 'block'});
        block.trigger('add_to_workspace');
        $('.scripts_workspace').trigger('add');

    });
}

window.load_current_scripts = function(){
    if (localStorage.__current_scripts){
        var blocks = JSON.parse(localStorage['__current_scripts']);
        if (blocks.length){
            console.log('restoring %s blocks', blocks.length);
            load_scripts_from_object(blocks);
        }
    }
}
// $(document).ready(load_current_scripts);

// Tab UI

// UI Section

$("input[name='scriptview']").change(function () {
	//alert(""+($("#sblock").attr('checked'))+" "+($("#stext").attr('checked')));
    var self = $(this);
    $('.tab_bar .selected').removeClass('selected');
    self.addClass('selected');
    $('.workspace:visible > div:visible').hide();
	if($("#sblock").attr('checked') === 'checked'){
        $('.workspace:visible .scripts_workspace').show();
	}
	else if($("#stext").attr('checked') === 'checked'){
        $('.workspace:visible .scripts_text_view').show();
        update_scripts_view();
	}
}).change();

// Expose this to draggging and saving functionality
window.show_workspace = function(){
    $('.workspace:visible .scripts_text_view').hide();
    $('.workspace:visible .scripts_workspace').show();
}

// Build the Blocks menu, this is a public method

function menu(title, specs, show){ 
    var klass = title.toLowerCase();
	var body = $('<section class="submenu"></section>');
    var select = $('<h3 class="select"><a href="#">' + title + '</a></h3>').appendTo(body);
    var options = $('<div class="option"></div>').appendTo(body);

    $.each(specs, function(idx, spec){
        if (spec !== undefined){
            spec.klass = klass;
            options.append(Block(spec));
        }
    });
	$("#accordion").append(body);
    /*if (show){
        select.addClass('selected');
    }else{
        options.hide();
    }*/
    return body;
}
window.menu = menu;
				//Accordion menu on the right, now menus can be dragged around.
				$("#accordion").accordion({
					header: "> section > h3",
					collapsible: true,
					autoHeight: false

				}).sortable({
					axis: "y",
					handle: "h3 > a",
					stop: function( event, ui ) {
						ui.item.children( "h3" ).triggerHandler( "focusout" );
					}
				});
				
				//Block/Text view
				$( "#radio" ).buttonset();
				
				//Currently applies to ALL buttons on the stage, this may be an issue down the road.
				$("button").button();
				
				//Save Dialog
				var expsave = true;

				
				$("#save_dialog").dialog({
					autoOpen: false,
					height: 300,
					width: 450,
					modal: true,
					resizable: false,
					buttons: [
					{
						text: "Save",
						"class": 'dialogbutton',
						click: function() {save_named_scripts();}
					},
					{
						text: "Export",
						"class": 'dialogbutton',
						click: function() {
							var title = $('#script_name').val();    
							var description = $('#script_description').val();
							var date = Date.now();
							if (title){
								var exp = JSON.stringify({
									title: title,
									description: description,
									date: date,
									scripts: scripts_as_object()
								});
								$("#save_dialog").dialog("close");
								$('#exp h2').html('Exported Code');
								$('#exp small').html('Copy this into a text document to save for your records.');
								expsave = true;
								$('#exp').dialog("open");
								$('#exp textarea').val(exp);
							}
							else
							alert("You must enter a name");
						}
					},
					{
						text: "Cancel",
						"class": 'dialogbutton',
						click: function() {
							$(this).dialog("close");
						}
					}
					],
					close: function(){
						$("#script_name").val("");
						$("#script_description").val("");
					}
				});
				
				//Restore Dialog
				
				$("#restore_dialog").dialog({
					autoOpen: false,
					height: 300,
					width: 450,
					modal: true,
					resizable: false,
					buttons: [
					{
						text: "Cancel",
						"class": 'dialogbutton',
						click: function() {
							$(this).dialog("close");
						}				
					},
					{
						text: "Import",
						"class": 'dialogbutton',
						click: function() {
							$(this).dialog("close");
							$('#exp h2').html('Paste Exported Code below');
							$('#exp small').html('Paste Exported Code below');
							$('#exp textarea').val('');
							expsave = false;
							$('#exp').dialog("open");							
						}
					},
					],
					close: function(){
						$('#script_list').empty();
					}
				});
				
				//Export Dialog				
				$("#exp").dialog({
					autoOpen: false,
					height: 250,
					width: 400,
					modal: true,
					resizable: false,
					buttons: [
					{
						text: "Done",
						"class": 'dialogbutton',
						click: function() {
							if(expsave){
								$(this).dialog("close");
							}
							else{
								var script = $('#exp textarea').val();
								console.log(script);
								$(this).dialog("close");
								clear_scripts();
								var ps = JSON.parse(script);
								//console.log(ps.scripts);
								load_scripts_from_object(ps.scripts);
							}
						}
					}
					]
				});
}