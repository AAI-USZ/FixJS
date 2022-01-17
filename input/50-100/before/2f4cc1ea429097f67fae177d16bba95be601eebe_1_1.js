function getSpecialClick (key)
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
                        }