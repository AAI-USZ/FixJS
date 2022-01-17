function(evt){
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
			}