function(ev){



	this.lastX = this.x;

	this.lastY = this.y;

	

	this.x = ev.clientX;

    this.y = ev.clientY;

	



	if (!this.dragging) return;

	

	

	this.ctrlPressed = ev.ctrlKey;

	this.altPressed = ev.altKey;

	

	var dx = this.x - this.lastX;

	var dy = this.y - this.lastY;

	

	if (this.button == 0) { 

		if(this.altPressed){

			this.dolly(dy);

		}

		else{ 

			this.rotate(dx,dy);

		}

	}



	this.lastX = this.x;

    this.lastY = this.y; 



}