function saveOrder(event) {
    var form_order = getUpdatedOrderings('.updatedFormSectionOrder :input');

    $.ajax({
        url: '/form_section/save_form_order',
        type: "POST",
        data: {"form_order" : form_order},
        success: function(data) {
            if ($('#form_sections').length === 1) {
                $("#form_sections").html($(data).find("#form_sections"));
                $("a.moveDown").bind("click", moveDown);
                $("a.moveUp").bind("click", moveUp);
                initOrderingColumns();
                $("#successNotice").show();
            }
        }
    });
}