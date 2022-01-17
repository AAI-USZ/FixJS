function createAddNewStoryMessage(ul, newStoryName) {
    var newPosition = 0;
    var lastLi = ul.children("li").last();
    if (lastLi.length === 1) {
        newPosition = parseFloat(lastLi.attr("data-position")) + 10;
    }
    var addNewStoryMessage = {
        MessageId: newGuid(),
        MessageType: "AddNewStory",
        StoryId: newGuid(),
        Name: $.trim(newStoryName),
        ListId: ul.attr("data-id"),
        Position: newPosition
    };
    return addNewStoryMessage;
}