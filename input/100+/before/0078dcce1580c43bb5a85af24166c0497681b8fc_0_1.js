function() {

    var text =

      '<div class="ff-menu"><table><tr>' +

        '<td><input type="radio" name="text_option" value="gen_text" id="ff-gen-text" checked="checked" /></td>' +

        '<td colspan="2"><label for="ff-gen-text">Generate "fish" text</label></td>' +

      '<tr><tr>' +

        '<td><input type="radio" name="text_option" value="use_static" id="ff-use-static" /></td>' +

        '<td><label for="ff-use-static">Use static: </label></td>' +

        '<td><input type="text" name="static_text" value="" /></td>' +

      '<tr><tr>' +

        '<td><input type="radio" name="text_option" value="email" id="ff-email" /></td>' +

        '<td><label for="ff-email">Email:</label></td>' +

        '<td><input type="text" name="email" value="[any]@[any].com" /></td>' +

      '<tr><tr>' +

        '<td><input type="radio" name="text_option" value="any_from_list" id="ff-any-from-list" /></td>' +

        '<td><label for="ff-any-from-list">Any from list:</label></td>' +

        '<td><input type="text" name="any_from_list" value="" /></td>' +

      '<tr><tr>' +

        '<td><input type="radio" name="text_option" value="dont_fill" id="ff-dont-fill-text" /></td>' +

        '<td><label for="ff-dont-fill-text">Don\'t fill</label></td>' +

        '<td><em>Leave as is</em></td>' +

      '<tr><tr>' +

        '<td colspan="3" class="close"><a href="javascript:;">Save and Close</a></td>' +

      '<tr></table></div>';



    var select =

      '<div class="ff-menu"><table><tr>' +

        '<td><input type="radio" name="select_option" value="any_value" id="ff-any-value" checked /></td>' +

        '<td colspan="2"><label for="ff-any-value">Any value</label></td>' +

      '<tr><tr>' +

        '<td><input type="radio" name="select_option" value="any_value_null" id="ff-any-value-null" /></td>' +

        '<td colspan="2"><label for="ff-any-value-null">Any not zeroed value</label></td>' +

      '<tr><tr>' +

        '<td><input type="radio" name="select_option" value="dont_fill" id="ff-dont-select" /></td>' +

        '<td><label for="ff-dont-select">Don\'t fill</label></td>' +

        '<td><em>Leave as is</em></td>' +

      '<tr><tr>' +

        '<td colspan="3" class="close"><a href="javascript:;">Save and Close</a></td>' +

      '<tr></table></div>';



    var textarea =

      '<div class="ff-menu"><table><tr>' +

        '<td><input type="radio" name="textarea_option" value="gen_text" id="ff-gen-textarea" checked /></td>' +

        '<td colspan="2"><label for="ff-gen-textarea">Generate "fish" text</label></td>' +

      '<tr><tr>' +

        '<td><input type="radio" name="textarea_option" value="dont_fill" id="ff-dont-fill-textarea" /></td>' +

        '<td><label for="ff-dont-fill-textarea">Don\'t fill</label></td>' +

        '<td><em>Leave as is</em></td>' +

      '<tr><tr>' +

        '<td colspan="3" class="close"><a href="javascript:;">Save and Close</a></td>' +

      '<tr></table></div>';



    var radio =

      '<div class="ff-menu"><table><tr>' +

        '<td><input type="radio" name="radio_option" value="random_select" id="ff-random-select" checked /></td>' +

        '<td colspan="2"><label for="ff-random-select">Random select</label></td>' +

      '<tr><tr>' +

        '<td><input type="radio" name="radio_option" value="dont_worry" id="ff-dont-worry" /></td>' +

        '<td><label for="ff-dont-worry">Don\'t worry</label></td>' +

        '<td><em>Leave as is</em></td>' +

      '<tr><tr>' +

        '<td colspan="3" class="close"><a href="javascript:;">Save and Close</a></td>' +

      '<tr></table></div>';



    var single =

      '<div class="ff-menu"><table><tr>' +

        '<td><input type="radio" name="single_option" value="random_select" id="ff-random-select" checked /></td>' +

        '<td colspan="2"><label for="ff-random-select">Random select</label></td>' +

      '<tr><tr>' +

        '<td><input type="radio" name="single_option" value="dont_worry" id="ff-dont-worry-s" /></td>' +

        '<td><label for="ff-dont-worry-s">Don\'t worry</label></td>' +

        '<td><em>Leave as is</em></td>' +

      '<tr><tr>' +

        '<td colspan="3" class="close"><a href="javascript:;">Save and Close</a></td>' +

      '<tr></table></div>';



    $.SubMenu = {

        text:     $(text).appendTo('body'),

        textarea:   $(textarea).appendTo('body'),

        select:   $(select).appendTo('body'),

        radio:     $(radio).appendTo('body'),

        single:   $(single).appendTo('body')

    };



    $.Defaults = {

        text:     {name: 'gen_text', value: ''},

        textarea:   {name: 'gen_text', value: ''},

        select:   {name: 'any_value', value: ''},

        radio:     {name: 'random_select', value: ''},

        single:   {name: 'random_select', value: ''}

    };



    $.FishText = ['Aliquam non nulla tellus, sit amet rhoncus sapien. Suspendisse dignissim auctor neque, at blandit diam pretium ut.', 'Curabitur blandit odio at leo malesuada sit amet dignissim justo tempus.', 'Fusce a turpis sed felis cursus volutpat id non nisl. Nulla tempor tempus tincidunt.', 'Proin a molestie felis. Aliquam mauris nisl, consequat at suscipit ac, euismod vitae nisl.', 'Ut eu mauris mi, sed pharetra turpis. Etiam vehicula, massa ac aliquam tincidunt, ante libero ultricies', 'Odio, non lobortis elit enim id urna. Cras a felis eu nisl mollis bibendum nec at diam.', 'Donec scelerisque nisi sed mi commodo sed auctor nisi sollicitudin! In sem velit, congue in suscipit eu, volutpat non orci.', 'Integer bibendum, nisi placerat venenatis vestibulum, sapien mauris mollis ligula, ac tristique enim justo vel elit.', 'Duis a ipsum eget ipsum aliquet pretium sit amet sed augue. Aliquam vulputate ligula et dolor accumsan in ornare odio porttitor.', 'Mauris lacus odio, pretium vitae vehicula vel, ullamcorper nec mi. Donec eget velit leo! In hac habitasse platea dictumst.', 'Donec nibh mauris, cursus sit amet suscipit sed, aliquet vestibulum sapien. In ultrices faucibus varius. Ut venenatis lorem et dui mattis cursus?', 'Phasellus elementum tristique risus, vitae ornare mauris dapibus sed. Praesent aliquet ligula eget nisl molestie vel tincidunt magna volutpat.', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', 'Phasellus lorem augue, venenatis elementum blandit blandit, pellentesque quis felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Maecenas venenatis, dolor tincidunt fringilla mattis, dui lorem tincidunt est; ut porttitor enim nisl vel velit.', 'Cras eget enim lacus! Curabitur sed libero viverra eros ultrices faucibus! Cras luctus elit quam.', 'Vivamus ut metus metus? Nam aliquet venenatis lorem, ac consectetur quam molestie a.', 'Donec sit amet erat quam. Praesent sagittis lectus vitae lorem facilisis ut dictum risus tempor?', 'Mauris fringilla elit blandit nisi tincidunt ut tempus felis tincidunt. Morbi pellentesque molestie metus sit amet placerat.', 'Vestibulum massa massa, pellentesque eu mattis eget, feugiat non ligula. Etiam fermentum purus vitae velit venenatis suscipit.', 'Vestibulum eu orci quam, nec luctus nisl. Nullam auctor, turpis sit amet sodales fringilla, dui metus euismod lacus, ut dictum augue leo ac nisl!', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nulla sapien, rhoncus a luctus ac, pharetra sed eros?', 'Sed massa justo, iaculis eu iaculis quis, venenatis sed ipsum. Praesent facilisis vulputate orci, et mattis risus posuere at.', 'Nam bibendum volutpat fringilla. Donec turpis ante, pellentesque vel tincidunt vel, tempus eu urna.', 'Ut egestas, eros eget facilisis semper, magna arcu rutrum elit; venenatis auctor lectus neque vel risus! Suspendisse potenti.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi augue tortor, suscipit nec aliquam varius, vulputate vel sem.', 'Nunc pharetra bibendum varius. Donec tincidunt lorem vitae orci malesuada non porta risus porta.', 'Aliquam ultrices ligula sed risus sagittis in volutpat elit volutpat! Donec et est tortor!', 'Vivamus erat nisi, pulvinar eu commodo sit amet, cursus a eros. Praesent porttitor nunc ac dui aliquet mattis.', 'Sed mollis sapien a nisi vestibulum tincidunt. Maecenas mollis scelerisque congue.', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', 'Integer vel semper augue. Nullam in odio sapien; vitae ultricies magna. Pellentesque sed mauris ut lectus consectetur interdum et sit amet diam.', 'Integer dignissim, felis adipiscing molestie feugiat, magna erat hendrerit risus, at semper arcu lectus in nisi!', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent viverra faucibus rutrum.', 'Cras fermentum lacus et erat bibendum sed faucibus sem pulvinar. Nunc pellentesque fringilla mauris quis ultricies?', 'Vivamus nec posuere nisi. Fusce metus ipsum, laoreet nec ultrices euismod, molestie ac quam.', 'In adipiscing interdum leo, vitae interdum enim semper porttitor. Sed euismod fringilla erat, et consequ'];



    $.button = $('<a href="javascript:;" class="ff-edit-options"><small>Change Options</small></a>').appendTo('body');



    $.button.menuState = false;

    $.button.timer = null;



    $.button.open = function( obj ) {

      $.button.css('left', ($(obj).position().left + $(obj).outerWidth() + 5));

      $.button.css('top', ($(obj).position().top + 2));

      $.button.caller = obj;



      $.button.show();

    }

    $.button.close = function() {

      if(!jQuery.isEmptyObject($.button.menu)) { $.button.menu.hide(); }

      $.button.menuState = false;

      $.button.hide();

    }



    $.button.viewSubMenu = function() {

      var caller = $($.button.caller);



      if(caller.is('input:not(:checkbox,:radio)')) { $.button.menu = $.SubMenu.text; }

      if(caller.is('textarea')) { $.button.menu = $.SubMenu.textarea; }

      if(caller.is('select')) { $.button.menu = $.SubMenu.select; }

      if(caller.is('input:checkbox')) { $.button.menu = $.SubMenu.single; }

      if(caller.is('input:radio')) { $.button.menu = $.SubMenu.radio; }



      //$.button.menu.find('input[type="text"]').val('');

      $.button.menu.css({left: $.button.css('left'), top: ($.button.position().top + $.button.outerHeight() + 5)});



      $.button.menu.mouseenter(function() {

        window.clearTimeout( $.button.timer );

      });



      $.button.menu.initText = function( options ) {

        if( options == null ) { options = $.Defaults.text; }



        $.button.menu.find('input[value="' + options.name + '"]').attr('checked', true);



        switch(options.name) {

          case 'use_static':

            $.button.menu.find('input[name="static_text"]').val(options.value);

            break;



          case 'email':

            $.button.menu.find('input[name="email"]').val(options.value);

            break;



          case 'any_from_list':

            $.button.menu.find('input[name="any_from_list"]').val(options.value);

            break;



          case 'dont_fill':

          case 'gen_text':

          default:

            break;

        }

      };



      $.button.menu.initTextarea = function( options ) {

        if( options == null ) { options = $.Defaults.textarea; }

        $.button.menu.find('input[value="' + options.name + '"]').attr('checked', true);

      };



      $.button.menu.initSelect = function( options ) {

        if( options == null ) { options = $.Defaults.select; }

        $.button.menu.find('input[value="' + options.name + '"]').attr('checked', true);

      };



      $.button.menu.initSingle = function( options ) {

        if( options == null ) { options = $.Defaults.single; }

        $.button.menu.find('input[value="' + options.name + '"]').attr('checked', true);

      };



      $.button.menu.initRadio = function( options ) {

        if( options == null ) { options = $.Defaults.radio; }

        $.button.menu.find('input[value="' + options.name + '"]').attr('checked', true);

      };



      $.button.getOption = function() {

        var caller = $($.button.caller);



        if(caller.is('input:not(:checkbox,:radio)')) {

          switch($.button.menu.find('input:checked').val()) {

            case 'use_static':

              return {name: 'use_static', value: $.button.menu.find('input[name="static_text"]').val()};



            case 'email':

              return {name: 'email', value: $.button.menu.find('input[name="email"]').val()};



            case 'any_from_list':

              return {name: 'any_from_list', value: $.button.menu.find('input[name="any_from_list"]').val()};



            case 'gen_text':

            default:

              return {name: 'gen_text', value: ''};



            case 'dont_fill':

              return {name: 'dont_fill', value: ''};



          }

        }



        if(caller.is('textarea') || caller.is('select') || caller.is('input:radio') || caller.is('input:checkbox')) { // These objects has identical menus..

          return {name: $.button.menu.find('input:checked').val(), value: ''};

        }



        return null;

      };



      $.button.menu.loadParams();

    }



    $.button.mouseenter(function() {

      window.clearTimeout( $.button.timer );

    });



    $.button.mouseleave(function() {

      if(!$.button.menuState) {

        $.button.timer = window.setTimeout(function() {

          $.button.close();

        }, 300);

      }

    });



    $.button.click(function() {

      window.clearTimeout( $.button.timer );

      if(!$.button.menuState) {

        $.button.viewSubMenu();

      } else {

        $.button.menu.hide();

      }

      $.button.menuState = !$.button.menuState;

    });



    $.button.close();



    jQuery.each($.SubMenu, function(i, menu) { // Cursor over menu, cancel button hiding

      menu.mouseenter(function() {

        window.clearTimeout( $.button.timer );

      });



      menu.find('td.close a').click(function() { // Cursor go out from menu - hide menu & save changes

        $.button.close();

        menu.saveParams();

      });

    });



    $('body').append('<div class="ff-console"><div class="ff-list"><a href="javascript:;" class="close">Close</a></div><a class="ff-tail">Forms Filler</a></div>');



    $('form').each(function(i, form) {

      $(form).data('order', ('form-' + i ));



      $('.ff-list').append('<h2>Form #' + (i + 1) + '</h2>');



      var row = $('<p></p>').appendTo('.ff-list');

      var btnFill = $('<a href="javascript:;">Fill Form</a>').appendTo(row).data('order', ('form-' + i));

      var aFill = $('<input name="auto_fill" value="' + i + '" type="checkbox" id="af-' + i + '" />').appendTo(row);

      $('<label for="af-' + i + '">Auto Fill</label>').appendTo(row);



      btnFill.click(function() { $(form).fillForm(); });



      aFill.click(function(){

        $.cookie( $(form).data('order'), ($(this).attr('checked') ? true : null), { expires: 365 } );

      });



      $('input[name="auto_fill"]').each(function(index, ctrl) {

        if($.cookie( 'form-' + $(ctrl).val() )) {

          $(ctrl).attr('checked', true);



          $('form').each(function(idx, fm) {

            if($(fm).data('order') == ('form-' + $(ctrl).val())) {

              setTimeout(function() { btnFill.trigger('click'); }, 1000);

            }

          });

        }

      });

    });



    $('.ff-tail,.ff-list a.close').click(function() { $('.ff-list').animate({height: 'toggle'}, 200, 'linear'); });

  }