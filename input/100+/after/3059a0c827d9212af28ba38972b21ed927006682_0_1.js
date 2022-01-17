function (json) {

        	AddContact.contactTypes = json;
			AddContact.selectedContactType = json[0];
        	
            //parse returned list of contact types and generate HTML for pop-up window
            var str = '<ul><div>Add contact:</div>'
				+ '<span class="empty_cell"></span>'
				+ '<br/>';
			
			// select
			str += '<label for="contact_type">' + $labelContactType+ '</label>'
				+ '<div style="margin-left:9px;">'
				+ '<select name="contact_type" id="contact_type" style="width:312px">';

            $.each(json, function (i, obj) {
                str += '<option value="' + obj.id + '">' + obj.typeName + '</option>';
            });
            str += '</select><br/></div>';
			str += '<br/>';
			
			// text input
			str += '<div class="control-group">'
			str += '	<label for="contact_type" class="control-label">' + $labelContactValue + '</label>';
            str += '	<div class="controls">';
            str += '		<input type="text" name="contact" id="contact" placeholder="' + AddContact.selectedContactType.mask + '" />';
            str += '	</div>';
			str += '	<span class="reg_info">' + $labelContactValueInfo + '</span>';
            str += '</div>'
			str += '</ul>';

            $.prompt(str, {
                buttons:{ Ok:true, Cancel:false},
                submit:function (value, message, form) {
                	var result = false;
					
					if (!value) {
						// cancel is pressed
						result = true
					} else if (AddContact.isValueValid && value != undefined && value && form.contact.length > 0) {

                        var contact = {
                            value:form.contact,
                            typeId: form.contact_type
                        };

                        $.ajax({
                            url:baseUrl + '/contacts/add',
                            type:"POST",
                            contentType:"application/json",
							async: false,
                            data:JSON.stringify(contact),
                            success:function (data) {
                            		//populate contact template and append to page
                            		$("#contacts").append(getContactHtml(data));
                            		bindDeleteHandler();
                            		
                            		// allow close popup
                            		result = true;
                            },
							error : function(data) {
								ErrorUtils.addErrorMessage('#contact', $labelValidationUsercontactNotMatch);
                        		AddContact.isValueValid = false;
							}
                        });
                    }
                    return result;
                }
            });
        }