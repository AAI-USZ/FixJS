function updateList(pathname, order)
{
    //Send the new List and update async.
    $.ajax({
        url: pathname + "updateList?order=[" + order + "]",
        type: "post",
        error: function(){alert("Ha donat un error al ordenar la llista! No s'han guardat els canvis");},
        success: function(){drawOrderedList(pathname, resultatsPerPagina)}
    });

}