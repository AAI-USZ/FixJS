function(contactView){
			console.log('tap btnPCAction');
			var pcontact = Ext.getCmp(contactView);
			var data = pcontact.getValues();
			
			this.callAPIService('POST','MemberPortalService','AddContact',data,function(response,page){
				console.log(response);
				reLoadPage=true;
				page.changeView('MainVW','right');
				page.loadCustomerInfo();
			});

			
		}