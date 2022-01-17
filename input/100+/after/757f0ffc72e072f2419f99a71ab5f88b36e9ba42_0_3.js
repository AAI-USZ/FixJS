function updatePage(page, fromPage)
{
	if (!page.id)
		page.id = "__" + (++newPageCount) + "__";

	currentHash = hashPrefix + page.id;
	if (!fromPage)
	{	// If fromPage is null, this is the initial load and we want to replace a hash of "" with "#_home" or whatever the initial page id is.
//		location.replace(location.protocol + "//" + location.hostname + location.port + location.pathname + newHash + location.search);
		location.replace(currentHash);
	}
	else
	{	// Otherwise, we want to generate a new history entry
//		location.hash = currentHash;
		location.assign(currentHash);
	}
		
	pageHistory.push(page.id);

	var pageTitle = $("pageTitle");
	if (page.title)
		pageTitle.innerHTML = page.title;
	var ttlClass = page.getAttribute("ttlclass");
	pageTitle.className = ttlClass ? ttlClass : "";

	if (page.localName.toLowerCase() == "form")
		showForm(page);
		
	var backButton = $("backButton");
	if (backButton)
	{
		var prevPage = $(pageHistory[pageHistory.length-2]);
		if (prevPage && !page.getAttribute("hideBackButton"))
		{
			backButton.style.display = "inline";
			backButton.innerHTML = prevPage.title ? prevPage.title : "Back";
			var bbClass = prevPage.getAttribute("bbclass");
			backButton.className = (bbClass) ? 'button ' + bbClass : 'button';
		}
		else
			backButton.style.display = "none";
	}
	iui.busy = false;
}