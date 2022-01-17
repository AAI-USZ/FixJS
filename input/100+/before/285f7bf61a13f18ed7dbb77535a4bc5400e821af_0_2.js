function SaveAttendance() {
    $("#ajax_loader_attendance").show();
    var postData = { GroupId: selectedGroupId,
        EventDate: $("#text_eventDate").val(),
        Events: []
    };

    $.each($("#membersListAttendance input.checkbox_didNotAttended:checked"), function (index, value) {
        postData.Events.push({ PersonId: $.tmplItem(value).data.PersonId,
            IsVisitor: false,
            Events: [{ Name: 'Did not attend Group',
                Date: $("#text_eventDate").val(),
                GroupId: selectedGroupId
            }]
        });
    });

    $.each($("#visitorsListAttendance input.checkbox_didNotAttended:checked"), function (index, value) {
        postData.Events.push({ PersonId: $.tmplItem(value).data.PersonId,
            IsVisitor: true,
            Events: [{ Name: 'Did not attend Group',
                Date: $("#text_eventDate").val(),
                GroupId: selectedGroupId
            }]
        });
    });

    $.each($("#membersListAttendance input.checkbox_attended:checked"), function (index, value) {
        postData.Events.push({ PersonId: $.tmplItem(value).data.PersonId,
            IsVisitor: false,
            Events: [{ Name: 'Attended Group',
                Date: $("#text_eventDate").val(),
                GroupId: selectedGroupId
            }]
        });
    });

    $.each($("#visitorsListAttendance input.checkbox_attended:checked"), function (index, value) {
        postData.Events.push({ PersonId: $.tmplItem(value).data.PersonId,
            IsVisitor: true,
            Events: [{ Name: 'Attended Group',
                Date: $("#text_eventDate").val(),
                GroupId: selectedGroupId
            }]
        });
    });

    var jqxhr = $.post("/Ajax/SaveHomeGroupEvent", $.postify(postData), function (data) {
        $("#ajax_loader_attendance").hide();
    }).error(function (jqXHR, textStatus, errorThrown) {
        $("#ajax_loader_attendance").hide();
        alert(jqXHR.responseText);
    });
}