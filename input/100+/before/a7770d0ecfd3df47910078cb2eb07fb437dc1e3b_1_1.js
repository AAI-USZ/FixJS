function() {
	$.fancybox.close();
	var component = Echo.Utils.getComponent("Echo.IdentityServer.Controls.Auth");
	component.parent.refresh.call(this);
}