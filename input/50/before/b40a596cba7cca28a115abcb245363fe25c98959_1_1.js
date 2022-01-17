function (i,e)
            {
                if(i == index)
                    $(e).attr("checked","checked");
                else
                    $(e).removeAttr("checked");
            }