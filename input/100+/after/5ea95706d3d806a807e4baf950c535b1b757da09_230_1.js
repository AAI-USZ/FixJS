fthis._setContent()},_uiSetSortState:function(b){var a=this.get("el");a.removeClass("sort-asc sort-desc");"ASC"===b?a.addClass("sort-asc"):"DESC"===b&&a.addClass("sort-desc")}},{ATTRS:{elTagName:{value:"th"},tpl:{}}}),g=g.Controller.extend({_toggleSortState:function(){var b=this.get("sortState");this.set("sortState",b?"ASC"===b?"DESC":"ASC":"ASC")},bindUI:function(){var b=this,a=b.get("events");e.each(a,function(a){b.publish(a,{bubbles:1})})},performActionInternal:function(b){var b=e.one(b.target),