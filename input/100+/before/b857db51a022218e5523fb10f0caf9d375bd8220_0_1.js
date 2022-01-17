function select_sequence_file () {
  if ((document.getElementById("sel_md_pill").className == "pill_incomplete") && (document.getElementById("sel_project_pill").className = "pill_incomplete")) {
    alert("You must either select a metadata file in Step 1\nor choose a project in Step 2 before selecting sequence file(s).");
    return false;
  }
  console.log([document.getElementById("sel_md_pill").className, document.getElementById("sel_project_pill").className, selected_no_metadata, selected_project]);
  var sel = document.getElementById('sequence_file_select');
  selected_sequence_files = [];
  var has_fasta = 0;
  var has_fastq = 0;
  for (i=0; i<table_input_columns_data[0].length; i++) {
    if (table_input_columns_data[0][i][0] == 1) {
      var fn = table_data[0][i][2];
      if (fn.match(/(fasta|fa|faa)$/)) {
	has_fasta = 1;
      }
      if (fn.match(/(fastq|fq)$/)) {
	has_fastq = 1;
      }
      if (table_data[0][i][1] != "-") {
	fn = table_data[0][i][1] + '/' + fn;
      }
      selected_sequence_files.push(fn);
    }
  }

  if (selected_sequence_files.length == 0) {
    alert("You did not select a sequence file");
  } else if (selected_sequence_files.length > 1) {
    if (selected_libraries.length == 0) {
      if (selected_no_metadata && (! selected_project)) {
	alert('WARNING: You have selected not to supply metadata but have not selected a project.\n Please select a project in Step 2.');
	return 0;
      }
      if ((document.getElementById("sel_md_pill").className == "pill_complete") && (! selected_no_metadata)) {
	alert('WARNING: You have selected more than one sequence file,\nbut you metadata file does not include any library information.\nEither select a single sequence file, or correct your metadata file.');
	return 0;
      }
    } else {
      if (selected_sequence_files.length == selected_libraries.length) {
	var valid = 1;
	var broken = "";
	for (i=0;i<selected_sequence_files.length; i++) {
	  var start = 0;
	  if (selected_sequence_files[i].indexOf('/') > -1) {
	    start = selected_sequence_files[i].lastIndexOf('/') + 1;
	  }
	  var fn = selected_sequence_files[i].substr(start, selected_sequence_files[i].lastIndexOf('.'));
	  var found = 0;
	  for (h=0; h<selected_libraries.length; h++) {
	    if (selected_libraries[h] == fn) {
	      found = 1;
	      break;
	    }
	  }
	  if (! found) {
	    valid = 0;
	    broken = selected_sequence_files[i];
	    break;
	  }
	}
	if (! valid) {
	  alert("WARNING: The libraries in your selected metadata file do\nnot match the selected sequence files, i.e. the sequence\nfile "+broken+" does not have a matching library ("+fn+").\nThe metagenome_name field in library should match your sequence file name (minus extension).\nEither correct your metadata file or change your sequence file selection.");
	  return 0;
	}
      } else if (selected_sequence_files.length < selected_libraries.length) {
	var valid = 1;
	var broken = "";
	for (i=0;i<selected_sequence_files.length; i++) {
	  var fn = selected_sequence_files[i].substr(0, selected_sequence_files[i].lastIndexOf('.'));
	  var found = 0;
	  for (h=0; h<selected_libraries.length; h++) {
	    if (selected_libraries[h] == fn) {
	      found = 1;
	      break;
	    }
	  }
	  if (! found) {
	    valid = 0;
	    broken = selected_sequence_files[i];
	    break;
	  }
	}
	if (! valid) {
	  alert("WARNING: The libraries in your selected metadata file do\nnot match the selected sequence files, i.e. the sequence\nfile "+broken+" does not have a matching library.\nEither correct your metadata file or change your sequence file selection.");
	  return 0;
	} else {
	  if (! confirm("WARNING: Your metadata contains more libraries than you have sequence files selected.\nHowever, all selected sequence files have a matching library.\n\nDo you want to continue?")) {
	    return 0;
	  }
	}
      } else {
	alert("WARNING: The number of libraries in your metadata file is less than\nthe number of selected sequence files.\nEither correct your metadata file or change your sequence file selection.");
	return 0;
      }
    }
  } else if (selected_libraries.length > 1) {
    alert("WARNING: You have selected a single sequence file, but specified\nmultiple libraries in your metadata file. Either update your metadata\nfile or select more sequence files.");
    return 0;
  }

  if (has_fasta) {
    document.getElementById('filter_ln').disabled = false;
    document.getElementById('deviation').disabled = false;
    document.getElementById('filter_ambig').disabled = false;
    document.getElementById('max_ambig').disabled = false;
  } else {
    document.getElementById('filter_ln').disabled = true;
    document.getElementById('deviation').disabled = true;
    document.getElementById('filter_ambig').disabled = true;
    document.getElementById('max_ambig').disabled = true;
  }
  if (has_fastq) {
    document.getElementById('dynamic_trim').disabled = false;
    document.getElementById('min_qual').disabled = false;
    document.getElementById('max_lqb').disabled = false;
  } else {
    document.getElementById('dynamic_trim').disabled = true;
    document.getElementById('min_qual').disabled = true;
    document.getElementById('max_lqb').disabled = true;
  }
  var html = "<h4>selected sequence files</h4><br><p>The following "+selected_sequence_files.length+" sequence files have queued for submission:</p><p><i>"+selected_sequence_files.join("</i><br><i>")+"</i><br><br><input type='button' class='btn' value='unselect' onclick='unselect_sequence_file();'><input type='hidden' name='seqfiles' value='"+selected_sequence_files.join("|")+"'>";
  document.getElementById("selected_sequences").innerHTML = html;
  document.getElementById("available_sequences").style.display = 'none';
  document.getElementById("sel_seq_pill").className = "pill_complete";
  document.getElementById("icon_step_3").style.display = "";
  check_submitable();
}