function tracks(instruments)
    {
		$("#panel_pistes").empty();
        for (var i = 0; i < instruments.length;i++)
        {
            if (i == 0)
            {
                $("#panel_pistes").append("<li id='t_"+i+"' class='piste piste_selected'>" + instruments[i]._name_instrument + "</li>");
            }
            else
            {
                $("#panel_pistes").append("<li id='t_"+i+"' class='piste'>" + instruments[i]._name_instrument + "</li>");
            }
        }/*
        $(".instruments").append("<section class='clear'></section>");*/
    }