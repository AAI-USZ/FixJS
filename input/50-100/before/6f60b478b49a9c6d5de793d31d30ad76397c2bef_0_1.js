function createXmlHttpRequestObject()

{

	//stores the reference to XMLHttpReqiest

	var xmlHttp;

	

	//For IE6 or older

	if(window.ActiveXObject)

	{

		try

		{

			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");

		}

		catch(e)

		{

			xmlHttp = false;

		}

	}

	//Modern browsers

	else

	{

		try 

		{

			xmlHttp = new XMLHttpRequest();

		}

		catch(e)

		{

		xmlHttp = false;

		}

	}

	

	//Error message return

	if(!xmlHttp)

	{

		alert("Error creating XMLHttp Object. Are you using a modern browser with Javascript enabled?");

	}

	else

	{

		return xmlHttp;

	}

	

}