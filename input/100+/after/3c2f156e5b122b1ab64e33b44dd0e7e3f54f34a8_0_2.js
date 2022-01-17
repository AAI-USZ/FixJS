function (session, value){
		var session_name=TissueStack.Admin.prototype.getCookie("session");
		
		if ($(value).val() != null){
			session_name = null;
		}
		
		if (session_name!=null && session_name!="")
		  {
		  	TissueStack.Admin.prototype.session = session_name;
		  	return;
		  }
		else 
		  {
		  session_name = session;
		  if (session_name!=null && session_name!="")
		    {
		   		TissueStack.Admin.prototype.setCookie("session",session_name.id,1);
		   		return;
		    }
		  }
	}