function(){
				getCode(query.id,writeCodeLines,handleAjaxError);
				$('#text').val('');
				closeCommentBox();
			}