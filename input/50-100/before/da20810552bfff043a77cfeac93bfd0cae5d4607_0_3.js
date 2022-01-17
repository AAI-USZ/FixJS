function (event, ui){
			document.demo.SetVolume(Math.floor(ui.value*1.27));
			if (ui.value == 0)
			{
				if (!$("#speaker").hasClass("speakoff"))
				{
					$("#speaker").removeClass("speakon").addClass("speakoff");
				}
			}
			else if (!$("#speaker").hasClass("speakon"))
			{
				$("#speaker").removeClass("speakoff").addClass("speakon");
			}
		}