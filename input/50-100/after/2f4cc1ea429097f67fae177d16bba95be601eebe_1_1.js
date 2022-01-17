function showLowerTab()
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
                            }