function resizeCanvas() {
            if (!initialized) {
                return;
            }

            if (options.autoHeight) {
                viewportH = options.rowHeight * (getDataLength() + (options.enableAddRow ? 1 : 0) + (options.leaveSpaceForNewRows ? numVisibleRows - 1 : 0));
                $paneTopL.css( 'position', 'relative' );

                if ( options.frozenColumn > -1 ) {
                    $container.height( viewportH + parseFloat($.css($headerScrollerL[0], "height")) + scrollbarDimensions.height);
                }
            } else {
                viewportH = getViewportHeight();
            }

            numVisibleRows = Math.ceil(viewportH / options.rowHeight);

            var paneTopH = (options.frozenRow > -1)
                         ? (options.rowHeight * options.frozenRow)
                           + parseFloat($.css($headerScrollerL[0], "height"))
                           + getVBoxDelta($headerScrollerL)
                           + (options.showTopPanel
                              ? options.topPanelHeight + getVBoxDelta($topPanelScroller)
                              : 0)
                           + (options.showHeaderRow
                              ? options.headerRowHeight + getVBoxDelta($headerRowScroller)
                              : 0)
                         : viewportH
                           + (options.showHeaderRow
                              ? options.headerRowHeight + getVBoxDelta($headerRowScroller)
                              : 0);

            var paneBottomTop = paneTopH;

            paneTopH += ( options.frozenColumn > -1 && options.autoHeight ) ? scrollbarDimensions.height : 0;

            //$paneTopL.css({
             //    'top': $paneHeaderL.height()
              //  ,'height': paneTopH
            //});

            var viewportTopH = (options.frozenRow > -1) ? (options.rowHeight * options.frozenRow) : viewportH;

            if ( options.frozenColumn > -1 && options.autoHeight ) {
                viewportTopH += scrollbarDimensions.height;
            }

            $viewportTopL.height(viewportTopH);

            var paneBottomH = viewportH
                            - viewportTopH
                            + parseFloat($.css($headerScrollerL[0], "height"))
                            + getVBoxDelta($headerScrollerL)
                            + (options.showTopPanel
                               ? options.topPanelHeight + getVBoxDelta($topPanelScroller)
                               : 0)
                            + (options.showHeaderRow
                               ? options.headerRowHeight + getVBoxDelta($headerRowScroller)
                               : 0);

            var viewportBottomH = viewportH - viewportTopH;

            if (options.frozenColumn > -1) {

                $viewportTopR.height(viewportTopH);

                if (options.frozenRow > -1) {
                    $paneBottomL.css({
                        'top': $paneHeaderL.height()
                    });
                  //IGOR todo figure out why there is a magic number here
                  var topSide = Math.min( (getDataLength()-1) * options.rowHeight +options.topPanelHeight-11 + options.headerRowHeight, viewportH );
                  $paneTopL.css({
                        'top': topSide,
                        'z-index': 10
                    });
                    $paneTopR.css({
                        'top': topSide,
                        'z-index': 10
                    });
                    
                    $paneBottomR.css({
                        'top': $paneHeaderL.height()
                        // 'top': paneBottomTop
                    });
                   
                    $viewportBottomR.height(viewportBottomH+ ( ( options.frozenColumn > -1 && options.autoHeight ) ? scrollbarDimensions.height : 0 ) );
                }
            } else {
                if (options.frozenRow > -1) {
                    $paneBottomL.css({
                        'width': '100%'
                    });

                    $paneBottomL.css('top', paneBottomTop);
                }
            }

            if (options.frozenRow > -1) {
                $viewportBottomL.height(viewportBottomH + ( ( options.frozenColumn > -1 && options.autoHeight ) ? scrollbarDimensions.height : 0 ) );
                $viewportBottomL.css( 'padding-bottom', options.rowHeight+ 'px' ); 
                $viewportBottomR.css( 'padding-bottom', options.rowHeight + 'px' ); 
                $canvasTopL.height(options.frozenRow * options.rowHeight);
                $canvasTopR.height(options.frozenRow * options.rowHeight);
            } else {
                $viewportTopR.height(viewportTopH);
            }

            //Fix for not having pane be relatively positioned
            if (options.frozenRow == -1 && options.frozenColumn == -1) {
            
                $paneTopL.css({
                    'top': $paneHeaderL.height()
                   ,'height': paneTopH
                });
            }

            if (options.forceFitColumns) {
                autosizeColumns();
            }

            updateRowCount();
            handleScroll();
            render();
        }