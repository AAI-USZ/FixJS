function(contactView){
			console.log('tap btnPCAction');
			var pcontact = Ext.getCmp(contactView);
			var values = pcontact.getValues();
			var data = pcontact.getRecord().data;
			data.ContactValue = values.ContactValue;
			data.ContactType=values.ContactType;
			this.callAPIService('PUT','MemberPortalService','UpdateContact',data,function(response,page){
				console.log(response);
				page.changeView('MainVW','right');
				page.loadCustomerInfo();
			});

			
		}