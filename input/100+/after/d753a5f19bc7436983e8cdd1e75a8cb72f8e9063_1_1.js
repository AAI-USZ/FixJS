function(e){function t(t,n,r){t.preventDefault();t.stopImmediatePropagation();var i=e("#dpa-toolbar-filter").val(),s=e("#dpa-toolbar-search").val(),o=null,u="",a=e("#post-body-content > div").prop("class");if(a.indexOf("grid")>=0){a="grid";u="#post-body-content > .grid a"}else if(a.indexOf("list")>=0){a="list";u="#post-body-content > .list tbody tr"}else if(a.indexOf("detail")>=0){a="detail";u="#post-body-content > .detail > ul li"}e(u).each(function(){o=e(this);"1"===i?o.hasClass("installed")?o.addClass("showme"):o.addClass("hideme"):"0"===i?o.hasClass("notinstalled")?o.addClass("showme"):o.addClass("hideme"):o.addClass("showme")});e(u+":not(.hideme)").each(function(){o=e(this);if("grid"===a&&o.children("img").prop("alt").search(new RegExp(s,"i"))<0||"list"===a&&o.children(".name").text().search(new RegExp(s,"i"))<0||"detail"===a&&o.prop("class").search(new RegExp(s,"i"))<0){o.removeClass("showme");o.addClass("hideme")}});e(u).each(function(){o=e(this);o.hasClass("showme")?o.show():o.hasClass("hideme")&&o.hide();o.removeClass("hideme").removeClass("showme")})}e(document).ready(function(){e("#dpa-toolbar").submit(function(t){t.stopPropagation();t.preventDefault();if(1===e("#post-body-content > div a:visible").size()&&"detail"!==e("#post-body-content > div").prop("class").trim()&&"list"!==e("#post-body-content > div").prop("class").trim()){var n=e("#post-body-content > .grid a:visible img");e("#dpa-toolbar-search").val("")}});e("#dpa-toolbar-filter").on("change.achievements",t);e("#dpa-toolbar-search").on("keyup.achievements",t);e("#post-body-content .list table").tablesorter({headers:{0:{sorter:!1},1:{sorter:!1},4:{sorter:!1}},textExtraction:function(e){return e.innerHTML}});e("#post-body-content .list table th a").on("click.achievements",function(e){e.preventDefault()});Socialite.load(e("#dpa-detail-contents h3"))})}