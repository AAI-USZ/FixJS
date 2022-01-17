function() {

    var pathname = '';
    var order = [];

    pathname = getPath();

    // Assign handlers immediately after making the request,
    // and remember the jqxhr object for this request
    if ((window.location.pathname.indexOf("edit") == -1) &&
        (window.location.pathname.indexOf("@@edit") == -1))
    {
        resultatsPerPagina = 66;

        if (pathname.indexOf("sortingView") != -1)
        {
            pathname = pathname.split("sortingView")[0];
            resultatsPerPagina = 400;
        }

        response = drawOrderedList(pathname, resultatsPerPagina);

    }

/*
    // The sortable list of objects
    $('#sortable').sortable({
        update: function() {
            pathname = getPath();
            order = getOrder();

            updateList(pathname, order);
        }
    });
*/
    // Check and Uncheck all the selection
    $("#forRemove_all").click(function()
    {
        $("input[id$=forRemove]").each(function()
        {
            if (this.checked == false)
            {
                this.checked = true;
            }
            else
            {
                this.checked = false;
            }
        });
    });

    // Delete all the selection
    $("#deleteAll").click(function()
    {
        $("#sortable").children().each(function()
        {
            var inputChecked = jQuery(this).find("input")[0].checked;
            if (inputChecked == true)
            {
                jQuery(this).remove();
            }
        });

        pathname = getPath();
        order = getOrder();
        updateList(pathname, order);
    });


}