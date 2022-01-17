function getCellFromEvent(e) {
            var $cell = $(e.target).closest(".slick-cell", $canvas);
            if (!$cell.length) {
                return null;
            }

            // TODO: This change eliminates the need for getCellFromEvent since
            //  we're ultimately calling getCellFromPoint.  Need to further analyze
            //  if getCellFromEvent can work with frozen columns

            var c = $cell.parents('.grid-canvas').offset();

            var rowOffset = 0;
            var isBottom = $cell.parents('.grid-canvas-bottom').length;

            if ( options.frozenRow > -1 && isBottom ) {
                rowOffset = options.frozenRow * options.rowHeight;
            }

            var row = getCellFromPoint(e.clientX - c.left, e.clientY - c.top + rowOffset + $(document).scrollTop()).row;
            var cell = getCellFromNode($cell[0]);

            if (row == null || cell == null) {
                return null;
            } else {
                return {
                    "row": row,
                    "cell": cell
                };
            }
        }