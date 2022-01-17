function (){
		var ismute = !document.demo.GetMute();
		document.demo.SetMute(ismute);
		if (ismute){
			$("#speaker").removeClass("speakon").addClass("speakoff");
		}
		else
		{
			$("#speaker").removeClass("speakoff").addClass("speakon");
		}
	}