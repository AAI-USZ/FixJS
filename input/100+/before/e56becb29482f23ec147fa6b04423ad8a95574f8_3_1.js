function() {

    // Kommentarknappen för artiklen som visar formuläret
    $('.btn-comment-article').click( function (event) {
        event.preventDefault();

        var button = $(this),
            form = $('#' + button.data('form')).parent(),
            container = $('#' + button.data('container'));

        // Reset
        resetEntries();
        form.find('.toggle-rel-threads').css( 'visibility', 'hidden' );
        
        form.find('input[name=parent_id]').val( "" );
        form.prependTo(container);
        button.css('visibility','hidden');

        return false;
    });


    //Ajaxifiera formulären
    $("body").on("submit", "form.form-add-entry", function(event) {
        event.preventDefault();

        var form = $(this),
            url = form.attr('action'),
            data = form.serialize(),
            button = form.find('input[type=submit]'),
            loader = $('&nbsp;<img src="/static/img/ajax-loader.gif" class="gif-submit-loader" alt="Wakawakawakawakawaka..." />'),
            cont = $('#'+form.data('container') );

        form.find('input, textarea').attr('disabled', 'disabled');
        button.parent().append( loader );

        $.ajax({
            type: "POST",
            url: url,
            data: data,
            dataType: "html",
            success: function(data, textStatus, jqXHR) {
                if ( jqXHR.status === 278 ) {
                    window.location.href = jqXHR.getResponseHeader("Location");
                }
                else {
                    cont.html(data);
                    formatjQueryUI();
                    $.jGrowl('close');
                }
            }
        });

        return false;
    });

    // Entry effekter
	$('.comment-entry').live('mouseenter', function(){
		$(this).removeClass( "comment-entry-mouseout");
	});

	$('.comment-entry').live('mouseleave ', function(){
		$(this).addClass( "comment-entry-mouseout");
	});

	// Visa kommentarer
	$('.js-show-comments').click(function(event) {
		event.preventDefault();
		
		var button = $(this),
			loader = $('&nbsp;<img src="/static/img/ajax-loader.gif" class="gif-submit-loader" alt="Wakawakawakawakawaka..." />');

		button.parent().after( loader );
		button.addClass('ui-state-highlight');

		var btn = $(this),
			url = btn.data('url'),
			cont = $('#'+btn.data('container') );
		 
		cont.load(url, function(){
			loader.remove();
			button.removeClass('ui-state-highlight');
			formatjQueryUI();
		});

		return false;
	});
}