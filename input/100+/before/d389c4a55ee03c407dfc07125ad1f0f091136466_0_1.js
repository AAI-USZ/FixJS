function (id) {
        var activity = new App.Model.Activity({id:id});
        activity.fetch({async:false});

        var model = new App.Model.Timeslice({
            activity:activity.get('id')
        });

        model.set({
            'startedAt-date': moment().format('YYYY-MM-DD'),
            'stoppedAt-date': moment().format('YYYY-MM-DD')
        }, {silent: true});

        App.UI.menu.activateItem('activity');
        App.UI.router.switchView(new App.Views.Timeslice.Form({
            defaults:{
                title:'Edit Timeslice',
                template:'DimeTimetrackerFrontendBundle:Timeslices:form',
                templateEl:'#timeslice-form',
                backNavigation:'activity/' + activity.get('id') + '/edit'
            },
            model:model
        }));
    }