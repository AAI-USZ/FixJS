function update_inbox (data, files, action) {
  if (data) {
    var flist = DataStore['user_inbox'][user.login].files;
    var dlist = DataStore['user_inbox'][user.login].directories;
    var messages = DataStore['user_inbox'][user.login].messages;

    var sequence_files = [];
    var metadata_files = [];

    var html = '<table><tr><td rowspan=2 style="padding-right: 20px;"><form class="form-horizontal">';
    html += '<select id="inbox_select" multiple style="width: 420px; height: 200px;">';
    var seq_dlist = [];
    var seqs_in_dir = false;
    for (var i=0; i<dlist.length; i++) {
      html += "<optgroup title='this is a directory\nclick to toggle open / close' open=0 label='[ "+dlist[i]+" ] - "+DataStore['user_inbox'][user.login].fileinfo[dlist[i]].length+" files' onclick='if(event.originalTarget.nodeName==\"OPTGROUP\"){if(this.open){this.open=0;for(var i=0;i<this.childNodes.length;i++){this.childNodes[i].style.display=\"none\";}}else{this.open=1;for(var i=0;i<this.childNodes.length;i++){this.childNodes[i].style.display=\"\";}}}'>";
      for (var h=0; h<DataStore['user_inbox'][user.login].fileinfo[dlist[i]].length; h++) {
	var fn = DataStore['user_inbox'][user.login].fileinfo[dlist[i]][h];
	if (fn.match(is_a_sequence_file_ending)) {
	  seq_dlist[dlist[i]] = 1;
	  seqs_in_dir = true;
	}
	  if (seq_dlist[dlist[i]] == 1 && ! DataStore['user_inbox'][user.login].fileinfo[dlist[i]+"/"+fn]['bp count']) {
	      html += "<option style='display: none; padding-left: 35px; color: gray;' title='the sequence stats computation for this file is still running' value='"+dlist[i]+"/"+fn+"'>"+fn+"</option>";
	  } else {
	      html += "<option style='display: none; padding-left: 35px;' value='"+dlist[i]+"/"+fn+"'>"+fn+"</option>";
	  }
      }
      html += "</optgroup>";
    }
    for (var i=0; i<flist.length; i++) {
      var isSeq = flist[i].match(is_a_sequence_file_ending);
      if (isSeq) {
	sequence_files[sequence_files.length] = flist[i];
      }
      var isMet = flist[i].match(/\.xls(x)?$/);
      if (isMet) {
	metadata_files[metadata_files.length] = flist[i];
      }
	if (isSeq && ! DataStore['user_inbox'][user.login].fileinfo[flist[i]]['bp count']) {
	    html += "<option title='the sequence stats computation for this file is still running' style='color: gray;'>"+flist[i]+"</option>";
	} else {
	    html += "<option>"+flist[i]+"</option>";
	}

    }
    html += '</select>';
    html += '</form></td><td id="inbox_feedback"></td></tr><tr><td id="inbox_file_info"></td></tr></table>';
    document.getElementById('inbox').innerHTML = html;

    if (messages.length) {
      document.getElementById('inbox_feedback').innerHTML = "<h4>Info</h4>"+messages.join("<br>");
    }

    if ((sequence_files.length || seqs_in_dir) && ! selected_sequence_file) {
      var tdata = [];
      for (var i in seq_dlist) {
	for (var h=0; h<DataStore['user_inbox'][user.login].fileinfo[i].length; h++) {
	  // 'select', 'directory', 'filename', 'format', 'size', 'upload date', 'bp count', 'sequencing method', 'sequence type', 'md5'
	  var fn = DataStore['user_inbox'][user.login].fileinfo[i][h];
	  if (fn.match(is_a_sequence_file_ending)) {
	    var inf = DataStore['user_inbox'][user.login].fileinfo[i+'/'+fn];
	    if (inf && inf['bp count'] && inf['file type'] != 'malformed' && inf['unique id count'] && inf['sequence count'] && inf['unique id count'] == inf['sequence count']) {
	      var trow = [ 0, i, fn, inf['format'], inf['file size'], inf['creation date'], inf['bp count'], inf['sequencing method guess'], inf['sequence type'], inf['file checksum'], tdata.length ];
	      tdata[tdata.length] = trow;
	    }
	  }
	}
      }
      
      for (var i=0; i<sequence_files.length; i++) {
	  var fn = sequence_files[i];
	  var inf = DataStore['user_inbox'][user.login].fileinfo[fn];
	  if (inf && inf['bp count'] && inf['file type'] != 'malformed' && inf['unique id count'] && inf['sequence count'] && inf['unique id count'] == inf['sequence count']) {
	    var trow = [ 0, "-", fn, "-", inf['file size'], inf['creation date'], inf['bp count'], inf['sequencing method guess'], inf['sequence type'], inf['file checksum'], tdata.length ];
	    tdata[tdata.length] = trow;
	  }
      }
      initialize_table(0, tdata);
    }
    if (! selected_metadata_file) {
      html = "<div><h3>available metadata files</h3><table><tr><td><form class='form-horizontal'><select id='metadata_file_select' multiple style='width: 420px; height: 200px;'>";
      for (var i=0; i<metadata_files.length; i++) {
	html += "<option>"+metadata_files[i]+"</option>";
      }
      html += "</select><br><p><input type='checkbox' value='no_metadata' name='no_metadata' id='no_metadata' onclick=\"if(this.checked){alert('INFO\\nNot submitting metadata will severely lower your priority in the computation queue.\\nYou will also not be able to make your data public until you provide metadata for it.');}\"> I do not want to supply metadata</p> <input type='button' class='btn' value='select' onclick='select_metadata_file();'></form></td><td><p id='metadata_file_info' style='margin-left: 20px;'></p></td></tr></table></div>";
      document.getElementById("sel_mdfile_div").innerHTML = html;
      document.getElementById('inbox_select').onchange = function () {
	var fn = this.options[this.selectedIndex].value;
	if (DataStore.user_inbox[user.login].fileinfo && DataStore.user_inbox[user.login].fileinfo[fn]) {
	  var ptext = "<h4>File Information</h4><br>";
	    if (DataStore.user_inbox[user.login].fileinfo[fn]['unique id count'] && DataStore.user_inbox[user.login].fileinfo[fn]['sequence count'] && DataStore.user_inbox[user.login].fileinfo[fn]['unique id count'] != DataStore.user_inbox[user.login].fileinfo[fn]['sequence count']) {
		ptext += '<div class="alert alert-error"><button class="close" data-dismiss="alert" type="button">x</button><strong>Warning</strong><br>The unique id count does not match the sequence count. You will not be able to use this file for submission.</div>';

	    }
	    ptext += "<table>";
	  for (i in DataStore.user_inbox[user.login].fileinfo[fn]) {
	    ptext += "<tr><td><b>"+i+"</b></td><td style='padding-left: 5px;'>"+DataStore.user_inbox[user.login].fileinfo[fn][i]+"</td></tr>";
	  }
	  ptext += "</table>";
	  document.getElementById('inbox_file_info').innerHTML = ptext;
	} else {
	  document.getElementById('inbox_file_info').innerHTML = "";
	}
      }
    }
  } else {
    if (action != 'upload_complete' && document.getElementById('inbox_feedback') && document.getElementById('inbox_feedback').innerHTML.match(/^\<img/)) {
      alert('The inbox is already performing an operation.\nPlease wait for this to finish.');
      return 0;
    }

    var params = [];
    params['query'] = [];
    params['query'][params['query'].length] = 'auth';
    params['query'][params['query'].length] = user.auth;
    var loading_info = " updating...<br><br>";
    if (action && action == "upload_complete") {
      loading_info = "New files were added. If the upload contained sequence files, they will be processed for statistics. This process might take up to one minute.";
    }
    if (files) {
      params['query'][params['query'].length] = 'faction';
      params['query'][params['query'].length] = action;
      if (action == "del") {
	loading_info += "Deleting file(s):";
      } else if (action == "convert") {
	loading_info += "Converting sff file(s) to fastq. The resulting files will be processed for statistics. This will take a few minutes, depending on the file size.<br><br>";
      } else if (action == "demultiplex") {
	loading_info += "Demultiplexing in progress. The resulting files will be processed for statistics. This will take a few minutes, depending on the number of files and file size.<br><br>";
      }
      for (var i=0; i<files.length; i++) {
	params['query'][params['query'].length] = 'fn';
	params['query'][params['query'].length] = files[i];
	loading_info += "<br>"+files[i];
      }
    }
    if (document.getElementById('inbox_feedback')) {
      document.getElementById('inbox_feedback').innerHTML = "<img src='./Html/ajax-loader.gif'>"+loading_info;
    }

    get_objects('user_inbox', params, update_inbox, 1);    
  }
}