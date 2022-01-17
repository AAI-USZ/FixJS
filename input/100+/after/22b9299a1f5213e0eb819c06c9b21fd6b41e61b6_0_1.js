function addRules(sub)
{

	var ssheet 
	var isCss;
	try{
	if(chrome)
	{
		sub.media = "all";
		ssheet = getStyle(sub);
		if(ssheet == -1)
		{
			console.log("addRules: " + sub.href);
			error = true;
			return;

		}

	}
	else
	{
	    ssheet = sub.sheet.cssRules[0].styleSheet;
	}

	var subI = getSub(ssheet);



	var srule;

	var emote = /\[href[\|\*]?="\/[A-Za-z0-9!#]+"]/

    var srules = ssheet.cssRules;

	var erules = emoteSheet.cssRules;

	var tempRules = new Object();
	var tempCodes = new Object();

	var addRule = true;


	for(i = 0; i < srules.length; i++)
	{

		srules = ssheet.cssRules;

		srule = srules[i];


		//Test if it is an emote
		if(emote.test(srule.selectorText))
		{
			var rcss = srule.cssText;
			var rstext = srule.selectorText;
			var stext = rstext;
			var ecode;

			addRule = true;
			//Filter out rules that use emotes elsewhere
			if(!ruleFilter(stext))
			{
			  addRule = false;
			  continue;
			}
            //Get text rules
            if(srule.cssText.indexOf("cursor: text") != -1 || srule.cssText.indexOf("color:") != -1 )
			{
				ecode = stext.substring(stext.indexOf("/"));
				ecode = ecode.substring(0, ecode.indexOf("\"]"));
                textSubs[subI][textSubs[subI].length] = ecode;
				tempCodes[ecode] = subs[subI];
			}

			stext = rstext;

			//Get emote rules
			if(srule.cssText.indexOf("background-image") != -1)
			{	
				while(stext.indexOf("a[href") > -1)
				{
					stext = stext.substring(stext.indexOf("a[href") + 5);
					ecode = stext.substring(stext.indexOf("/"));
					ecode = ecode.substring(0, ecode.indexOf("\"]")); 
					emoteSubs[subI][emoteSubs[subI].length] = ecode;
					tempCodes[ecode] = subs[subI];

				}
			}
			stext = rstext;

			//Test for repeats of loaded subs
			var good = false;
			while(stext.indexOf("a[href") > -1)
				{
				    stext = stext.substring(stext.indexOf("a[href") + 5);
					ecode = stext.substring(stext.indexOf("/"));
					ecode = ecode.substring(0, ecode.indexOf("\"]")); 

					if(eCodes.hasOwnProperty(ecode))
					{
						//addRule = false;
						console.log(ecode + ": duplicate");
						rcss = rcss.replace(ecode,"/dup_dump");
				        rstext = rstext.replace(ecode,"/dup_dump");
					}
					else
					{
					    good = true; //If all rules are dup_dump, don't add it.
					}
				}
			addRule = addRule && good;

			stext = rstext;



			//Fix inner sub repeats

			if(addRule)
			{

				while(tempRules.hasOwnProperty(stext))
				{
					stext += "d";
				}
				//Add it
				tempRules[stext] = rcss;
			}



		}


	}

	//console.log(ssheet);

	//Merge rules / codes
	for(var rule in tempRules)
	{
		if(tempRules.hasOwnProperty(rule))
		{
			emoteRules[rule] = tempRules[rule];
		}
	}

		for(var rule in tempCodes)
	{
		if(tempCodes.hasOwnProperty(rule))
		{
			if(!eCodes.hasOwnProperty(rule)) //Prevent overwrite
			{
				eCodes[rule] = subs[subI];
			}
		}
	}




	}
	catch(e)
	{
		error = true;
		console.log("addRules1: ")
		console.log(e);
	}

	//Delete the style
	var del = document.getElementById(subs[subI])
	del.parentNode.removeChild(del);


	console.log("Done: " + sub.href);


	loaded++;

}