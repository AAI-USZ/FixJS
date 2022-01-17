function saveFieldOrder(event) {
    var form_order = getUpdatedOrderings('.updatedFormSectionFieldOrder :input');
    var formId = $('#sectionId').html();

    $.ajax({
        url: '/form_section/save_field_order',
        type: "POST",
        data: {
            "form_order" : form_order,
            "formId" : formId
        },
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