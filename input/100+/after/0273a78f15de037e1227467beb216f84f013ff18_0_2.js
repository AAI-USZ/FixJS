function(data, status, jqxhr) {
			var clean = cleanJSON(jqxhr.responseText);
			var siteData = $.parseJSON(clean);
			$("#herdometer div").removeClass("activeSheep");
			$($("#herdometer div")[siteData.sheepColor]).addClass("activeSheep");
			$("#globalCount").html(siteData.globalInaccessibleCount);
			$("#localCount").html(siteData.countryInaccessibleCount);
			$(".herdometerSite").html($("#urlCheckField")[0].value);
			$("#herdometerData").css('display', 'block');
			$("#urlCheckField").blur();
		}