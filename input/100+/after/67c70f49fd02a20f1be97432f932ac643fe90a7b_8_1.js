function ()
            {
                // move left or right
                if (this.visible)
                {
                    this.onVisibleUpdate();
                }

                // move!
                this.parent();
            }