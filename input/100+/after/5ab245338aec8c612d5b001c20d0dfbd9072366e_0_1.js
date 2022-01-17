function read(words){
	var startPos = wordsPos;
	
	if (wordsPos < words.length && !hasBuzzed && !hasLeft){
		$('#scroll').hide()
		$('#scroll2').show()
		$('#qs').append('<span style=\'color: purple;\'>' + words[wordsPos] + ' </span>');
		
		wordsPos += 1;
		setTimeout(function(){ read(words); }, 350);
	}
	
	function skip() {
		if (!hasBuzzed){
			hasBuzzed = true;
			$('#prompt').val('skip ' + wordsPos.toString()); $('#command').submit();
		}
	}
	
	if (startPos == words.length){
		setTimeout(skip, 5000);
	}
}