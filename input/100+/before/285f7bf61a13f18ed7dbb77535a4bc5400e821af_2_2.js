function PopulatePerson(person) {
    $("#hidden_personId").val(person.PersonId);
    $("#jqgEventList").jqGrid("setGridParam", { "postData": { personId: person.PersonId} });
    $("#jqgEventList").trigger("reloadGrid");
    $("#jqgGroups").jqGrid("setGridParam", { "postData": { personId: person.PersonId} });
    $("#jqgGroups").trigger("reloadGrid");
    $("#hidden_familyId").val(person.FamilyId);
    $("#hidden_groupId").val(person.GroupId);
    $("#hidden_roleName").val(person.RoleName);
    $("#text_firstname").val(person.Firstname);
    $("#warning_firstname").hide();
    $("#text_surname").val(person.Surname);
    $("#warning_surname").hide();
    $("#text_email").val(person.Email);
    $("#text_dateOfBirth").val(person.DateOfBirth);
    $("#text_anniversary").val(person.Anniversary);
    $("#text_homePhone").val(person.HomePhone);
    $("#text_cellPhone").val(person.CellPhone);
    $("#text_workPhone").val(person.WorkPhone);
    $("#text_skype").val(person.Skype);
    $("#text_twitter").val(person.Twitter);
    $("#text_occupation").val(person.Occupation);
    var genderRadio = $('input:radio[name=Gender]');
    genderRadio.filter('[value=Male]').prop('checked', false);
    genderRadio.filter('[value=Female]').prop('checked', false);
    if (person.Gender == "Male") {
        genderRadio.filter('[value=Male]').prop('checked', true);
    }
    if (person.Gender == "Female") {
        genderRadio.filter('[value=Female]').prop('checked', true);
    }

    $("#text_address1").val(person.Address1);
    $("#text_address2").val(person.Address2);
    $("#text_address3").val(person.Address3);
    $("#text_address4").val(person.Address4);
    $("#hidden_lat").val(person.Lat);
    $("#hidden_lng").val(person.Lng);
    $("#RoleName").val(person.RoleName);
    $("#Site").val(person.Site);
    $("#text_heardAbout").val(person.HeardAbout);
    $("#family_members").empty();
    $("#familyMemberTemplate")
            .tmpl(person.FamilyMembers)
            .appendTo("#family_members");
    familyMembers = person.FamilyMembers;
    if (!person.HasUsername) {
        $("#button_sendWelcomeMail").show();
    }
    else {
        $("#button_sendWelcomeMail").hide();
    }
    $("#div_saveSuccess").hide();
    if (person.FacebookId != null) {
        $("#img_person").prop("src", "https://graph.facebook.com/" + person.FacebookId + "/picture");
        $("#row_image").show();
    }
    else {
        $("#row_image").hide();
        $("#img_person").prop("src", " ");
    }
}