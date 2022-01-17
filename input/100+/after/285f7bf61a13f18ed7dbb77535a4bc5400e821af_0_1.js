function AddPersonToGroup(personId, homeGroupId) {
    $("#message").html("");
    $("#message_hg").html("Adding person");
    $("#ajax_loader_hg").show();
    if (personId == "0") {
        //Save the new person
        var names = $("#text_personName").val().split(" ");
        var firstname = "";
        var surname = "";
        if (names.length == 0) {
            //There's a problem, just return
            $("#message").html("Invalid name");
            $("#message_hg").html("");
            $("#ajax_loader_hg").hide();
            return;
        }
        else if (names.length == 1) {
            //Need a firstname and a surname
            $("#message").html("You need a firstname and a surname");
            return;
        }
        else {
            $.each(names, function (index) {
                if (index > 0) {
                    surname += names[index];
                    if (index < names.length - 1) {
                        surname += " ";
                    }
                }
                else {
                    firstname = names[index];
                }
            });
        }

        var personData = { PersonId: personId,
            FamilyId: 0,
            Firstname: firstname,
            Surname: surname,
            Email: "",
            DateOfBirth_Value: "",
            HomePhone: "",
            CellPhone: "",
            WorkPhone: "",
            Skype: "",
            Twitter: "",
            Occupation: "",
            Address1: "",
            Address2: "",
            Address3: "",
            Address4: "",
            Lat: "",
            Lng: "",
            FindFamily: true,
            RoleId: $("#RoleId").val(),
            GroupId: homeGroupId
        };

        $.post("/Ajax/SavePerson", $.postify(personData), function (data) {
            AddPersonToGroup(data.PersonId, homeGroupId);
        })
        .error(function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
            $("#message_hg").html("");
            $("#ajax_loader_hg").hide();
        });
    }
    else {

        var postData = { groupId: homeGroupId, personId: personId };

        $.post("/Ajax/AddPersonToGroup", $.postify(postData), function () {
            ReloadPeopleGrid(selectedGroupId);
            $("#message_hg").html("");
            $("#ajax_loader_hg").hide();
        }).error(function (jqXHR, textStatus, errorThrown) {
            $("#ajax_loader").hide();
            alert(jqXHR.responseText);
            $("#message_hg").html("");
            $("#ajax_loader_hg").hide();
        });
    }
}