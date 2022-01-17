function (id, content) {
	return (function($) { 
		return $('<tr id="' + id + '" class="loader-placeholder" style="height: ' + (this.blockSize * this.rowHeight) + 'px">'+content+'</tr>'); 
		})(jQuery); 
}