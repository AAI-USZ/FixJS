function tracks(instruments)
    {
		$(".instruments").empty();
        for (var i = 0; i < instruments.length;i++)
        {
            if (i == 0)
            {
                $(".instruments").prepend("<div id='t_"+i+"' class='onglets onglets_selected float-right'>" + instruments[i]._name_instrument + "</div>");
            }
            else
            {
                $(".instruments").prepend("<div id='t_"+i+"' class='onglets float-right'>" + instruments[i]._name_instrument + "</div>");
            }
        }
        $(".instruments").append("<section class='clear'></section>");
    }