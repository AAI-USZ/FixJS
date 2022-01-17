function SavePerson(refreshAfterSave) {
    var canSave = true;
    if ($("#text_firstname").val() == "") {
        canSave = false;
        $("#warning_firstname").show();
    }
    else {
        $("#warning_firstname").hide();
    }

    if ($("#text_surname").val() == "") {
        canSave = false;
        $("#warning_surname").show();
    }
    else {
        $("#warning_surname").hide();
    }

    if (!canSave) {
        return;
    }

    $("#ajax_personSearch").show();
    if (familyMembers != null) {
        $.each(familyMembers, function (index, value) {
            if (value.Relationship == null) {
                value.Relationship = "";
            }
        });
    }

    var groupId = $("#hidden_groupId").val();
    if ($("#RoleName").val() == "Visitor") {
        groupId = $("#GroupId").val();
    }

    var postData = { PersonId: $("#hidden_personId").val(),
        FamilyId: $("#hidden_familyId").val(),
        Firstname: $("#text_firstname").val(),
        Surname: $("#text_surname").val(),
        Email: $("#text_email").val(),
        DateOfBirth_Value: $("#text_dateOfBirth").val(),
        Anniversary_Value: $("#text_anniversary").val(),
        HomePhone: $("#text_homePhone").val(),
        CellPhone: $("#text_cellPhone").val(),
        WorkPhone: $("#text_workPhone").val(),
        Skype: $("#text_skype").val(),
        Twitter: $("#text_twitter").val(),
        Occupation: $("#text_occupation").val(),
        Gender: $("input[name=Gender]:checked").val(),
        Address1: $("#text_address1").val(),
        Address2: $("#text_address2").val(),
        Address3: $("#text_address3").val(),
        Address4: $("#text_address4").val(),
        Lat: $("#hidden_lat").val(),
        Lng: $("#hidden_lng").val(),
        RoleId: $("#RoleId").val(),
        Site: $("#Site").val(),
        FamilyMembers: familyMembers,
        HeardAbout: $("#text_heardAbout").val(),
        GroupId: groupId
    };

    var jqxhr = $.post("/Ajax/SavePerson", $.postify(postData), function (data) {
        if (data.PersonId == 0) {
            alert("There was a problem saving the person");
        }
        else {
            $("#hidden_personId").val(data.PersonId + "");
            $("#span_message").html("Person saved succesfully");
            $("#span_message").show();
            //Refetch the person
            if (refreshAfterSave) {
                FetchPersonData(data.PersonId);
            }
            else {
                $("#ajax_personSearch").hide();
            }
            pageIsDirty = false;
        }
    })
        .error(function (jqXHR, textStatus, errorThrown) { $("#ajax_personSearch").hide(); alert(jqXHR.responseText); });
}