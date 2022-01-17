function(data) {
					var questionlist = JSON.parse(data.responseText);
					questionlist = questionlist.resultlist;
					Y.one("#ls_list_questions ul").set('innerHTML','');
					for(var i=0;i<questionlist.length;i++){
						var tagList = questionlist[i].tags.split(',');
						var tagSpan = '';
						for(var j=0;j<tagList.length;j++){
							if(tagList[j]){
								tagSpan += '<li class="lr_tag_item">'+tagList[j]+'</li> ';
							}
						}
						var listitem = '<li class="lr_question_list_content"><div class="lr_user_image"></div><div class="lr_question_text">'+questionlist[i].question_text+'</div>'+
										'<ul><a href="question/index.php?id='+questionlist[i].id+'"><li class="lr_question_answer_link">Answer this question</li></a></ul>'+
										'<div style="clear:both"></div>'+
										'<ul class="lr_tag_list">'+tagSpan+'</ul><div style="clear:both"></li>';
						Y.one("#ls_list_questions ul").append(listitem);
					}
				}