function(tcURL, tcID, toOptions, tlUseBlank)
            {
                // Prepare any defaults
                if (!tcURL){tcURL = "";}
                if (!tcID){tcID = "default";}

                console.error(this.lastSettings);

                // Merge the options with the default options
                var loDefaults = this.lastSettings;
                if (toOptions)
                {
                    for (var loProp in toOptions)
                    {
                         loDefaults[loProp] = toOptions[loProp];
                    }
                }
                // Close previously opened popup
                this.close(tcID);

                // Create the popup string
                var lcPopup = "";
                for (var lcProp in loDefaults)
                {
                    lcPopup += lcProp + '=' + loDefaults[lcProp] + ',';
                }
                var loPopup = window.open(tcURL, tcID, lcPopup.substring(0, lcPopup.length-1));
                if (loPopup)
                {
                    if (window.focus)
                    {
                        loPopup.focus();
                        this.popups[tcID] = loPopup;
                        return loPopup;
                    }
                }
                else if (tlUseBlank)
                {
                    // Open the URL as a link with a blank target
                    // TODO: Implement this
                    alert('Please disable your pop-up blocker and try again.');
                }
                else
                {
                    alert('Please disable your pop-up blocker and try again.');
                }
                return null;
            }