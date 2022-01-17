function ($, App) {

    App.menu({
        name:"activity",
        title:"Activity",
        route:"activity",
        weight:-20,
        active:true,
        callback:function () {
            App.UI.menu.activateItem('activity');
            App.UI.router.switchView(new App.Views.Activity.Index());
        }
    });

    // Define Routes
    App.route("activity:add", "activity/add", function () {
        var model = new App.Model.Activity();

        App.UI.menu.activateItem('activity');
        App.UI.router.switchView(new App.Views.Activity.Form({
            defaults:{
                title:'Add Activity',
                template:'DimeTimetrackerFrontendBundle:Activities:form',
                templateEl:'#activity-form',
                backNavigation:'activity'
            },
            model:model
        }));
    });

    App.route("activity:edit", "activity/:id/edit", function (id) {
        var model = new App.Model.Activity({id:id});
        model.fetch({async:false});

        App.UI.menu.activateItem('activity');
        App.UI.router.switchView(new App.Views.Activity.Form({
            defaults:{
                title:'Edit Activity',
                template:'DimeTimetrackerFrontendBundle:Activities:form',
                templateEl:'#activity-form',
                backNavigation:'activity'
            },
            model:model
        }));
    });

}