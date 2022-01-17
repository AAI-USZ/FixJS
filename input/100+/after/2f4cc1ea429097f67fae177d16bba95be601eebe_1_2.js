function ()
        {
            // init //
            {
                if (typeof $.fn.selection === 'undefined')
                {
                    throw new Error ('jQuery.fn.hangulEntry: required plugin (jQuery.fn.selection) is not defined');
                }
            }
            
            // var //
            {
                // elements //
                var input    = this;
                
                var entry    = $('<div class="hangulEntry"></div>');
                var tumbler  = $('<button class="tumbler"></button>');
                var keyboard = $('<div class="keyboard"></div>');
                
                // lowercase tab and uppercase tab
                var lowerTab = $('<div class="lower case"></div>');
                var upperTab = $('<div class="upper case"></div>');
                var currentTab = lowerTab;
                
                // handlers //
                var selectionPlugin = input.selection();
                
                // input data //
                var syllableChain = new SyllableChain;
                
                // state //
                var keyboardShown;
            }
            
            // private //
            {
                var spawnTab = (function()
                {
                    // var //
                    {
                        var prevSelection; // instanceof Selection
                        var depressShift;  // boolean
                    }
                    
                    // private //
                    {
                        // implementation //
                        {
                            var redrawQueue = function redrawQueue()
                            {
                                return selectionPlugin.replace (syllableChain.toString());
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
                        }
                        
                        // performed actions //
                        {
                            // characters
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
                                
                                if (depressShift)
                                {
                                    showLowerTab();
                                }
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
                                if (depressShift)
                                {
                                    showLowerTab();
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
                                if (depressShift)
                                {
                                    showLowerTab();
                                }
                            };
                            
                            // shift
                            var getShowUpperTab = function getShowUpperTab (keydown)
                            {
                                return function showUpperTab()
                                {
                                    if (currentTab === upperTab)
                                    {
                                        return;
                                    }
                                    currentTab.hide();
                                    currentTab = upperTab;
                                    currentTab.show();
                                    
                                    if (prevSelection)
                                    {
                                        // For some reason selection resets in FF.
                                        // Restore it to avoid removal of input contents.
                                        selectionPlugin.set (prevSelection.start, prevSelection.end);
                                    }
                                    
                                    /**
                                     * If shift is being clicked on the screen, it should be depressed after
                                     * the next input. Otherwise it is preserved.
                                    **/
                                    depressShift = ! keydown;
                                };
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
                                
                                if (prevSelection)
                                {
                                    // For some reason selection resets in FF.
                                    // Restore it to avoid removal of input contents.
                                    selectionPlugin.set (prevSelection.start, prevSelection.end);
                                }
                            };
                            
                            // space/SPACE
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
                                
                                if (depressShift)
                                {
                                    showLowerTab();
                                }
                            };
                        }
                        
                        // attached handlers //
                        {
                            var getJamoHandler = function getJamoHandler (jamo)
                            {
                                return function ()
                                {
                                    addJamo (jamo);
                                };
                            }
                            
                            /**
                             *  @param  {string}    key     key from layout/LAYOUT consts.
                             *  @param  {boolean}   keydown whether it is keydown event that is being handled.
                            **/
                            var getSpecialHandler = function getSpecialHandler (key, keydown)
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
                                    return getShowUpperTab (keydown);
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
                        
                            var decorateHandler = function decorateHandler (handler)
                            {
                                return function onPress ()
                                {
                                    $(this)
                                        .css        ({ backgroundColor : '#aff' })
                                        .animate    ({ backgroundColor : '#fff' })
                                    ;
                                    handler();
                                }
                            };
                        }
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
                                var handler = false;
                                if (Jamo.exists (name))
                                {
                                    // jamo
                                    var jamo = Jamo.get (name);
                                    handler = getJamoHandler (jamo);
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
                                    handler = getSpecialHandler (key);
                                }
                                
                                var keyDiv = $(inner);
                                if (handler)
                                {
                                    keyDiv.click (decorateHandler (handler));
                                }
                                lineDiv.append (keyDiv);
                            }
                            caseTab.append (lineDiv);
                        }
                        caseTab.append ($('<br class="clear"/>'));
                        return caseTab;
                    };
                })();
            
                var showKeyboard = function()
                {
                    tumbler
                        .removeClass ('hide')
                        .addClass ('show')
                        .text ('hide keyboard')
                    ;
                    keyboard.show();
                    keyboardShown = true;
                };
                
                var hideKeyboard = function ()
                {
                    tumbler
                        .removeClass ('show')
                        .addClass ('hide')
                        .text ('show keyboard')
                    ;
                    keyboard.hide();
                    keyboardShown = false;
                };
                
                var tumblerClick = function ()
                {
                    if (keyboardShown)
                    {
                        hideKeyboard();
                    }
                    else
                    {
                        showKeyboard();
                    }
                    return false;
                };
            }
            
            // constructor //
            {
                tumbler.click (tumblerClick);
                entry.append (tumbler);
                
                // TODO: preserve keyboard state after posting.
                hideKeyboard();
                
                // TODO: determine whether input is multiline and add enter button if it is.
                keyboard.append (spawnTab (layout, lowerTab));
                keyboard.append (spawnTab (LAYOUT, upperTab));
                entry.append (keyboard);
                
                input.after (entry);
                
                currentTab.show();
                entry.show();
                
                // TODO: listen to keyboard events when keyboard is shown.
            }
        }