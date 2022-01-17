function saveModified(callback){
	/*
	$.post("/save_transcription/", $('.modified').serialize(),
		function(){
			console.log('saved');
			$('.modified').removeClass('modified');
			callback();
		});
	*/
	$.ajax({
		type: 'POST',
		url: "/save_transcription/",
		data: $('.modified').serialize(),
		success: function(){
			console.log('saved');
			$('.modified').removeClass('modified');
			callback();
		}
	}).fail(function( xhr ) {
		$('body').replaceWith($('<pre>').text(xhr.responseText));
	});
}