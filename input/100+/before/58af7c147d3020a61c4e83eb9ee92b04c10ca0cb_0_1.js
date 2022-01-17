function (field) {
				
		 		var fieldVelocityVarName = field["fieldVelocityVarName"];
		 		var fieldContentlet = field["fieldContentlet"];
				var value = "";
		       					
				var type = field["fieldFieldType"];
			    if(type=='checkbox'){ 
			    	//checkboxes fields
				    var option = field["fieldValues"].split("\r\n");
			    
				    var result="";
				    
				    for(var i = 0; i < option.length; i++){
				       var actual_option = option[i].split("|");
				       if(actual_option.length > 1 && actual_option[1] !='' && actual_option[1].length > 0) {
				    	    var checkId=this.structureVelVar+"."+ fieldVelocityVarName + "Field-D"+ this.dialogCounter+"-O"+i;
				       		result = result + "<input type=\"checkbox\" dojoType=\"dijit.form.CheckBox\" value=\"" + actual_option[1] + "\" "+
				       		                         "id=\"" + checkId +"\" "+
				       		                         "name=\"" + this.structureVelVar+"."+ fieldVelocityVarName + this.dialogCounter + "\"> " + 
				       		                         actual_option[0] + "<br>\n";
				       		if(!this.checkboxesIds[this.dialogCounter])
				       			this.checkboxesIds[this.dialogCounter]=new Array();
				       	    this.checkboxesIds[this.dialogCounter][this.checkboxesIds[this.dialogCounter].length] = checkId;
				       	 	this.setDotFieldTypeStr = this.setDotFieldTypeStr 
				       	 						+ "dojo.attr("
				       	 						+ "'" + checkId + "'"
				       	 						+ ",'" + this.DOT_FIELD_TYPE + "'"
				       	 						+ ",'" + type + "');";
				       	}
				    }
				    return result;
			    
			  }else if(type=='radio'){
				  dijit.registry.remove(this.structureVelVar+"."+ fieldVelocityVarName +"Field" + this.counter_radio);
				    //radio buttons fields
				    var option = field["fieldValues"].split("\r\n");
				    var result="";
				    
				    for(var i = 0; i < option.length; i++){
				       var actual_option = option[i].split("|");
				       if(actual_option.length > 1 && actual_option[1] !='' && actual_option[1].length > 0){
				       		result = result + "<input type=\"radio\" dojoType=\"dijit.form.RadioButton\" value=\"" + actual_option[1] + "\" id=\"" + this.structureVelVar+"."+ fieldVelocityVarName + "Field"+ this.counter_radio+"\" name=\"" + this.structureVelVar+"."+ fieldVelocityVarName + "\"> " + actual_option[0] + "<br>\n";
				       		 if(!this.radiobuttonsIds[this.dialogCounter])
				       			this.radiobuttonsIds[this.dialogCounter]=new Array();
				       		 this.radiobuttonsIds[this.dialogCounter][this.radiobuttonsIds[this.dialogCounter].length] = this.structureVelVar+"."+fieldVelocityVarName + "Field"+ this.counter_radio;

				       		 this.setDotFieldTypeStr = this.setDotFieldTypeStr 
			 						+ "dojo.attr("
			 						+ "'" + this.structureVelVar+"."+fieldVelocityVarName + "Field" + this.counter_radio + "'"
			 						+ ",'" + this.DOT_FIELD_TYPE + "'"
			 						+ ",'" + type + "');";
			 								       		 
				       		 this.counter_radio++;
				       	}
				    }
				    return result;
			    
			  }else if(type=='select' || type=='multi_select'){
				    var fieldId=this.structureVelVar+"."+ fieldVelocityVarName +"Field" + this.dialogCounter;
			  		dijit.registry.remove(fieldId);
				    var option = field["fieldValues"].split("\r\n");
				    var result="";
				    if (type=='multi_select')
						result = result+"<select  dojoType='dijit.form.MultiSelect'  multiple=\"multiple\" size=\"4\" id=\"" + fieldId + "\" name=\"" + this.structureVelVar+"."+ fieldVelocityVarName + "\">\n";
					else 
						result = result+"<select  dojoType='dijit.form.FilteringSelect' id=\"" + fieldId + "\" style=\"width:160px;\" name=\"" + this.structureVelVar+"."+ fieldVelocityVarName + "\">\n<option value=\"\">None</option>";
					
				    for(var i = 0; i < option.length; i++){
				       var actual_option = option[i].split("|");
				       if(actual_option.length > 1 && actual_option[1] !='' && actual_option[1].length > 0){
							auxValue = actual_option[1];
				       	    if(fieldContentlet.indexOf("bool") != -1)
				       	    {
					        	if(actual_option[1] == "true" || actual_option[1] == "t" || actual_option[1] == "1")
					            {
					            	auxValue = 't';
					            }else if(actual_option[1] == "false" || actual_option[1] == "f" || actual_option[1] == "0")
					            {
						        	auxValue = 'f';
					            }
					        }
				       		result = result + "<option value=\"" + auxValue + "\" >"+actual_option[0]+"</option>\n";
				       	}
				    }

		      		 this.setDotFieldTypeStr = this.setDotFieldTypeStr 
											+ "dojo.attr("
											+ "'" + fieldId + "'"
											+ ",'" + this.DOT_FIELD_TYPE + "'"
											+ ",'" + type + "');";
				    
				    result = result +"</select>\n";
				    return result;
			    
			  }else if(type=='tag'){ 
					var result="<table style='width:200px;' border=\"0\">";
					result = result + "<tr><td style='padding:0px;'>";
					result = result +"<textarea id=\"" + this.structureVelVar+"."+ fieldVelocityVarName + "Field " + this.dialogCounter
									+ "Field\" name=\"" + this.structureVelVar+"."+ fieldVelocityVarName 
									+ "Field\" cols=\"20\" rows=\"2\" onkeyup=\"suggestTagsForSearch(this,'"
									+ this.structureVelVar+"."+ fieldVelocityVarName + "suggestedTagsDiv" + this.dialogCounter + "');\" " 
									+ " style=\"border-color: #7F9DB9; border-style: solid; border-width: 1px; "
									+ " font-family: Verdana, Arial,Helvetica; font-size: 11px; height: 50px; width: 160px;\" "
									+ " ></textarea><br/><span style=\"font-size:11px; color:#999;\"> " 
									+ this.tagTextValue
									+ " </span> "  
									+ " </td></tr>";
					result = result + "<tr><td valign=\"top\" style='padding:0px;'>";
					result = result + "<div id=\"" + this.structureVelVar+"." + fieldVelocityVarName + "suggestedTagsDiv" + this.dialogCounter + "\" "
									+ " style=\"height: 50px; font-size:10px;font-color:gray; width: 146px; border:1px solid #ccc;overflow: auto;\" "
									+ "></div><span style=\"font-size:11px; color:#999;\"> " 
									+ this.suggestedTagsTextValue
									+ "</span><br></td></tr></table>"; 

		     		 this.setDotFieldTypeStr = this.setDotFieldTypeStr
											+ "dojo.attr("
											+ "'" + this.structureVelVar+"."+fieldVelocityVarName + "Field" + this.dialogCounter +  "'"
											+ ",'" + this.DOT_FIELD_TYPE + "'"
											+ ",'" + type + "');";
					
					return result;
			  }//http://jira.dotmarketing.net/browse/DOTCMS-3232
			  else if(type=='host or folder'){  
			  
				  dojo.require("dotcms.dijit.form.HostFolderFilteringSelect");
				  // Below code is used to fix the "widget already registered error". 
				  if(dojo.byId('FolderHostSelector-hostFoldersTreeWrapper')){
					  dojo.byId('FolderHostSelector-hostFoldersTreeWrapper').remove();
				  } 
				  if(dijit.byId('FolderHostSelector')){
					  dijit.byId('FolderHostSelector').destroy();
				  }
				  if(dijit.byId('FolderHostSelector-tree')){
					  dijit.byId('FolderHostSelector-tree').destroy();
				 }
				  
				  var hostId = "";
				  var fieldValue = hostId;
				  
				  var result = "<div id=\"FolderHostSelector" + this.dialogCounter + "\" style='width270px' dojoType=\"dotcms.dijit.form.HostFolderFilteringSelect\" includeAll=\"true\" "
					  			+" hostId=\"" + hostId + "\" value = \"" + fieldValue + "\"" + "></div>";

				  this.hasHostFolderField = true;
		 
		       	   return result;  
		  	  }else if(type=='category' || type=='hidden'){
			   
			     return "";
			     
			  }else if(type.indexOf("date") > -1){
				  var fieldId=this.structureVelVar+"."+ fieldVelocityVarName + "Field" + this.dialogCounter;
			  	  	dijit.registry.remove(fieldId);
					if(dijit.byId(fieldId)){
						dijit.byId(fieldId).destroy();
					}
					dojo.require("dijit.form.DateTextBox");

		     		 this.setDotFieldTypeStr = this.setDotFieldTypeStr 
											+ "dojo.attr("
											+ "'" + fieldId + "'"
											+ ",'" + this.DOT_FIELD_TYPE + "'"
											+ ",'" + type + "');";			
					
			        return "<input type=\"text\" dojoType=\"dijit.form.DateTextBox\" constraints={datePattern:'MM/dd/yyyy'} validate='return false;' invalidMessage=\"\"  id=\"" + fieldId + "\" name=\"" + this.structureVelVar+"."+ fieldVelocityVarName + "\" value=\"" + value + "\">";
			  }else{
				var fieldId=this.structureVelVar+"."+ fieldVelocityVarName + "Field" + this.dialogCounter;
			  	dijit.registry.remove(fieldId);
				if(dijit.byId(fieldId)){
					dijit.byId(fieldId).destroy();
				}

		 		 this.setDotFieldTypeStr = this.setDotFieldTypeStr 
										+ "dojo.attr("
										+ "'" + fieldId + "'"
										+ ",'" + this.DOT_FIELD_TYPE + "'"
										+ ",'" + type + "');";		 		 
				
		        return "<input type=\"text\" dojoType=\"dijit.form.TextBox\"  id=\"" + fieldId + "\" name=\"" + this.structureVelVar+"."+ fieldVelocityVarName + "\" value=\"" + value + "\">";
		        
		      }			  
			}