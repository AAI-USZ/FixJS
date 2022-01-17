function(preventBlur)
	{
		try{
			if(this.formIndex == $('.ecplus-question').length - 1) return;
			//validate answer to previous question
			var fldName = $('.ecplus-question')[this.formIndex].id.replace("ecplus-question-", "");
			var val = $("#" + fldName, this.formElement).val();
			if(this.fields[fldName].fkField && this.fields[fldName].fkTable)
			{
				val = $("#" + fldName + '-ac', this.formElement).val();
			}
			var valid = this.fields[fldName].validate(val);
			$("#" + fldName + "-messages").empty();
			
			if(!preventBlur)
			{
				console.debug('preventing blur');
				$("#" + fldName, this.formElement)
					.unbind("blur")
					.blur()
					.blur(function(evt){
						project.forms[formName].moveNext(true);
					});
			}
			
			if(valid === true || valid.length == 0)
			{
				if(this.fields[fldName].jump)
				{
					var jumped = false; // is a jump required
					jbits = this.fields[fldName].jump.split(",");
													
					for(var j = 0; j < jbits.length; j+=2)
					{
						if(jbits[j+1] == $("#" + this.fields[fldName].id, this.formElement).idx() + 1)
						{
							this.doJump(jbits[j]);
							jumped = true;
						}
					}
					
					if(!jumped)
					{
						this.doJump(false);
					}
				}
				
				this.formIndex++;
				this.moveFormTo(this.formIndex);
				return true;
			}
			else	
			{
				for (msg in valid)
				{
					$("#" + fldName + "-messages").append("<p class=\"err\">" + valid[msg] + "<p>");
				}
				return  false;
			}
		}catch(err){/*alert(err);*/}
	}