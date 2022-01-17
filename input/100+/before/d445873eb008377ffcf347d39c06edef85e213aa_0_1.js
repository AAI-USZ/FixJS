function LensToy(input){

	// Set some variables
	this.id = (input && typeof input.id=="string") ? input.id : "LensToy";
	this.src = (input && typeof input.src=="string") ? input.src : "";
	this.width = (input && typeof input.width=="number") ? input.width : 100;
	this.height = (input && typeof input.height=="number") ? input.height : 100;
	this.events = {load:"",click:"",mousemove:""};	// Let's define some events


	this.img = { complete: false };
	this.stretch = "linear";
	this.color = "gray";

	this.setup(this.id);

	if(this.src) this.load(this.src);
}