function saveOrder(event) {
    var form_order = {};
    var updatedOrderings = $('.updatedFormSectionOrder :input');
    $.each(updatedOrderings, function() {
	var name = $(this).attr("name");
	var id = /form_order\[(.*)\]/.exec(name)[1]
	form_order[id] = $(this).attr("value");
    });
    var url='';
    var formId='';
    if ($('#editFormDetails').length === 0){
	url = '/form_section/save_order';
    }else{
	url = '/form_section/save_order_single';
	formId = $('#sectionId').html();
    }


    $.ajax({
	type: "POST",
	data: {"form_order" : form_order,
	       "formId" : formId},
	url: url,
	success: function(data) {
	    if ($('#form_sections').length === 1){
		$("#form_sections").html($(data).find("#form_sections"));
		$("a.moveDown").bind("click", moveDown);
		$("a.moveUp").bind("click", moveUp);
		initOrderingColumns();
            $("#successNotice").show();
	    }
	}
    });
}