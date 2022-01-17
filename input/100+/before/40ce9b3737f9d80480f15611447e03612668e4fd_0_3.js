function(val, debug)
   {
	   pre = "";
	   
	   if(!val || (typeof val == 'string' && val.match(/null|undefined/i)))
	   {
		   //console.debug(this.id);
		   if(this.id == "created" || this.id == "uploaded")
		   {
			   val = new Date().getTime().toString();
		   }
		   else if(this.id == "DeviceID")
		   {
			   val = "web";
		   }
		   else if(this.genkey || (this.isKey && this.hidden))
		   {
			   val = "web_" + new Date().getTime();
		   }
		   else
		   {
			   val = "";
		   }
	   }
	   
	   
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
				  // ctrl = "<select name=\""  + this.id + "\" id=\""  + this.id + "\"" + (fkfld ? " childcontrol=\"" + fkfld + "\"" : "") + " class=\"ecplus-input loading\" >";
				   //get options;
				   var cname = this.id;
				   var key = frm.key;
				   var title = frm.titleField;
				   
			
				    
				   var ctrl = '<input name="' + cname + '-ac" id="' + cname +  '-ac" class="ecplus-input ecplus-ac loading" pfield="' + key + '" pform="' + frm.name + '" ' + (fkfld ? ' childcontrol="' + fkfld + '"' : '') + ' /><input type="hidden" name="' + cname + '" id="' + cname +  '" value="' + val + '" class="ecplus-input-hidden" />';
				   
				   if(val)
				   {
					   $.ajax({
						   url : baseUrl + '/../' + this.fkTable + '/title?term=' + val + '&key_from=true',
						   success : function(data, status, xhr)
						   {
							   $('#' + this.id + '-ac').val(data).removeClass('loading');
							   
						   },
						   context : this
					   })
				   }
					  
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
			   ret += "<option value=\"" + this.options[i].value + "\" " + (this.options[i].value == val || this.options[i].label == val ? "SELECTED" : "")  + ">" + this.options[i].label + "</option>";
		   }
		   ret +="</select>";
		   return pre +  ret;
	   }
	   else if(this.type == "select")
	   {
		   ret =  "";
		   for(var i = 0; i < this.options.length; i++)
		   {
			   ret += "<p id=\"" + this.id + "\"  class=\"ecplus-check-group ecplus-input\"><input type=\"checkbox\" name=\"" + this.name + "\" value=\"" + this.options[i].value + "\" " + (this.options[i].value == val || this.options[i].label == val ? "checked=\"checked\"" : "") + "><label>" + this.options[i].label + "</label></p>";
		   }
		   return pre + ret;
	   }
	   else if(this.type == "radio")
	   {
		   ret =  "<p id=\"" + this.id + "\" class=\"ecplus-radio-group ecplus-input\">";
		   for(var i = 0; i < this.options.length; i++)
		   {
			   var regex = new RegExp('/(^|,)' + this.options[i].value + '|' + this.options[i].label + '(,|$)/');
			   ret += "<input type=\"radio\" name=\"" + this.id + "\" value=\"" + this.options[i].value + "\" " + (val.match(regex) ? "checked=\"checked\"" : "") + "><label>" + this.options[i].label + "</label><br />";
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
		   
		   return pre + "<input type=\"time\" name=\"" + this.id + "\"  value=\"" + val + "\" id=\"" + this.id + "\" class=\"ecplus-input\" />";
	   }
	   else if(this.type == "input" || this.type == "barcode")
	   {
		   var valstring = val ? "value=\"" + val + "\"" : "";		   
		   return pre + "<input type=\"text\" name=\"" + this.id + "\" " + valstring + " id=\"" + this.id + "\" class=\"ecplus-input\" />";
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