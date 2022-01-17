function()
                {
                    if(!!--thisValue.nbImagesLoading_)
                    {
                        thisValue.GetElement().innerHTML = (100*(thisValue.GetNbImages()-thisValue.GetNbImagesLoading())/thisValue.GetNbImages()).toFixed(1);
                    }
                    else
                    {
                        thisValue.GetElement().innerHTML = "100";
                    }
                }