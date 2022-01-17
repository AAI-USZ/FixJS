function saveModified(callback){
	$.post("/save_transcription/", $('.modified').serialize(),
		function(){
			console.log('saved');
			$('.modified').removeClass('modified');
			callback();
		});
}