function(view)
    {
        if (this._visibleView === view)
            return;
        if (this._visibleView)
            this._visibleView.detach();
        this._visibleView = view;
        view.show(this.mainElement);
    }