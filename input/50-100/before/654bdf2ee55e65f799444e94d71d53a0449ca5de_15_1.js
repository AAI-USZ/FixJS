function ($, _, Backbone) {

    var Project = Backbone.Model.extend({
        defaults: {
            Name: '',
            Description: '',
            Website: '',
            AvatarId: null,
            TeamId: null,
            Type: 'Project'
        },

        idAttribute: 'Id',

        urlRoot: '/projects',

        setAvatar: function (mediaResource) {
            this.set('AvatarId', mediaResource.id);
        }
    });

    return Project;

}