function(){
		$('.colorpickerInput').ColorPicker({
			onSubmit: function(hsb, hex, rgb, ele) {
                $(ele).val(hex.toUpperCase());
                $(ele).parents('.colorpickerParent').find('.colorpickerSelector div').css('background-color', '#' + hex);
				$(ele).ColorPickerHide();
			},
			onBeforeShow: function () {
				$(this).ColorPickerSetColor(this.value);
			},
            onShow: function (colpkr) {
                $(colpkr).fadeIn(500);
                return false;
            },
            onHide: function (colpkr) {
                $(colpkr).fadeOut(500);
                return false;
            },
            onChange: function (hsb, hex, rgb, ele) {
                $(ele).val(hex.toUpperCase());
                $(ele).parents('.colorpickerParent').find('.colorpickerSelector div').css('background-color', '#' + hex);
            }
		})
		.bind('keyup', function(){
			$(this).ColorPickerSetColor(getCorrectHex(this.value));
		});

        $('.colorpickerSelector, .colorpickerSelector div').click(function() {
            $(this).parents('.colorpickerParent').find('.colorpickerInput').ColorPickerShow();
        });
        
        $('.colorpickerInput').change(function() {
            var newhex = getCorrectHex($(this).val());
            $(this).parents('.colorpickerParent').find('.colorpickerSelector div').css('background-color', '#' + newhex);
        });
        
        $('.colorpickerInput').keydown(function() {
            $(this).change();
        });
        $('.colorpickerInput').keyup(function() {
            $(this).change();
        });
        
        $('.colorpickerInput').focusout(function() {
            $(this).val(getCorrectHex($(this).val()));
        });
        
        
}