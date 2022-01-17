function ClearForm() {
    var searchText = $("#text_personSearch").val();
    $("input:text").val("");
    $("#hidden_personId").val("0");
    $("#hidden_familyId").val("0");
    $("#hidden_groupId").val("0");
    $("#hidden_lat").val("0");
    $("#hidden_lng").val("0"); 
    var genderRadio = $('input:radio[name=Gender]');
    genderRadio.filter('[value=Male]').prop('checked', false);
    genderRadio.filter('[value=Female]').prop('checked', false);
    $("#warning_firstname").hide();
    $("#warning_surname").hide();
    if ($("#RoleName").length > 0) {
        $("#RoleName").val("Member");
        $("#hidden_roleName").val("Member");
    }
    else {
        $("#groupAdmin_securityRole").val("Visitor");
        $("#hidden_roleName").val("Visitor");
    }

    $("#text_personSearch").val(searchText);
    familyMembers = [];
    $("#family_members").empty();
    $("#Site").val("Select site...");
    $("#row_image").hide();
    $("#img_person").prop("src", " ");
    $("#GroupId").val("0");
    }