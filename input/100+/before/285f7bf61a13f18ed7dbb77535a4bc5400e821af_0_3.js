function AddPerson() {
    //Populate fields
    $("#hidden_personId").val("0");
    $("#text_personName").val("");
    $("#addPerson_securityRole").prop('disabled', false);
    $("#addPerson_securityRole").val("Visitor");
    $("#add_Person").dialog(
        {
            modal: true,
            height: 180,
            width: 440,
            resizable: false,
            buttons: {
                "Add Person": function () {
                    $("#ajax_loader").show();
                    rowId = 0;
                    AddPersonToGroup($("#hidden_personId").val(), selectedGroupId);
                    $(this).dialog("close");
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });
}