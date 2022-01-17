function(r) {
			    if(r.status == 'success') {
				$("#testplan-tree").jstree("refresh", -1);
			    }
			}