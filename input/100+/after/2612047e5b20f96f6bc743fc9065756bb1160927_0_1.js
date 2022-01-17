function writeSentence(i, showSpaces) {
	var num_words = 0;
	var text = '';
	text += '<div align=center><table id="wholesentence"><tr align=center>';
	for ( var j = 0; j < words[i].length; j++) {
		var word = words[i][j];
		if (word != "") {
			text += '<td><div class="space" id="' + j + '"> </div></td>';
			text += '<td><div class="word" id="word_' + i + '_' + j
					+ '" onClick="onClick(' + i + ', ' + j
					+ ')"  onMouseOver="mouseOverWord(' + i + ', ' + j
					+ ')" onMouseOut="leaveWord(' + i + ', ' + j + ')">';
			text += word;
			text += '</div> </td>';
		}
		num_words += 1
		if(!showSpaces && num_words == 15){
			text+='</tr><tr align=center>';
			num_words = 0;
		}
		if(showSpaces && num_words == 10){
			text+='</tr><tr align=center>';
			num_words = 0;
		}
	}
	text += '<td><div class="space" id="' + words[i].length + '"> </div></td>';
	text += '</tr></table></div>';
	return text;
}