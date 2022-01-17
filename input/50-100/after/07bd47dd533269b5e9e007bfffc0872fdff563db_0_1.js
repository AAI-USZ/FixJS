function(key) {
	    var name = data.departments[key][1];
	    var id   = data.departments[key][0];
	    $("#dept_doc_v").append("<option val=" + id + ">" + name 
				    + "</option>");
	}