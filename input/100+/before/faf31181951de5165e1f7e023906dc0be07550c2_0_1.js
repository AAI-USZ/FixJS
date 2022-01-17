function updateMainContent(target)
{
	if(!isAvailable())
	{
		return;
	}
	var xmlHttpObject = new XMLHttpRequest();

	if(target == null || target == '')
	{
		xmlHttpObject.open('get', mainContentUrl, false);
	}
	else
	{
		xmlHttpObject.open('get', mainContentUrl + '?quest=' + target, false);
		$('[id^="navlink_"]').css("font-weight", "normal");
		$('#navlink_' + target).css("font-weight", "bold");
	}
	xmlHttpObject.send(null);

	var responseHash = str_md5(xmlHttpObject.responseText);

	if (mainContHash != responseHash)
	{
		mainContHash = responseHash;
		$('#right #content').html(xmlHttpObject.responseText);

		hub.unregisterComponent('disclosure').start();

		hub.registerComponent(disclosure(), {
			disclosureId : '.disclosures .feature-title',
			component_name : 'disclosure'
		}).start();

		hub.publish(true, "/container/load", {
			containerId : 'body'
		});
	}
}