function(data){
		if(isComplete == 1){
			dojo.addClass('tu_img_'+taskid,'tupImage');
			dojo.removeClass('tu_img_'+taskid,'tdownImage');
			dojo.byId('tu_img_'+taskid).onclick = function () { markTaskProgressEntry(taskid,0,id,week,year);};
			
		}else{
			dojo.addClass('tu_img_'+taskid,'tdownImage');
			dojo.removeClass('tu_img_'+taskid,'tupImage');
			dojo.byId('tu_img_'+taskid).onclick = function () { markTaskProgressEntry(taskid,1,id,week,year);};
		}
        if( dojo.byId('effort_score_'+id)){
            calculateWeeklyEffortScore(id);
        }

	}