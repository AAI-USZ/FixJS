function swapBGM()
	{
		switch(Math.round(Math.random() * 3))
		{
			case 0:
			{
				gco.bgm = document.getElementById('bgm_square');
				break;	
			}
			case 1:
			{
				gco.bgm = document.getElementById('bgm_fast');
				break;	
			}
			case 2:
			{
				gco.bgm = document.getElementById('bgm_soar');
			}
			default:{}
		}
		gco.init_audio();
	}