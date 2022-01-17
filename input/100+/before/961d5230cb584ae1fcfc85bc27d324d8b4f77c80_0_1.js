function(i){
                var $input, $tr;
                $input = $(this);
                $input.val(i+1);
                // fix the zebra stripes
                $tr = $input.closest('tr');
                $tr.removeClass('row1 row1');
                $tr.addClass('row'+((i%2)+1));
            }