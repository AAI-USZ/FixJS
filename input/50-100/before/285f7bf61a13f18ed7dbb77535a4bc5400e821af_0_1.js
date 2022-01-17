function (index, value) {
        postData.Events.push({ PersonId: $.tmplItem(value).data.PersonId,
            IsVisitor: false,
            Events: [{ Name: 'Did not attend Group',
                Date: $("#text_eventDate").val(),
                GroupId: selectedGroupId
            }]
        });
    }