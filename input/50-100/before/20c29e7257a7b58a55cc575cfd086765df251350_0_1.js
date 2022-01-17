function (event, ui){
			document.demo.SetVolume(ui.value);
			if (ui.value == 0){
				$("#speaker").removeClass("speakon").addClass("speakoff");
			}
			else if (!$("#speaker").hasClass("speakon"))
			{
				$("#speaker").removeClass("speakoff").addClass("speakon");
			}
		}