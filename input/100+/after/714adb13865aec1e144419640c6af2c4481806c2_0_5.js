function() {

		window.googletag=window.googletag||{};
		window.googletag.cmd=window.googletag.cmd||[];

		var a=$(["<script><","/script>"].join(""));
		a.attr("type","text/javascript");
		a.attr("async","async");
		a.attr("src",document.location.protocol+"//www.googletagservices.com/tag/js/gpt.js");
		$("head").eq(0).prepend(a);

		// Adblock plus seems to hide blocked scripts... so we check for that
		//if(gads.style.display === 'none') {
		//	dfpBlocked();
		//}

	}