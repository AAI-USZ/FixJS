function()
                {
                    // var //
                    {
                        var prevSelection; // instanceof Selection
                    }
                    
                    // private //
                    {
                        var redrawQueue = function redrawQueue()
                        {
                            return selectionPlugin.replace (syllableChain.toString());
                        };
                        
                        var addJamo = function addJamo (jamo)
                        {
                            var selection = selectionPlugin.get();
                            if (prevSelection && ! selection.isEqual (prevSelection))
                            {
                                // Discard jamo data from the chain which was unselected.
                                syllableChain = new SyllableChain;
                            }
                            
                            syllableChain.append (jamo);
                            prevSelection = redrawQueue();
                        };
                        
                        /**
                         * Simulate standard backspace behaviour in the input:
                         *  - if no selection is set, select a character preceeding the cursor's position.
                         *  - wipe current selection clean.
                        **/
                        var simulateBackspace = function simulateBackspace()
                        {
                            var selection = selectionPlugin.get();
                            if (! selection.length)
                            {
                                // Select preceeding character, if any.
                                if (selection.start)
                                {
                                    selection = selectionPlugin.set (selection.start - 1, selection.end);
                                }
                            }
                            
                            // Wipe out selection contents.
                            return selectionPlugin.replace('');
                        };
                        
                        // backspace
                        var deleteJamo = function deleteJamo()
                        {
                            var selection = selectionPlugin.get();
                            if (! selection.length ||
                                (prevSelection && ! selection.isEqual (prevSelection))
                            ) {
                                // Discard jamo data from the chain which was unselected.
                                syllableChain = new SyllableChain;
                                
                                // Simulate the backspace event to the input.
                                prevSelection = simulateBackspace();
                            }
                            else
                            {
                                syllableChain.deleteJamo();
                                prevSelection = redrawQueue();
                            }
                        };
                        
                        // BACKSPACE
                        var deleteSyllable = function deleteSyllable()
                        {
                            var selection = selectionPlugin.get();
                            if (! selection.length ||
                                (prevSelection && ! selection.isEqual (prevSelection))
                            ) {
                                // Discard jamo data from the chain which was unselected.
                                syllableChain = new SyllableChain;
                                
                                // Simulate the backspace event to the input.
                                prevSelection = simulateBackspace();
                            }
                            else
                            {
                                syllableChain.deleteSyllable();
                                prevSelection = redrawQueue();
                            }
                        };
                        
                        // shift
                        var showUpperTab = function showUpperTab()
                        {
                            if (currentTab === upperTab)
                            {
                                return;
                            }
                            currentTab.hide();
                            currentTab = upperTab;
                            currentTab.show();
                            
                            // TODO: Если был нажат "экранный шифт", после нажатия следующей кнопки
                            // кнопки надо сбросить на нижний регистр. Если клавиатурный -- то оставить.
                        };
                        
                        // SHIFT
                        var showLowerTab = function showLowerTab()
                        {
                            if (currentTab === lowerTab)
                            {
                                return;
                            }
                            currentTab.hide();
                            currentTab = lowerTab;
                            currentTab.show();
                        };
                        
                        var insertSpace = function insertSpace()
                        {
                            var selection = selectionPlugin.get();
                            if (! (prevSelection && ! selection.isEqual (prevSelection)))
                            {
                                selection = selectionPlugin.set (selection.end, selection.end);
                            }
                            
                            // Discard jamo data.
                            syllableChain = new SyllableChain;
                            selection = selectionPlugin.replace(' ');
                            prevSelection = selectionPlugin.set (selection.end, selection.end);
                        };
                        
                        var getJamoClick = function getJamoClick (jamo)
                        {
                            return function ()
                            {
                                addJamo (jamo);
                            };
                        }
                        
                        var getSpecialClick = function getSpecialClick (key)
                        {
                            if (key === 'backspace')
                            {
                                return deleteJamo;
                            }
                            if (key === 'BACKSPACE')
                            {
                                return deleteSyllable;
                            }
                            if (key === 'shift')
                            {
                                return showUpperTab;
                            }
                            if (key === 'SHIFT')
                            {
                                return showLowerTab;
                            }
                            if (key === 'spacebar' || key === 'SPACEBAR')
                            {
                                return insertSpace;
                            }
                        };
                    }
                    
                    // body //
                    return function spawnTab (layoutVariant, caseTab)
                    {
                        for (var lineNum = 0, lineCount = layoutVariant.length; lineNum < lineCount; ++lineNum)
                        {
                            var lineDiv = $('<div class="line line' + lineNum  + '"></div>');
                            for (var key in layoutVariant[lineNum])
                            {
                                if (! layoutVariant[lineNum].hasOwnProperty (key))
                                {
                                    continue;
                                }
                                
                                var name = layoutVariant[lineNum][key];
                                var inner = '';
                                var click = false;
                                if (Jamo.exists (name))
                                {
                                    // jamo
                                    var jamo = Jamo.get (name);
                                    click = getJamoClick (jamo);
                                    inner =
                                        '<table class="key">' +
                                            '<tr>' +
                                                '<td align="center">' + key + '</td>' +
                                                '<td align="center">' + jamo.hangul + '</td>' +
                                            '</tr>' +
                                            '<tr>' +
                                                '<td></td>' +
                                                '<td align="center">' + jamo.cyril + '</td>' +
                                            '</tr>' +
                                        '</table>'
                                    ;
                                }
                                else
                                {
                                    // specials
                                    inner = '<table class="key special"><tr><td>' + name + ' ' + key + '</td></tr></table>';
                                    click = getSpecialClick (key);
                                }
                                
                                var keyDiv = $(inner);
                                keyDiv.click (click);
                                // TODO: handle keydown event
                                lineDiv.append (keyDiv);
                            }
                            caseTab.append (lineDiv);
                        }
                        caseTab.append ($('<br class="clear"/>'));
                        return caseTab;
                    };
                }