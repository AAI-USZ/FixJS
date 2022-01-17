function () {
                                            if (this._windows /*will be null if we're closing down*/ &&
                                                metaWin.get_compositor_private() &&
                                                metaWin.get_workspace() == this.metaWorkspace)
                                            {
                                                this._doAddWindow(metaWin);
                                            }
                                            return false;
                                        }