function(id, control){
	
	var self = this;
	
	console.log("ID: " + id + "  Control Type: " + control.type);

	var ctrl;
	switch(control.type){
		case "textbox":
	
			var lbl = $("<label />")
				.attr({'for':id}) //'title':control.tooltip
				.html(control.label);

			var input = document.createElement("input");
			$(input)
				.attr({
					'id':id,
					'type':'textbox',
					'value':control.default_value,
					'title':control.tooltip,
					'maxlength':typeof(control.maxlength)=="undefined"?"":control.maxlength
				})
				.addClass("span2");

			ctrl = $("<div></div>").addClass("control").append(lbl).append(input);
			
			break;
		
		case "dropdown":

			var lbl = $("<label />")
				.attr({'for':id,'title':control.tooltip})
				.html(control.label);
				
			// create select element and populate it
			var select = $("<select></select>")
				.addClass("span2")
				.attr({"id":id})
				.change(function(){
					self.updateJSON()
				});
			
			$.each(control.options,function(option){
				opt = control.options[option];	
				$(select).append($('<option></option>').val(opt.value).html(opt.name));
			});
			
			ctrl = $("<div></div>").addClass("control").append(lbl).append(select);
		
			break;
		
		case "checkbox":
		
			var lbl = $("<label />")
				.attr({'for':id,'title':control.tooltip})
				.html(control.label);
			
			var input = document.createElement("input");
			$(input)
				.attr({
					'id':id,
					'type':'checkbox',
					//'value':control.default_value,
					'title':control.tooltip,
					'maxlength':typeof(control.maxlength)=="undefined"?"":control.maxlength,
					//'onclick':function(){alert("test");}
				});
			if(control.selected) $(input).attr({'checked':'checked'})
		
			ctrl = $("<div></div>").addClass("control").append(lbl).append(input);
			
			break;
				
		case "svg":

			var ctrl = document.createElement("svg");
			
			break;
		
		case "datepicker":
			
			var el_lbl = $("<label />")
				.attr({'for':id+"_dp",'title':control.tooltip})
				.html(control.label);
			
			var el_input = $("<input />")
				.attr({"id":id,"type":"text"})
				.addClass("readonly span2")
				.val(control.default_value);
				
			var el_i = $("<i></i>").css("background-color",control.default_value);
			var el_span = $("<span></span>").addClass("add-on").append(el_i);
			
			var el_div = $("<div></div>")
				.addClass("input-append date")
				.attr({"id":id+"_cp","data-date":control.default_value,"data-date-format":"yyyy-mm-dd"})
				.append(el_input)
				.append(el_span);
				
			$(el_div).datepicker()
			 .on("changeDate",function(dp){	
 				self.updateJSON();			
 			});
				
			ctrl = $("<div></div>")
					.addClass("control ctlhandle")
					.append(el_lbl)
					.append(el_div);
					
			break;
			
		case "colorpicker":
		
			// recursive function to call text box and apply color picker on top of it
			//control.type="textbox";
			
			//ctrl = self.draw_control(id,control);
			//ctrl = self.draw_control(id+"_cp",control);

			// find the textbox in the control and init colorpicker
			var el_lbl = $("<label />")
				.attr({'for':id+"_cp",'title':control.tooltip})
				.html(control.label);
			
			var el_input = $("<input />")
				.attr({"id":id,"type":"text"})
				.addClass("readonly span2")
				.val(control.default_value);
				
			var el_i = $("<i></i>").css("background-color",control.default_value);
			var el_span = $("<span></span>").addClass("add-on").append(el_i);
			
			var el_div = $("<div></div>")
				.addClass("input-append color")
				.attr({"id":id+"_cp","data-color":control.default_value,"data-color-format":"hex"})
				.append(el_input)
				.append(el_span)
				
			$(el_div).colorpicker().on("changeColor",function(cp){
				$("#"+id).val(self.current_config[id] = cp.color.toHex())	
				self.updateJSON();			
			});
				
			ctrl = $("<div></div>")
					.addClass("control ctlhandle")
					.append(el_lbl)
					.append(el_div);
			
			break;
		
		default: 
			ctrl = document.createElement("div");
			break;
			
			// recursive needs removed when converting bootstrap elements to components
			// 
			// recursive function to call text box and apply date picker on top of it
			// 		// change the control type to text box and create textbox control
			// 		//control.type = "textbox";
			// 		ctrl = self.draw_control(id,control);
			// 		//ctrl = self.draw_control(id+"_dp",control);
	}
	
	
	// now attach the popover to the div container for the control
	$(ctrl)
		.attr({'rel':'popover','title':control.label,'data-content':control.tooltip})
		.popover();
	
	return ctrl;
	
}