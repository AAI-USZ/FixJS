function(event)
    {
        if(!(event.keyCode == 13 || event.charCode == 32))
            return true;
        
        txtAnswer.style.backgroundColor="transparent";
        if(kanaTrainer.validate(txtAnswer.value))
        {
            try
            {
                snd_right.currentTime = 0;
                snd_right.play();
            }
            catch(e){}
            txtAnswer.value = "";
            kanaTrainer.next();    
            painter.clear();
        }
        else
        {
            try
            {
                snd_wrong.currentTime = 0;
                snd_wrong.play();
            }
            catch(e){}
            txtAnswer.style.backgroundColor="#ff5656";
        }
        
        setStats();
        
        return false;
    }