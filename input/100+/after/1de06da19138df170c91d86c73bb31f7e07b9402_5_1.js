function vxlActor(model){

  

  

  

  this.bb = []

  this.allocated = false;

  this.visible   = true;

  this.mode = vxl.def.actor.mode.SOLID;

  this.opacity = 1.0;

  this.colors = model?(model.colors!=null?model.colors:null):null;	//it will create colors for this actor once a lookup table had been set up

  

  this.position 	= vec3.create([0, 0, 0]);

  this.scale 		= vec3.create([1, 1, 1]);

  this.rotation 	= vec3.create([0, 0, 0]);

  

  this.program       = undefined;

  this.picking_color = undefined;

  

  this.renderers = [];

  this.buffers = [];

  this.clones  = 0;

  

  if (model){

  	this.model 	 = model;

  	this.name 	 = model.name;

  	this.diffuse = model.diffuse;

  	this.bb 	 = model.outline;

  	this.mode    = model.mode==undefined?vxl.def.actor.mode.SOLID:model.mode;

  }

  

}