function () {
    SetupPeopleGrid();

    $('#jqgGroups').jqGrid({
        url: '/Ajax/FetchGroupList',
        datatype: 'json',
        mtype: 'POST',
        colNames: ['GroupId', 'Group Name', 'Leader', 'Administrator', 'Suburb', 'Classification'],
        colModel: [
                    { name: 'GroupId', index: 'GroupId', hidden: true, search: false },
                    { name: 'GroupName', index: 'GroupName', align: 'left', width: 150, search: true },
                    { name: 'LeaderName', index: 'LeaderName', align: 'left', width: 130, search: true },
                    { name: 'Administrator', index: 'Administrator', align: 'left', width: 130, search: true },
                    { name: 'Suburb', index: 'Suburb', align: 'left', width: 130, search: true },
                    { name: 'GroupClassification', index: 'GroupClassification', align: 'left', width: 150, search: true }
                  ],
        pager: $('#jqgpGroups'),
        rowNum: 25,
        sortname: 'GroupName',
        sortorder: 'asc',
        viewrecords: true,
        width: 'auto',
        height: 'auto',
        gridComplete: function () {
            if ($('#jqgGroups').getDataIDs().length > 0) {
                ReloadPeopleGrid($('#jqgGroups').getDataIDs()[0]);
            }
        },
        onSelectRow: function (id) {
            if (selectedGroupId != id) {
                ReloadPeopleGrid(id);
            }
        }
    })
    .navGrid('#jqgpGroups', { edit: false, add: false, del: false, search: false })
    .navButtonAdd('#jqgpGroups', {
        caption: "Delete",
        buttonicon: "ui-icon-trash",
        onClickButton: function () {
            DeleteGroup();
        },
        position: "first"
    })
    .navButtonAdd('#jqgpGroups', {
        caption: "Edit",
        buttonicon: "ui-icon-pencil",
        onClickButton: function () {
            EditGroup();
        },
        position: "first"
    })
    .navButtonAdd('#jqgpGroups', {
        caption: "Add",
        buttonicon: "ui-icon-plus",
        onClickButton: function () {
            AddGroup();
        },
        position: "first"
    });

    $('#jqgGroups').jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false });


    $("#ajax_loader").hide();
    $("#ajax_loader_hg").hide();
    $("#ajax_loader_attendance").hide();
    $("#button_saveAttendance").show();
    $("#button_printAttendance").show();


    $("#text_eventDate").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd MM yy',
        yearRange: '-2:+1',
        onSelect: function (date, instance) {
            FetchAttendance();
        }
    });

    $("#homeGroupList").delegate(".selectHomeGroup", "mouseover mouseout", function (event) {
        if (event.type == 'mouseover') {
            $(this).css("cursor", "pointer");
            $(this).parent().addClass("ui-state-hover");
        } else {
            $(this).css("cursor", "default");
            $(this).parent().removeClass("ui-state-hover");
        }
    });

    $("#table_people").delegate(".selectPerson", "mouseover mouseout", function (event) {
        if (event.type == 'mouseover') {
            $(this).css("cursor", "pointer");
            $(this).parent().addClass("ui-state-hover");
        } else {
            $(this).css("cursor", "default");
            $(this).parent().removeClass("ui-state-hover");
        }
    });

    $("#text_homeGroupLeader").autocomplete({
        source: "/Ajax/PersonAutoComplete",
        minLength: 1,
        select: function (event, ui) {
            $("#hidden_homeGroupLeaderId").val(ui.item ? ui.item.id : "0");
        }
    });

    $("#text_homeGroupAdministrator").autocomplete({
        source: "/Ajax/PersonAutoComplete",
        minLength: 1,
        select: function (event, ui) {
            $("#hidden_homeGroupAdministratorId").val(ui.item ? ui.item.id : "0");
        }
    });


    $("#text_personName").autocomplete({
        source: function (request, response) {
            $("#ajax_loader_addPerson").show();
            $("#hidden_personId").val("0");
            $("#addPerson_securityRole").prop('disabled', false);
            var postData = { term: request.term };

            var jqxhr = $.post("/Ajax/PersonAutoComplete", $.postify(postData), function (data) {
                $("#ajax_loader_addPerson").hide();
                response(data);
            }).error(function (jqXHR, textStatus, errorThrown) {
                $("#ajax_loader_addPerson").hide();
                alert(jqXHR.responseText);
            });
        }
        ,
        minLength: 1,
        select: function (event, ui) {
            $("#hidden_personId").val(ui.item ? ui.item.id : "0");
            $("#addPerson_securityRole").val("Member");
            $("#addPerson_securityRole").prop('disabled', true);
        }
    });

    $("#table_peopleAttendance").delegate(".addEvent", "click", function () {
        //Populate fields
        $("#hidden_eventPersonId").val($.tmplItem(this).data.PersonId);
        $("#add_Event input:checkbox").prop("checked", false);

        $("#add_Event").dialog(
        {
            modal: true,
            height: 450,
            width: 425,
            resizable: false,
            buttons: {
                "Save": function () {
                    $("#ajax_loader").show();
                    SaveEvents();
                    $(this).dialog("close");
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });
    });

    $("#table_peopleAttendance").delegate(".addComment", "click", function () {
        //Populate fields
        $("#previous_commentsList").empty();
        $("#hidden_commentPersonId").val($.tmplItem(this).data.PersonId);
        $("#comment_detail").val("");
        $("#ajax_loader_comment").show();
        var postData = { personId: $.tmplItem(this).data.PersonId };

        var jqxhr = $.post("/Ajax/FetchPersonCommentHistory", $.postify(postData), function (data) {
            if (data.Comments.length == 0) {
                $("#previous_comments").hide();
            }
            else {
                $("#previous_comments").show();
                $("#previousCommentsTemplate")
                    .tmpl(data.Comments)
                    .appendTo("#previous_commentsList");
            }
            $("#ajax_loader_comment").hide();
        });

        $("#add_Comment").dialog(
        {
            modal: true,
            height: 500,
            width: 500,
            resizable: false,
            buttons: {
                "Save": function () {
                    $("#ajax_loader").show();
                    SaveComment();
                    $(this).dialog("close");
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        })
    });

    $("#button_saveAttendance").click(function () {
        SaveAttendance();
    });

//    $("#button_addPersonAttendance").click(function () {
//        //Populate fields
//        $("#hidden_personId").val("0");
//        $("#text_personName").val("");

//        $("#add_Person").dialog(
//        {
//            modal: true,
//            height: 150,
//            width: 440,
//            resizable: false,
//            buttons: {
//                "Add Person": function () {
//                    $("#ajax_loader").show();
//                    rowId = 0;
//                    AddPersonToGroup($("#hidden_personId").val(), selectedGroupId);
//                    $(this).dialog("close");
//                },
//                Cancel: function () {
//                    $(this).dialog("close");
//                }
//            }
//        });
//    });


    $("#button_printList").click(function () {
        window.location.replace("/Report/HomeGroupList/" + selectedGroupId);
    });

    $("#button_printAttendance").click(function () {
        window.location.replace("/Report/HomeGroupAttendance/" + selectedGroupId);
    });

    $("#membersList").delegate(".radio_leader", "click", function () {
        personId = $.tmplItem(this).data.PersonId;
        SetLeader(personId, selectedGroupId);
    });

    $("#membersList").delegate(".radio_administrator", "click", function () {
        personId = $.tmplItem(this).data.PersonId;
        SetAdministrator(personId, selectedGroupId);
    });

    $("#text_address1").keypress(function () {
        $("#message").html("");
        $("#hidden_addressChosen").val("");
    });

    $("#text_address1").autocomplete({
        source: function (request, response) {
            $("#ajax_gpsCoordinates").show();
            var address = $("#text_address1").val().replace(/ /g, "+") + ", " + $("#hidden_googleSearchRegion").val();
            Google.searchAddress(address).then(function (data) {
                $("#ajax_gpsCoordinates").hide();
                response(data);
            });
        }
        ,
        minLength: 4,
        select: function (event, ui) {
            AddressSelected(ui.item.id, 2, '', false);
        },
        open: function () {
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function () {
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
    });

    $("#text_address2").autocomplete({
        source: function (request, response) {
            $("#message").html("");
            if ($("#hidden_addressChosen").val() == "selected") {
                response("");
                return;
            }
            $("#ajax_gpsCoordinates2").show();
            var address = $("#text_address2").val().replace(/ /g, "+") + ", " + $("#hidden_googleSearchRegion").val();
            Google.searchAddress(address).then(function (data) {
                $("#ajax_gpsCoordinates2").hide();
                response(data);
            });
        }
        ,
        minLength: 4,
        select: function (event, ui) {
            AddressSelected(ui.item.id, 3, '', false);
        },
        open: function () {
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function () {
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
    });

    $("#text_other").keyup(function () {
        if ($("#text_other").val() != "") {
            $("#checkbox_other").prop("checked", true);
        }
        else {
            $("#checkbox_other").prop("checked", false);
        }
    });

    $("#text_leaveOther").keyup(function () {
        if ($("#text_leaveOther").val() != "") {
            $("#checkbox_leaveOther").prop("checked", true);
        }
        else {
            $("#checkbox_leaveOther").prop("checked", false);
        }
    });

    $("#button_sendEmail").click(function () {
        FetchEmailList();
    });


}