function createChangeOrRemoveStoryMessage(li, newStoryName) {
    var storyId = $(li).attr("data-id");

    if ($.trim(newStoryName) === "") {
        var removeStoryMessage = {
            MessageId: newGuid(),
            MessageType: "RemoveStory",
            StoryId: storyId
        };
        return removeStoryMessage;
    }
    
    var changeStoryNameMessage = {
        MessageId: newGuid(),
        MessageType: "ChangeStoryName",
        StoryId: storyId,
        Name: newStoryName
    };
    return changeStoryNameMessage;
}