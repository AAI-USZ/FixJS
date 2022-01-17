function () {

    // simple method validate form, to config jquery validator
    $.validate_form = function () {
        // set jquery validator default values
        $.validator.setDefaults({
            highlight: function(element, errorClass, validClass) {
                validClass = 'success';
                $(element).parents('.control-group').addClass(errorClass).removeClass(validClass);
            },
            unhighlight: function(element, errorClass, validClass) {
                validClass = 'success';
                $(element).parents('.control-group').removeClass(errorClass).addClass(validClass);
            },
            errorPlacement: function (error, element) {
                element.parents('.control-group').find('.help-block').html(error);
            },
            success: function (label) {
                $('#' + label.attr('for')).parents('.control-group').find('.help-block').html('This field is verified');
            },
            errorElement: 'span'
        });

        $('form').validate({
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                email: {
                    email: 'Please enter a valid email here.'
                }
            }
        });
    };
    $.validate_form();

    var sound_incorrect = new Audio('/snd/incorrect.wav');
    // method done while clicking to send the form
    $.done = function (e) {
        e.preventDefault();
        _gaq.push(['_trackEvent', 'canistro-store', 'done'])

        $('form').validate();
        if (!$('form').valid()) {
            sound_incorrect.play();
            return false;
        }
        $('form').submit();
    };

    // reset form after successful post
    $.reset_form = function () {
        $('form input, form textarea').val('');
        $('form .success').removeClass('success');
        $('#email').parents('.control-group').find('.help-block').html('enter your email address here');
        //$('#address').parents('.control-group').find('.help-block').html('enter your delivery address here');
        //$('#comments').parents('.control-group').find('.help-block').html('enter your comments here');
        $('.alert-success').removeClass('in').addClass('out, hide');
    };

    var sound_message = new Audio('/snd/message.wav');
    // submit the form after successful validation
    $.submit = function (e) {
        e.preventDefault();
        $.post('/' + $('.brand').html() + '/checkout', $('form').serializeArray(), function (data) {
            if (data == 'success') {
                $('.alert-success').removeClass('out, hide').addClass('in').alert();
                sound_message.play();
                // update shopping cart
                $.update_cart('get'); 
                // TODO reset here or after closing alert and form?
                setTimeout(function () {$('#modal-form').modal('hide');}, 5000);
            }
        });
    };

    var sound_modal = new Audio('/snd/powerup.wav');
    $.track = function () {
        sound_modal.play();
        _gaq.push(['_trackEvent', 'canistro-store', 'checkout'])
    };

    var interval_cart   = null;
    var wait_cart       = false;
    var sound_cart      = new Audio('/snd/coin.wav');
    $.update_cart = function (action, id) {
        if (wait_cart) {
            return false;
        }
        wait_cart = true;
        $('.label-success').addClass('label-warning').removeClass('label-success');
        $('.cart-total').addClass('active');
        if (id) {
            sound_cart.play();
        }
        // TODO add error handling for http call
        $.post('/renasboy/cart/' + action, {'id': id}, function (data) {
            if (data) {
                var total = data.total;
                var qty = data.quantity;

                if (data.products) {
                    // TODO check on using jquery-templ , but I did not like it last time
                    // well check on doing something better
                    var html = '<table class="table table-striped table-condensed">';
                    html += '<thead>';
                    html += '<tr>';
                    html += '<th>#</th>';
                    html += '<th>product name</th>';
                    html += '<th>price</th>';
                    html += '<th>&nbsp;</th>';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody>';

                    for (key in data.products) {
                        product = data.products[key];
                        html += '<tr>';
                        html += '<td>' + product.quantity +'</td>';
                        html += '<td><a href="">' + product.name + '</a></td>';
                        html += '<td>&euro;' + product.price + '</td>';
                        html += '<td><a href="#"><i class="icon-trash" data-product="' + product.id + '"></i></a></td>';
                        html += '</tr>';
                    }

                    html += '<tr>';
                    html += '<td>&nbsp;</td>';
                    html += '<td>TOTAL</td>';
                    html += '<td>&euro;' + data.total + '</td>';
                    html += '<td>&nbsp;</td>';
                    html += '</tr>';

                    html += '<tr>';
                    html += '<td colspan="4"><a class="btn-success btn-large btn pull-right" data-target="#modal-form" href="#modal-form" data-toggle="modal"><i class="icon-ok icon-white"></i> CHECKOUT</a></td>';
                    html += '</tr>';

                    html += '</tbody>';
                    html += '</table>';
                }
            }
            else {
                var total   = '0.00';
                var qty     = 0;
                var html    = '<h3>I am empty!</h3>';

            }
            setTimeout("$.turn_off_cart();", 500);
            $('.cart-total a').html('&euro;' + total)
            $('.label-warning, .label-success').html(parseInt(qty));
            $('.dropdown-menu').html(html);
            if (qty == 0) {
                $.old_checkout_height = $('.checkout').height();
                $('.checkout').animate({'height': 0});
            }
            else {
                $('.checkout').animate({'height': $.old_checkout_height });
            }
        });
        wait_cart = false;
    };

    $.turn_off_cart = function () {
        $('.label-warning').removeClass('label-warning').addClass('label-success');
        $('.cart-total').removeClass('active');
    };

    $.add_cart = function (e) {
        e.preventDefault();
        $.update_cart('add', $(this).data('product'));
    };

    $.remove_cart = function (e) {
        e.preventDefault();
        $.update_cart('del', $(this).data('product'));
    };

    // animate slider based on thumbs
    $.change_carousel = function (e) {
        e.preventDefault();
        var slide = $(this).data('slide');
        $('#product-carousel').carousel(slide);
    };

    // animate thumbs based on slider
    $.change_thumbs = function (e) {
        var slide = $('#product-carousel .active').data('slide');
        $('.thumbnail').removeClass('selected');
        $('.thumbnail').eq(slide).addClass('selected');
        var top = $('.thumbnail .carousel-inner > a').eq(slide).offset().top + $('.thumbnails-wrapper').scrollTop() - ($('.thumbnails-wrapper').height() / 2)
        $('.thumbnails-wrapper').animate({'scrollTop': top});
    }

    $.expand_nav = function () {
        //setTimeout(, 1000);
        // resize wrapper
        $('.thumbnails-wrapper').css({'width': $('.thumbnails-wrapper').width() + 20});
        $('.thumbnails-wrapper').animate({'height': $('#product-carousel').height()}, 1000, function () {
            // apply margin to first and last thumbs
            var margin = ($('.thumbnails-wrapper').height() - $('.thumbnails .span3').eq(0).outerHeight(true)) / 2;
            $('.thumbnails .span3:first').css({'margin-top': margin});
            $('.thumbnails .span3:last').css({'margin-bottom': margin});
            var top = $('.thumbnail .carousel-inner > a').eq(1).offset().top + $('.thumbnails-wrapper').scrollTop() - ($('.thumbnails-wrapper').height() / 2)
            $('.thumbnails-wrapper').animate({'scrollTop': top});
        });
    };

    $.build = function () {
        $(document).off('slid', '#product-carousel').on('slid', '#product-carousel', $.change_thumbs);
        $(document).off('click', '.carousel-inner > a').on('click', '.carousel-inner > a', $.change_carousel);
        $(document).off('click', '#done').on('click', '#done', $.done);
        $(document).off('submit', 'form').on('submit', 'form', $.submit);
        $(document).off('click', '.btn-success').on('click', '.btn-success', $.track);
        $(document).off('click', '.add-cart').on('click', '.add-cart', $.add_cart);
        $(document).off('click', '.icon-trash').on('click', '.icon-trash', $.remove_cart);
        $(document).off('hidden', '#modal-form').on('hidden', '#modal-form', $.reset_form);
        setTimeout($.expand_nav, 1000);
        $.update_cart('get');
    };

    $.build();
}