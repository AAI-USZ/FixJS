function updateMemoryWindow() {
	
	var startOffset = Math.floor($("#memory_container").scrollTop() / LINE_HEIGHT) * 8;
	startOffset = Math.min(startOffset, 0xffb0);
	
	var memHtml = "";
	for(var i = 0; i < 10; i++) {
		memHtml += "<div class=\"memory_offset\">" + Utils.hex2(startOffset + i*8) + "</div>";
		memHtml += "<div class=\"memory_line\">"
		for(var j = 0; j < 8; j++) {
			memHtml += Utils.hex2(emulator.RAM[startOffset + i*8 + j] || 0) + " ";
		}
		memHtml += "</div><div class=\"clear\"></div>";
	}
	$("#memory").html(memHtml);
	$("#memory").css("top", ($("#memory_container").scrollTop() + 4) + "px");
}