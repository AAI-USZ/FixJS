function ($, _, backbone, teamView, addTeamTemplate) {
    var view = backbone.View.extend({
        // If there's a change in our model, rerender it
        el: $("#content"),
        tagName : "ul",
        events : {
            "click #send" : "onSubmit"
        },
        /*template: _.template(addTeamTemplate),*/
        // Prepends an entry row
        addNew : function(team){
            var view = new teamView({model: team});
            var rendered = view.render().$el;
            /*this.$el.prepend(rendered);*/
            $("#content").append(rendered);
        },
        refreshTeams : function(){
            $("#content").html("");
            if(this.collection.length > 0){
                // add each element
                this.collection.each(this.addNew);
            }
            $("#content").append(_.template(addTeamTemplate));
        },

        initialize : function(){
            _.bindAll(this, "onSubmit");
        },
        // Simply takes the vals from the input fields and
        // creates a new Team.
        onSubmit : function(){
            var name = $("#name").val();
            // sanitize user input...you never know ;)
            name = name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
            this.collection.create({
                "name" : name,
                "date" : new Date().getTime()
            });
            this.refreshTeams();
        }
    });
    return view;
}