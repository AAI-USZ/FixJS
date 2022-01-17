function(data) {
        // Summary:
        //    Participants tab
        // Description:
        //    Display all the users for add into the event
        var userList       = this.userStore.getList();
        var currentUser    = data[0].rights[phpr.currentUserId] ? phpr.currentUserId : 0;
        var participantIds = data[0].participants;
        var participants   = [];
        var users          = [];
        var statuses       = data[0].confirmationStatuses;

        if (userList) {
            for (var i in userList) {
                // Make an array with the users except the current one
                if (userList[i].id != currentUser) {
                    users.push({'id': userList[i].id, 'name': userList[i].display});
                }
            }
        }

        // Make an array with the current participants
        for (var i in participantIds) {
            if (participantIds[i] != currentUser) {
                var userName;
                for (var j in userList) {
                    if (userList[j].id == participantIds[i]) {
                        userName = userList[j].display;
                        break;
                    }
                }
                var statusClass;
                switch (statuses[participantIds[i]]) {
                    case "1": // pending
                        statusClass = "notice";
                        break;
                    case "2": // accepted
                        statusClass = "success";
                        break;
                    case "3": // rejected
                        statusClass = "error";
                        break;
                }

                participants.push({
                    'userId':   participantIds[i],
                    'userName': userName,
                    'statusClass': statusClass
                });
            }
        }
        this._participantsInDb  = participants.length;
        this._participantsInTab = participants.length;

        // Template for the participants tab
        this._participantData = new phpr.Default.System.TemplateWrapper({
            templateName: "phpr.Calendar2.template.participanttab.html",
            templateData: {
                participantUserText:            phpr.nls.get('User'),
                participantActionText:          phpr.nls.get('Action'),
                participantAvailabilityText:    phpr.nls.get('Availability'),
                users:                          users,
                currentUser:                    currentUser,
                participants:                   participants
            }
        });

        var def = this.addTab([this._participantData], 'tabParticipant', 'Participants', 'participantFormTab');
        def.then(dojo.hitch(this, function() {
            // Add button for participant
            var params = {
                label:     '',
                iconClass: 'add',
                alt:       'Add',
                baseClass: 'smallIcon'
            };
            newParticipant = new dijit.form.Button(params);
            this._participantData.participantAddButton.appendChild(newParticipant.domNode);
            dojo.connect(newParticipant, "onClick", dojo.hitch(this, "newParticipant"));

            // Delete buttons for participant
            for (var i in participants) {
                var userId     = participants[i].userId;
                var buttonName = "participantDeleteButton" + userId;
                var params = {
                    label: '',
                    iconClass: 'cross',
                    alt: 'Delete',
                    baseClass: 'smallIcon'
                };

                var tmp = new dijit.form.Button(params);
                this._participantData[buttonName].appendChild(tmp.domNode);
                dojo.connect(tmp, "onClick", dojo.hitch(this, "deleteParticipant", userId));
            }
        }));
    }