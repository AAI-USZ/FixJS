function () {
            var $i = $(this);
            var bpName = $i.attr('name');
            var adName = bpName.substr (0, bpName.length - 3) + 'ad]';
            var newInp = $('<input type="hidden" name="'+bpName+'" />');
            var isBp = $('<span class="isBp ui-corner-all" style="padding: .2em;"></span>');
            $i.attr('name', adName).attr ('autocomplete', 'off')
                .parentsUntil('form').parent().attr ('autocomplete', 'off');
            newInp.insertAfter ($i);
            isBp.insertAfter ($i);
            // on load, the value will be in bp, so put it in the bp field
            var ival = $i.val();
            if (!(isNaN (ival) || '' == ival || ival.length == 0)) {
                newInp.val($i.val());
                $i.val (useful.bp2ad (newInp.val()));
            }
            $i.keyup (function () {
                    var $this = $(this);
                    var lv = $this.data('last_value');
                    $this.data('last_value', $this.val())
                    if (lv != $this.val()) {
                        var ival = $i.val();
                        //newInp.val (useful.ad2bp (ival));
                        if (isNaN (ival) || '' == ival || ival.length == 0) {
                            $(this).siblings ('span.isBp').text ('(must be a number; years AD)').not(':animated').effect ('highlight', {}, 3000);
                        }
                        else {
                            newInp.val (useful.ad2bp (ival));
                            $(this).siblings ('span.isBp').text (' = ' + newInp.val() + ' bp').not(':animated').effect ('highlight', {}, 3000);
                        }
                        return true;
                    }

                    
                });
            $i.keyup();
        }