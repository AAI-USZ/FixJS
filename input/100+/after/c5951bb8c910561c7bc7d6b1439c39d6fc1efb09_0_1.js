function () {
	var fn = this.options[this.selectedIndex].value;
	if (DataStore.user_inbox[user.login].fileinfo && DataStore.user_inbox[user.login].fileinfo[fn]) {
	    var ptext = "<h4>File Information</h4><br>";
	    var inf = DataStore.user_inbox[user.login].fileinfo[fn]
	    if (inf['file type'] && (inf['file type'] == 'malformed')) {
		ptext += '<div class="alert alert-error"><button class="close" data-dismiss="alert" type="button">x</button><strong>Warning</strong><br>This is a malformed / unidentifiable sequence file. You will not be able to use this file for submission.</div>';
	    }
	    else if (inf['Error']) {
		ptext += '<div class="alert alert-error"><button class="close" data-dismiss="alert" type="button">x</button><strong>Warning</strong><br>There was an error in the sequence stats computation:<br><span style="padding-left: 10px;"><pre>'+inf['Error']+'</pre></span><br>You will not be able to use this file for submission.</div>';
	    }
	    else if (inf['unique id count'] && inf['sequence count'] && (inf['unique id count'] != inf['sequence count'])) {
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