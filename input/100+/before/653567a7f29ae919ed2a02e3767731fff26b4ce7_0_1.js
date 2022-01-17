function(dom_id,config_override){
	
  // Default Configuration
	this.configuration = {
		title:"Buoy 44025: Sea Water Temperature",
		subtitle:"January 2012",
		station_id:"44025",
		start_date:"2012-01-01",
		end_date:"2012-02-01",
		color:"#6699CC",
  };

  // Datasource Configuration
  this.datasource = {
		agency:"IOOS",
		parameter:"sea_water_temperature",
		metadata:{ 
			name:"Sea Water Temperature", 
			qParam:"sea_water_temperature",
			column:"sea_water_temperature (C)",
			units:"&deg; C",
			units2:"Degrees Celcius",
	  }
  };
	
	// Identify the DOM element where the Visualization will be placed.
	if(typeof(dom_id)!="undefined") this.dom_element = dom_id; else this.dom_element = "ev";

	// the actual dom element container. this.id() performs additional 
	this.dom_container = this.id(); 
	
	// an empty object where datasets should be placed
	this.dataset={};
	
	// boolean to check is the object is ready to be drawn
	this.isDrawReady = false; 
	
	// graph specific properties
	this.graph = {
		domain:{
			y:{
				min:null,
				max:null
			},
			x:{ 
				min:null,
				max:null
			}
		},
		range:{
			y:{	
				min:null,
				max:null
			}
		}
	}
	
	// Create placeholder loading image
	this.loadingDiv();
	
	// do configuration overrides exist? if so, parse overrides
	this.parse_configuration(config_override);
	
	// parse dataset and draw graph
	this.parse_dataset();
	
}