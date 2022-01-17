function($) {

if (Echo.Utils.isComponentDefined("Echo.Plugins.Edit")) return;

var plugin = Echo.Plugin.skeleton("Edit");

plugin.applications = ["Echo.StreamServer.Controls.Stream.Item"];

plugin.init = function() {
	var component = this.component;
	var button = this.assembleButton();
	component.addButtonSpec("Edit", button);
};

$.map(["Complete", "Error"], function(action) {
	plugin.events["Echo.StreamServer.Controls.Submit.onEdit" + action] = function(topic, args) {
		// item rerendering
		console.log("args: ");
		console.log(args);
	}
});

plugin.labels = {
	"editControl": "Edit"
};

plugin.methods.submitConfig = function(item, target) {
	return this.config.assemble({
		"target": target,
		"data": item.data,
		"targetURL": item.id
	});
};

plugin.methods.assembleButton = function() {
	var plugin = this;
	return function() {
		var item = this;
		return {
			"name": "Edit",
			"label": plugin.labels.get("editControl"),
			"visible":  item.user.is("admin") || item.user.has("identity", item.data.actor.id),
			"callback": function() {
				var config = plugin.submitConfig(item, item.dom.get("subcontainer"));
				config["targetQuery"] = plugin.config.get("query", "");
				config.plugins.push({"name": "EditSubmit"});
				new Echo.StreamServer.Controls.Submit(config);
				item.dom.content.get(0).scrollIntoView(true);
			}
		};
	};
};

Echo.Plugin.create(plugin);

}