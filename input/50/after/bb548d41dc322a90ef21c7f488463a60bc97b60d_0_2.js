function Menu(field_name) {
	return $("<ul/>")
		.addClass(" ui-menu ui-widget ui-widget-content ui-corner-all")
		.attr("role", "listbox")
		.attr("aria-activedescendant", "ui-active-menuitem")
		.data("field_name", field_name)
		.on("click", "li.ui-menu-item", loadNode);
}