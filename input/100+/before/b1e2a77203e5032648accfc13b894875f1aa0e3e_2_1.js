function (tplData) {

			$(core.region).hide().html('');

			$(tplData).appendTo($(core.region));

			

			for(var index in data) {

				var item = data[index];

				if (item.contents == "") {

					$("#readmore" + item.code).hide();

				}

				

				if (item.tags && item.tags != "") {

					$("#tags" + item.id).html("<div class='tag'>"

						 + item.tags.replace(/,/gi, 

							"</div><div class='tag'>")

						 + "</div");

				}

			}

			

			$(core.region).fadeIn();

			

			var baseLayoutHeight = 800;

			var targetLayoutHeight = 

				($(core.region).height() > baseLayoutHeight)

					? $(core.region).height() + 100

					: baseLayoutHeight;

				

			$('#layout').css('height', targetLayoutHeight + 'px');

			$('#rightPart').css('height', 

				(targetLayoutHeight - 30 ) + 'px');

			

			core.attachEventHandlers();

			if (enterCallBack) enterCallBack();

		}