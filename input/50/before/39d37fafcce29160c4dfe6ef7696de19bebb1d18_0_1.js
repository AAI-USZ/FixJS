function markAllRows(container_id)
{

    $("#" + container_id).find("input:checkbox:enabled").prop('checked', true)
    .parents("tr").addClass("marked");
    return true;
}