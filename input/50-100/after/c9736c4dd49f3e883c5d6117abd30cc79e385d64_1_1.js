function(contactView){
			console.log('tap btnPCAction');
			var pcontact = Ext.getCmp(contactView);
			var data = pcontact.getValues();
			//validation todo
/*
			var newContact = Ext.create('PET.model.ContactMD', data);
			var errors = newContact.validate();
			if(!errors.isValid())
			{
				this.showErrors('pContactFieldSet',errors)
				return;
			}*/


			
			this.mixins.mixHome.callAPIService('POST','MemberPortalService','AddContact',data,function(response,page){
				console.log(response);
				reLoadPage=true;
				page.changeView('MainVW','right');
				page.loadCustomerInfo();
			});

			
		}