function(container) {
	this.html_pointer = this.document.getElementsByTagName('html')[0]
	if(!this.html_pointer) {
		this.html_pointer = this.createElement('html');
		this.document.documentElement.appendChild(this.html_pointer);
	}
	if(container == 'html') return;
	if(!this.head_pointer) {
		this.head_pointer = this.document.getElementsByTagName('head')[0]
		if(!this.head_pointer) {
			this.head_pointer = this.createElement('head');
			this.html_pointer.appendChild(this.head_pointer);
		}
	}
	if(container == 'head') return;
	this.body_pointer = this.document.getElementsByTagName('body')[0]
	if(!this.body_pointer) {
		this.body_pointer = this.createElement('body');
		this.html_pointer.appendChild(this.body_pointer);
	}
}