function(){
		var nextBtn = document.getElementById('next'),
			prevBtn = document.getElementById('prev'),
			stopBtn = document.getElementById('stop'),
			playBtn = document.getElementById('play'),
			removeBtn = document.getElementById('remove'),
			resetBtn = document.getElementById('reset'),
			saveBtn = document.getElementById('save');

		//chcek if action buttons are enabled then apply action functions to them
		if(playBtn){			
			playBtn.onclick = function(){
				resetAutoPlayOnClick();
			};
		};
		if(stopBtn){
			stopBtn.onclick = function(){
				stopAnimation();
			};
		};
		if(removeBtn){
			removeBtn.onclick = function(){
				removeCurrent();
			};
		};
		if(resetBtn){
			resetBtn.onclick = function(){
				resetAnimation();
			};
		};
		if(saveBtn){
			saveBtn.onclick = function(){
				var stringAction = 'Save';
				saveCurrent(stringAction);
			};
		};
		if(nextBtn && prevBtn){
			//move slider to right
			nextBtn.onclick = function(){
				resetAutoPlayOnClick();
				moveRight();
			};
			//move slider to left
			prevBtn.onclick = function(){
				resetAutoPlayOnClick();
				moveLeft();
			};
		};
	}