function() {
        // Summary:
        //    Called after receiving the users list from the DB. Shows the user selection window for the group view.
        this._userList = this.userStore.getList();

        var view = phpr.viewManager.getView();

        view.selectorDialog.set('title', phpr.nls.get('Calendar2'));

        this._selectorContainerWidget = new phpr.Default.System.TemplateWrapper(
            { templateName: "phpr.Calendar2.template.selector.html" }
        );

        this.garbageCollector.addNode(this._selectorContainerWidget);

        view.selectorContainer.set('content', this._selectorContainerWidget);

        this._userSelector = new phpr.Calendar2.Selector({
            titleContainer: view.selectorTitle,
            labelContainer: this._selectorContainerWidget.label,
            errorContainer: this._selectorContainerWidget.error,
            doneButtonWidget: this._selectorContainerWidget.doneButton,
            selectionContainer: this._selectorContainerWidget.selection,
            selectorContainer: this._selectorContainerWidget.selector,
            itemList: this._userList,
            onComplete: dojo.hitch(this, this.usersSelectionDone),
            preSelection: this._usersSelected,
            labels: {
                title: phpr.nls.get('User selection'),
                label: phpr.nls.get('Select users for the group view'),
                done: phpr.nls.get('Done'),
                noSelection: phpr.nls.get('You have to select at least one user!')
            }
        });

        view.selectorDialog.show();
    }