function (index_url, autocomplete_url,message) {
		var needsDelay = false;
		$("#searchpost").keyup(function (event) {
				if ((!needsDelay) && (!event.shiftKey) && (!event.altKey) && (event.keyCode != '16' ) && (event.keyCode != '18' )
					&& (event.keyCode != '37' )&& (event.keyCode != '38' )&& (event.keyCode != '39' )&& (event.keyCode != '40' ))
				{                
					needsDelay = true;
					setTimeout(function () {needsDelay = false;},"1000");
					var url = index_url + "?searchstring=" + encodeURI($(this).val()) + " #grid-container";
					$("#grid-container").load(url);					
				}
		});
		$("#searchpost").focusin(function () {$(this).addClass("ui-state-hover") });
		$("#searchpost").focusout(function () {$(this).removeClass("ui-state-hover") });
		$("#searchpost").watermark(message,{className: "watermark", useNative: false});
		$("#searchpost").autocomplete({
			source: autocomplete_url,
			select: function(event, ui) {
				var url = index_url + "?searchstring=" + encodeURI(ui.item.label) + " #grid-container";
				$("#grid-container").load(url);
			}
		});       
		$("#searchbutton").click(function () { 
			var url = index_url + "?searchstring=" + encodeURI($("#searchpost").val()) + " #grid-container";
			$("#grid-container").load(url);					
			return false; 
		}); 
        $(".image").scaleImage({fade: 2000,scale: "fill", center: true});
    }