function(val, debug)
   {
	   pre = "";
	   
	   if(!val)
	   {
		   if(this.id == "created" || this.id == "uploaded")
		   {
			   val = new Date().getTime().toString();
		   }
		   else if(this.id == "DeviceID")
		   {
			   val = "web";
		   }
		   else
		   {
			   val = "";
		   }
	   }
	   
	   if((!val) && (this.genkey || (this.required && this.hidden))) val = "web_" + new Date().getTime();
	   
	   if(this.crumb) pre = "<p>" + this.crumb + "</p>";
	   
	   //recursively check to see if this field is a key field from another form
	   //also need to make sure that 
	   var fkfrm;
	   var fkfld;
	   for(var frm = this.form; frm; frm = project.getPrevForm(frm.name))
	   {
		   if(frm.name == this.form.name) continue;
		   if(this.id == frm.key)
		   {
			   if(debug)
			   {
				   return pre + "<div>This is a key field from another form, when the form is being used a drop down list of keys from the previous form will appear here.</div>";
			   }
			   else
			   {
				   var pfield;
				   var pfrm = project.getPrevForm(frm.name);
				   if(pfrm && this.form.fields[pfrm.key])
				   {
					   pfield = pfrm.key;
				   }
				   else
				   {
					   pfield = false;
				   }
				   
				   this.required = true;
				   ctrl = "<select name=\""  + this.id + "\" id=\""  + this.id + "\"" + (fkfld ? " childcontrol=\"" + fkfld + "\"" : "") + " class=\"ecplus-input loading\" >";
				   //get options;
				   var cname = this.id;
				   var key = frm.key;
				   var title = frm.titleField;
				   
				   if(!this.callbacks) this.callbacks = {};
				   var cb = frm.name + new Date().getTime(); 
				   
				   window[cb] = function(data)
				   {
					  
					   for(var i = 0; i < data.length; i++)
					   {
						   $('#' + cname +'').append("<option value=\"" + data[i][key] +  "\" " + (pfield ? " parentvalue=\"" + data[i][pfield] + "\" " : "" ) + (val == data[i][key] ? " SELECTED" : "") + " >" +  data[i][title] + "</option>");
					   }
					   $('#' + cname +'').removeClass('loading');
					   delete window[cb];
				   }
				   
				  
				   ctrl += "</select>";
				   $.getJSON("./" + frm.name + ".json", undefined, window[cb]);
				   return pre + ctrl;
			   }
		   }
		   else
		   {
			   fkfrm = frm.name;
			   fkfld = frm.key;
		   }
	   }
		   
	   if(this.type == "branch")
	   {
		   return pre + "<div id=\"" + this.id + "\" class=\"ecplus-input\"><a href=\"javascript:project.forms['"+ this.form.name+"'].openBranch('" + this.connectedForm + "')\">Add Branch</a><p>This entry currently has <span>" +(val ? val : 0) +"</span> branch entries</p></div>";
	   }
	   else if(this.type == "select1")
	   {
		   ret =  "<select name=\"" + this.id + "\" id=\"" + this.id + "\" class=\"ecplus-input\" > ";
		   for(var i = 0; i < this.options.length; i++)
		   {
			   ret += "<option value=\"" + this.options[i].value + "\" " + (this.options[i].value == val ? "SELECTED" : "")  + ">" + this.options[i].label + "</option>";
		   }
		   ret +="</select>";
		   return pre +  ret;
	   }
	   else if(this.type == "select")
	   {
		   ret =  "";
		   for(var i = 0; i < this.options.length; i++)
		   {
			   ret = "<p id=\"" + this.id + "\"  class=\"ecplus-check-group ecplus-input\"><input type=\"checkbox\" name=\"" + this.name + "\" value=\"" + this.options[i].value + "\" " + (this.options[i].value == val ? "checked=\"checked\"" : "") + "><label>" + this.options[i].label + "</label></p>";
		   }
		   return pre + ret;
	   }
	   else if(this.type == "radio")
	   {
		   ret =  "<p id=\"" + this.id + "\" class=\"ecplus-radio-group ecplus-input\">";
		   for(var i = 0; i < this.options.length; i++)
		   {
			   ret += "<input type=\"radio\" name=\"" + this.id + "\" value=\"" + this.options[i].value + "\" " + (this.options[i].value == val ? "checked=\"checked\"" : "") + "><label>" + this.options[i].label + "</label><br />";
		   }
		   return pre + "</p>" + ret;
	   }
	   else if(this.type == "textarea")
	   {
		   return pre + "<textarea name=\"" + this.id + "\" id=\"" + this.id + "\" class=\"ecplus-input\">" + val + "</textarea>";
	   }
	   else if(this.date || this.setDate)
	   {
		   //Custom Date Picker
		   return pre + "<input type=\"date\" name=\"" + this.id + "\" value=\"" + val + "\" id=\"" + this.id + "\" class=\"ecplus-input\" />";
	   }
	   else if(this.time || this.setTime)
	   {
		   return pre + "<input type=\"time\" name=\"" + this.id + "\" value=\"" + val + "\" id=\"" + this.id + "\" class=\"ecplus-input\" />";
	   }
	   else if(this.type == "input" || this.type == "barcode")
	   {
		   return pre + "<input type=\"text\" name=\"" + this.id + "\" value=\"" + val + "\" id=\"" + this.id + "\" class=\"ecplus-input\" />";
	   }
	   else if(this.type == "video" || this.type == "audio" || this.type == "photo")
	   {
		   return pre + "<iframe id=\"" + this.id + "_iframe\" src=\"" + this.form.name + "/uploadMedia\" class=\"ecplus-input ecplus-media-input\" ></iframe><input type=\"hidden\" id=\"" + this.id + "\" name=\"" + this.id + "\" value=\"" + val + "\" />";
	   }
	   if(this.type == "location")
	   {
		   return pre + "<div id=\"" + this.id+ "\" class=\"locationControl ecplus-input\" ></div>";
	   }
	   else
	   {
		   return pre + "<input type=\"hidden\"id=\"" + this.id + "\" class=\"ecplus-input\" name=\"" + this.id + "\" value=\"" + val + "\" />";
	   }
   }