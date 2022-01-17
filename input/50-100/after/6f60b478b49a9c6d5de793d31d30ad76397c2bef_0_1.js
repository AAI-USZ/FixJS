function update()

{

	if(xmlHttp.readyState ==4)

	{

		document.getElementById("action").innerHTML = xmlHttp.responseText;

		console.log("!");

	}

	else

	{

		console.log("no go");

	}

}