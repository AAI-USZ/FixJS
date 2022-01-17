function(i){
                var $input, $tr, originalData;
                $input = $(this);
                $tr = $input.closest('tr');
                // if this is just an 'extra' input, don't change the order
                // but keep track of what the original row values were so we
                // can tell if they have changed
                if ($tr.find('td.delete input').length) {
                    $input.val(i+1);
                } else {
                    $input.addClass('new-row');
                    originalData = $('<form />').append($tr.clone()).serialize();
                    $input.data('original-data', originalData);
                }
                // fix the zebra stripes
                $tr.removeClass('row1 row1');
                $tr.addClass('row'+((i%2)+1));
            }