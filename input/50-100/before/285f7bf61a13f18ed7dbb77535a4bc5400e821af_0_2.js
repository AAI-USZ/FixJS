function (event, ui) {
            $("#hidden_personId").val(ui.item ? ui.item.id : "0");
            $("#addPerson_securityRole").val("Member");
            $("#addPerson_securityRole").prop('disabled', true);
        }