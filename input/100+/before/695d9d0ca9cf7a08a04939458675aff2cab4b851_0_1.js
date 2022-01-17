function setFormulaArrayFields (f)
{        
    var len = f.sections.length;
    var i, j = 0;
    
    for (i = 0; i < len; ++i)
    {       
        for (j = 0;;++j)
        {
            if (undefined == f.sections [i][j]) 
                break;
         
            else if ("predicate" == f.sections [i][j].sectiontype)
            {
                if ( "alsfrsquestion" == f.sections[i][j].type )
                    f.sections [i][j].value = $("input[name=" + f.sections [i][j].name + "]:checked").val();
                else if ( "class" == f.sections[i][j].type )
                {
                    if (0 < $("input[name=" + f.sections [i][j].name + "]:checked").length)
                    {
                        values = new Array();
                        $("input[name=" + f.sections [i][j].name + "]:checked").each(function(index) {
                            values[index] = $(this).val();
                        });

                        f.sections [i][j].value = values;
                    }
                }
                else
                    f.sections [i][j].value = $("#" + f.sections [i][j].name).val();
            }
            
            // recursive call of this function 
            else if ("nestedconfig" == f.sections [i][j].sectiontype)
            {
                setFormulaArrayFields (f.sections [i][j].form);
            }
        }
    }
    
    return f;
}