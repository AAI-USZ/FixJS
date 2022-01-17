function updateTitle() {
    var dialog = document.getElementById("calendar-event-dialog");
    var itemTitle = document.getElementById("item-title");
    var title = itemTitle.value;

    title = classifySubject(title, dialog._security, dialog._privacy);

    if (title != itemTitle.value) {
	debug("setting title: " + title);
	itemTitle.value = title;
    }
    return title;
}