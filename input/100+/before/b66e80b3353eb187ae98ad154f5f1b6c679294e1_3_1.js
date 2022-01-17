function ($, _, backbone, teamView, gameView, teamCollection) {
    var Teams = new teamCollection();
    var TeamView = backbone.View.extend({
        el: $("#content"),
        /*tagName : "ul",*/
        initialize : function(){
            _.bindAll(this, 'refreshed', 'addRow');
            Teams.bind("addToList", this.addRow);
            Teams.bind("reset", this.refreshed);
        },
        // Prepends an entry row
        addRow : function(team){
            var view = new teamView({model: team});
            var rendered = view.render().$el;
            rendered.bind('click', function(row){
                var gameList = new gameView($(this).closest('li').find('div').text());
                $(this).closest('li').append(gameList.render().$el);
            })

            this.$el.prepend(rendered);
        },
        refreshed : function(){
            // reset the table
            $("#content").html("");
            if(Teams.length > 0){
                // add each element
                Teams.each(this.addRow);
            }
        }
    });
    Teams.fetch();
    return TeamView;
}