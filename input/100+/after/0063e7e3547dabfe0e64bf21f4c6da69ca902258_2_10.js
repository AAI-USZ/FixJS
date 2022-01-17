function() {
                var state = {};
                state[collectionviewer.tuidls] = $(this).data('liststyle') || 'carousel';
                state.item = '';
                $.bbq.pushState(state);
            }