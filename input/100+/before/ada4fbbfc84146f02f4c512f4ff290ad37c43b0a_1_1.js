function () {
	var fn = this.options[this.selectedIndex].value;
	if (DataStore.user_inbox[user.login].fileinfo && DataStore.user_inbox[user.login].fileinfo[fn]) {
	  var ptext = "<h4>File Information</h4><br><table>";
	  for (i in DataStore.user_inbox[user.login].fileinfo[fn]) {
	    ptext += "<tr><td><b>"+i+"</b></td><td style='padding-left: 5px;'>"+DataStore.user_inbox[user.login].fileinfo[fn][i]+"</td></tr>";
	  }
	  ptext += "</table>";
	  document.getElementById('inbox_file_info').innerHTML = ptext;
	} else {
	  document.getElementById('inbox_file_info').innerHTML = "";
	}
      }