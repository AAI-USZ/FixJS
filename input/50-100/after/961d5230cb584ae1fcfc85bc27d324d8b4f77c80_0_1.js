function(i){
                var $input, originalData, newData;
                $input = $(this);
                // only update the ordering if this item is 1) a non new item
                // or if 2) it is new but its values have changed
                originalData = $input.data('original-data');
                newData = $('<form />').append($input.closest('tr').clone()).serialize();
                if ((!originalData) || (originalData != newData)) {
                    $input.val(i+1);
                }
            }