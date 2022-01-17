function(cnf)//(ele, data, vertical, index, editMode )
	{
		if(!cnf) cnf = {};
		var ele = cnf.element;
		var data = cnf.data;
		var vertical = cnf.vertical;
		var index = cnf.index;
		var editMode = cnf.edit;
		var debug  = cnf.debug;
		
		if(index == undefined)
			this.formIndex = 0;
		else
			this.formIndex = 1;
			
		if(data) data["updated"] = new Date().getTime().toString();
		
		var popup = false;
		if(typeof ele == "string" && ele[0] != "#" && ele[0] != ".")
		{
			ele  = "#" + ele; 
		}
		else if(typeof ele == "object")
		{
			ele = "#" + ele.id;
		}	
		else
		{
			$(document.body).append("<div id=\"ecplus-form-" + this.name + "\"></div>");
			ele = "#ecplus-form-" + this.name;
			popup = true;
		}
		
		this.formElement = $(ele);

		this.formElement
			.dialog("option", "title", "Add Location")
			.empty()
			.attr("title", (editMode ? "Edit " : "Add ") + this.name)
			.addClass(vertical ? "ecplus-vertical-form" :"ecplus-form")
			.removeClass(vertical ? "ecplus-form" :"ecplus-vertical-form")
			.append("<div class=\"ecplus-form-next\"><a href=\"#\" onclick=\"project.forms['"+ this.name +"'].moveNext();\">Next</a></div>")
			.append("<div class=\"ecplus-form-previous\"><a href=\"#\" onclick=\"project.forms['"+ this.name +"'].movePrevious();\">Previous</a></div>")
			.append("<div class=\"ecplus-form-pane\"><form name=\"" + this.name + "\"></form></div>");
				
		/*$(".ecplus-form-next a, .ecplus-form-previous a").mouseover(function(evt)
		{
			window.evt = evt;
			$(evt.target.parentElement).clearQueue();
			$(evt.target.parentElement).animate({width : 110});
		});
		
		$(".ecplus-form-next a, .ecplus-form-previous a").mouseout(function(evt)
		{
			$(evt.target.parentElement).clearQueue();
			$(evt.target.parentElement).animate({width : 26});
		});*/
		
		for(var field in this.fields)
		{
			if(this.fields[field].type == "" || (this.fields[field].hidden && project.getPrevForm(this.name).key != field))
			{
				$("form", this.formElement).append("<div class=\"ecplus-question-hidden\" id=\"ecplus-question-" + field + "\"><label>" + this.fields[field].text + "</label></div>");
				$("#ecplus-question-" + field, this.formElement).append(this.fields[field].getInput(data ? data[field] : undefined, cnf.debug));
			}
			else
			{
				$("form", this.formElement).append("<div class=\"ecplus-question\" id=\"ecplus-question-" + field + "\"><label>" + this.fields[field].text + "</label></div>");
				$("#ecplus-question-" + field, this.formElement).append(this.fields[field].getInput(data ? data[field] : undefined, cnf.debug));
				$("#ecplus-question-" + field, this.formElement).append("<div  id=\"" + field + "-messages\" class=\"ecplus-messages\"></div>");
			}
		}
		
		
		$("form", this.formElement).append("<div class=\"ecplus-question\" id=\"ecplus-save-button\"><label></label><br /></div>");
		if(cnf.debug)
		{
			$("#ecplus-save-button", this.formElement).append("<a href=\"javascript:project.forms['" + this.name +  "'].closeForm();\">End of Form</a>");
		}
		else if(editMode)
		{
			$("#ecplus-save-button", this.formElement).append("<a href=\"javascript:project.forms['" + this.name +  "'].editEntry();\">Save Entry</a>");
		}
		else
		{
			$("#ecplus-save-button", this.formElement).append("<a href=\"javascript:project.forms['" + this.name +  "'].addEntry();\">Save Entry</a>");
		}
		
		$(".ecplus-form-pane form", this.formElement).css("width", ($(".ecplus-question").width() * $(".ecplus-question").length + 1) + "px");
		
		if(popup)
		{
			var w = window.innerWidth ? window.innerWidth * 0.75 : 500;
			var h = window.innerHeight ? window.innerHeight * 0.75 : 400;
			this.formElement.dialog({
				width: w,
				height: h,
				modal : true,
				resizable : false,
				title : (data ? "Edit " : "Add ") + this.name,
				close : function(event, ui)
				{
					$(event.target).remove();
				}
			});
			$(".ecplus-question", this.formElement).width($(".ecplus-form-pane").width())
			$(".ecplus-form-pane form", this.formElement).css("width", ($(".ecplus-question", this.formElement).width() * $(".ecplus-question", this.formElement).length + 1) + "px");
		}
		
		// TODO : Previously the idea was to set the type of the field to date and the use jQuery to augment the browsers that don't yet support
		// type=date. However as HTML 5 does nto support formats that doesn't work. That said we should look at whether the date should
		// be stored in-format or as unix timestamp/ISO format then displayed according to the locality settings of the browser/phone
		// NB this could be a setting to localStorage, as number of rows is.
		//
		//if(!$.browser.webkit)
		//{
			$("input.ecplus-datepicker", this.formElement).each(function(idx, ele) { 
				var fmt = project.forms[formName].fields[ele.name].date;
				if(project.forms[formName].fields[ele.name].setDate)
				{
					fmt = project.forms[formName].fields[ele.name].setDate;
				}
				fmt = fmt.replace("MM", "mm").replace("yyyy", "yy");
				console.debug(fmt);
				$(ele).datepicker({ dateFormat : fmt });
				if(project.forms[formName].fields[ele.name].setDate)
				{
					$(ele).datepicker("setDate", new Date());
				}
			});
		//}
		if(this.gpsFlds.length > 0) $(".locationControl", this.formElement).gpsPicker()
		$(".ecplus-radio-group, .ecplus-check-group, select", this.formElement).controlgroup();
		$(".ecplus-media-input", this.formElement).mediainput();
		
		if(data)
		{
			for(var field in data)
			{
				if(data[field] == "NULL" || data[field] == "undefined") data[field] = "";
				$("#" + field, this.formElement).val(data[field]);
			}
		}
		
		$("select[childcontrol]", this.formElement).change(function(evt){
			var ctrl = $(evt.target);
			var child = $("#" + ctrl.attr("childcontrol"));
			child.attr('parentvalue', ctrl.val());
			child.attr('parentfield', ctrl.attr('id'));
		});
		
		if(vertical)
		{
			$(".ecplus-input", this.formElement).blur(function(evt){
				var ctrl = $(evt.target);
				var ctrlName = evt.target.id;
				var frm = project.forms[formName];
				
				if(ctrl.hasClass('ecplus-ac')) ctrlName = ctrlName.replace('-ac', '');
				
				if(frm.fields[ctrlName].validate(ctrl.val()))
				{
					if(frm.fields[ctrlName].jump)
					{
						var jumped = false; // is a jump required
						jbits = frm.fields[ctrlName].jump.split(",");
														
						for(var j = 0; j < jbits.length; j+=2)
						{
							if(jbits[j+1] == $("#" + frm.fields[ctrlName].id, frm.formElement).idx() + 1)
							{
								frm.doJump(jbits[j], ctrlName);
								jumped = true;
							}
						}
						
						if(!jumped)
						{
							frm.doJump(false);
						}
					}
				}
			});
		}
		else
		{
			$(".ecplus-input", this.formElement).blur(function(evt){
				
				if(!project.forms[formName].moveNext(true))
				{
					$(evt.target).focus();
				}
			});
		}
		
	
		$('.ecplus-ac').each(function(idx, ele)
		{
			var jq = $(ele);
			var pform = jq.attr('pform');
			jq.autocomplete({
				source : baseUrl+ "/../" + pform + "/title",
				minLength : 2
			});
			
		});
		
		this.jumpFormTo(this.formIndex);
	}