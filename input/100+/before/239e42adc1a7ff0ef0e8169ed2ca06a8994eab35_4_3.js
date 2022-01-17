function() {
        // Summary:
        //    This function collect and process the history data
        // Description:
        //    This function collect and process the history data
        var history     = phpr.DataStore.getData({url: this._historyUrl});
        var userList    = this.userStore.getList();
        var historyData = [];
        var userDisplay = [];
        var row         = 0;
        var trClass;

        for (var i = 0; i < history.length; i++) {
            // Search for the user name
            if (!userDisplay[history[i].userId]) {
                for (var u in userList) {
                    if (userList[u].id == history[i].userId) {
                        userDisplay[history[i].userId] = userList[u].display;
                        break;
                    }
                }
            }
            if (userDisplay[history[i].userId]) {
                historyUser = userDisplay[history[i].userId];
            } else {
                historyUser = '';
            }
            historyModule   = history[i].moduleId;
            historyItemId   = history[i].itemId;
            historyField    = history[i].label || '';
            historyOldValue = history[i].oldValue || '';
            historyNewValue = history[i].newValue || '';
            historyAction   = history[i].action;
            historyDate     = history[i].datetime;

            if (Math.floor(row / 2) == (row / 2)) {
                trClass = 'grey';
            } else {
                trClass = 'white';
            }

            historyData.push({
                trClass:  trClass,
                date:     historyDate,
                user:     historyUser,
                field:    historyField,
                oldValue: historyOldValue,
                newValue: historyNewValue
            });

            row++;
        }

        return historyData;
    }