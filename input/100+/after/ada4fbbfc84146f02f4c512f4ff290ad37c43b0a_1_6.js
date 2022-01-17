function select_metadata_file () {
  if (document.getElementById('no_metadata').checked) {
    selected_no_metadata = 1;
    document.getElementById("sel_md_pill").className = "pill_complete";
    document.getElementById("icon_step_1").style.display = "";
    check_submitable();
  } else {
    selected_no_metadata = 0;
    var sel = document.getElementById('metadata_file_select');
    selected_metadata_file = sel.options[sel.selectedIndex].value;
    document.getElementById("sel_mdfile_div").innerHTML = "<p><img src='./Html/ajax-loader.gif'> please wait while your metadata file is being validated...</p>";
    
    $.get("?page=Upload&action=validate_metadata&mdfn="+selected_metadata_file, function (data) {
	var result = data.split(/\|\|/);
	if (result[0] != "0") {
	  var html = "<div class='well'><h4>selected metadata file</h4><br>"+result[2]+"<br><p><i>"+selected_metadata_file+"</i><br><br><input type='button' class='btn' value='unselect' onclick='unselect_metadata_file();'><input type='hidden' name='mdfile' value='"+selected_metadata_file+"'></div>";
	  selected_project = result[1]
	  if (result.length == 4) {
	    selected_libraries = result[3].split(/@@/);
	  }
	  update_inbox();
	  document.getElementById("sel_mdfile_div").innerHTML = html;
	  document.getElementById("sel_md_pill").className = "pill_complete";
	  document.getElementById("icon_step_1").style.display = "";
	  
	  var found_selected_project = 0;
	  var projsel = document.getElementById('project');
	  for (i=0;i<projsel.options.length;i++) {
	    if (projsel.options[i].text == selected_project) {
	      projsel.selectedIndex = i;
	      found_selected_project = 1;
	      break;
	    }
	  }
	  if (! found_selected_project) {
	    document.getElementById('project').selectedIndex=0;
	    document.getElementById('new_project').value=selected_project;
	    alert('The project selected in your metadata does not yet exist,\nit will be created upon job submission.');
	  } else {
	    alert('You have selected the existing project\n\n"'+selected_project+'"\n\nfor this upload. The selected jobs will be added to this project.');
	  }
	  document.getElementById("sel_project_pill").className = "pill_complete";
	  document.getElementById("icon_step_2").style.display = "";
	  check_submitable();
	} else {
	  alert(result[2]);
	  unselect_metadata_file();
	}
      });
  }
}