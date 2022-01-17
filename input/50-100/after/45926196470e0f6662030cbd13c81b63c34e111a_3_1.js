function(tag) {
			$("#nav a div").removeClass("onSelect");
			$("#"+tag +" div").addClass("onSelect");

			//edit language href to selected tab
			$(".language-list a").each(function() {
				var href = $(this).attr("href").replace(/#!.*$/,"");
				$(this).attr("href",href+"#!"+tag);
			});
		}