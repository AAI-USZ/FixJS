function createChangeOrRemoveStoryMessage(li, newStoryName) {
    var storyId = $(li).attr("data-id");

    if (newStoryName === "" || newStoryName === null) {
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