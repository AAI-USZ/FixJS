function (index, msg) {

        if (processedMessages[msg.MessageId] === true)
            return;

        if (msg.MessageType === "AddNewList") {

            var divForNewList = "<div class='list'><div class='listHeader'>" + msg.Name + "</div><ul data-id='" + msg.ListId + "'></ul><div class='addNewStory'>Add new story...</div></div>";
            body.append(divForNewList);

        } else if (msg.MessageType === "AddNewStory") {

            var blockedClass = isBlocked(msg.Name) ? " blocked" : "";
            var bugClass = isBug(msg.Name) ? " bug" : "";
            var liForNewStory = $("<li data-id='" + msg.StoryId + "' data-position='" + msg.Position + "' class='story" + blockedClass + bugClass + "'><div>" + msg.Name + "</div></li>");

            var ul = body.find(".list ul[data-id='" + msg.ListId + "']");
            var li = findFirstLiWithPositionAfter(ul, parseFloat(msg.Position));
            if (li === null) {
                ul.append(liForNewStory);
            } else {
                li.before(liForNewStory);
            }

        } else if (msg.MessageType === "ChangeStoryName") {

            liForStory = $(body.find("li[data-id='" + msg.StoryId + "']")[0]);
            var divInsideLiForStory = liForStory.children("div")[0];
            $(divInsideLiForStory).text(msg.Name);
            $(liForStory).toggleClass("blocked", isBlocked(msg.Name));
            $(liForStory).toggleClass("bug", isBug(msg.Name));

        } else if (msg.MessageType === "RemoveStory") {

            var liForStory = body.find("li[data-id='" + msg.StoryId + "']")[0];
            $(liForStory).remove();

        } else if (msg.MessageType === "MoveStory") {

            liForStory = $(body.find("li[data-id='" + msg.StoryId + "']")[0]).detach();
            var ul = $(body.find("ul[data-id='" + msg.NewListId + "']")[0]);
            var firstLiAfter = findFirstLiWithPositionAfter(ul, parseFloat(msg.NewPosition));
            if (firstLiAfter === null) {
                ul.append(liForStory);
            } else {
                firstLiAfter.before(liForStory);
            }
            liForStory.attr("data-position", msg.NewPosition);
        }

        processedMessages[msg.MessageId] = true;
    }