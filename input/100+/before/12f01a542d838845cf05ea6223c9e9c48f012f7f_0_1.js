function(e) {
	//First of all get a shortcut to the table cell we want
	var threadTitleContainer = document.getElementById('threadTitleContainer');
	
	//Iterate over the cell's object looking for an input box
	//When we find it, make a nice reference to it
	//... What we are doing here is not really that useful in the context of newthread, but it is in editthread.
	for (i in threadTitleContainer.childNodes) {
		if (threadTitleContainer.childNodes[i].type == "text") {
			var threadTitleEntry = threadTitleContainer.childNodes[i];
		}
	}
	threadTitleEntry.style.display = "none";

	//Now duplicate threadTitleEntry and insert a clone of it so we can work with th eoriginal
	var newThreadTitleEntry = threadTitleEntry.cloneNode(true);

	newThreadTitleEntry.name = "";
	newThreadTitleEntry.id = "";
	newThreadTitleEntry.style.display = "inline";

	threadTitleContainer.appendChild(newThreadTitleEntry);

	//Get the thread tag things going
	var threadTagContainer = new ThreadTagContainer(threadTitleContainer);

	//Add already existing tags to the list of thread tags
	var titleText = threadTitleEntry.value;
	
	titleText = titleText.split(" ");
	var newTitleText = "";

	for (var i = 0; i < titleText.length; i++) {
		if (titleText[i][0] == "[" && titleText[i].slice(-1)[0] == "]") {
			threadTagContainer.newTag(titleText[i].substring(1, titleText[i].length - 1));
			delete titleText[i];
		}
	}
	newThreadTitleEntry.value = titleText.join(" ").trim();
	
	//Locate newTagTitleEntry's parent form

	var parentNode = threadTitleContainer.parentNode;

	while (parentNode.tagName != "FORM") {
		parentNode = parentNode.parentNode;
	}

	parentNode.addEventListener("submit", function(e) {
		threadTitleEntry.value = threadTagContainer.constructTitle(newThreadTitleEntry.value);
	});
}