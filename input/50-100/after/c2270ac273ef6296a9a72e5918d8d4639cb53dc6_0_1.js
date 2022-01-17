function(json) {
			$("#" + viewName + "Jobs").children("tr."+type).remove();
			for(job in json.jobs) {
				$("#" + viewName + "Jobs tr."+type+"-end").after(window[viewName+subType+"WriteJob"](json.jobs[job], type));
		 	}
			window[viewName+"InitDetails"](type);
		}