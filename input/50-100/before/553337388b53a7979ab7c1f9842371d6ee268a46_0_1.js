function (session){
		var session_name=TissueStack.Admin.prototype.getCookie("session");
		if (session_name!=null && session_name!="")
		  {
		  	TissueStack.Admin.prototype.session = session_name;
		  }
		else 
		  {
		  session_name = session;
		  if (session_name!=null && session_name!="")
		    {
		    TissueStack.Admin.prototype.setCookie("session",session_name.id,1);
		    }
		  }
	}