function (index, value) {
        postData.Events.push({ PersonId: $.tmplItem(value).data.PersonId,
            Events: [{ Name: 'Attended Group',
                Date: $("#text_eventDate").val(),
                GroupId: selectedGroupId
            }]
        });
    }