function generate_complexity_row(){
	var html = '';
	html = html + '	              <tr id="complexity_row">';
	html = html + '	                <td class="letContentExpand" colspan="1">';
	html = html + '	                  <div>';
	html = html + '	                    <select id="new_story_complexity" class="gt-SdField" name="new_story_complexity" >';
	html = html +                         generate_complexity_dropdown();
	html = html + '	                    </select>';
	html = html + '	                  </div>';
	html = html + '	                </td>';
	html = html + '	                <td class="gt-SdLabelIcon" colspan="1">';
	html = html + '	                  <div class="gt-SdLabelIcon">';
	html = html + '	                    <img src="/images/dice_NO.png" id="new_story_type_image" name="new_story_type_image">';
	html = html + '	                  </div>';
	html = html + '	                </td>';
	html = html + '	                <td class="helpIcon lastCell" colspan="1">';
	html = html + '	                  <div class="helpIcon" id="story_newStory_details_help_story_types">';
	html = html + '	                    <img id="help_image_complexity" src="/images/question_mark.gif"  class="help_question_mark">';
	html = html + '	                  </div>';
	html = html + '	                </td>';
	html = html + '	              </tr>';
	return html;
	
}