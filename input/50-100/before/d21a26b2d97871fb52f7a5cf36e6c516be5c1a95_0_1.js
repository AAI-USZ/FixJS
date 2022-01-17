function(index) {
	if (!this.blokz) {
		var parent = this.contentScrolled();
		this.blokz = (function($) {
			return $(".block", parent);
		})(jQuery);
	}
	return this.blokz.get(index);
}