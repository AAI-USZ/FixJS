function unMarkAllRows(container_id)
{

    $("#" + container_id).find("input:checkbox:enabled").prop('checked', false)
    .trigger("change")
    .parents("tr").removeClass("marked");
    return true;
}