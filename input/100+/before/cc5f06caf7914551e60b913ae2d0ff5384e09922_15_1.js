function ($, _, Backbone, app, ich, EditMapView, EditMediaView, EmbeddedVideoView, EmbeddedVideo) {
    var ObservationFormLayoutView = Backbone.Marionette.Layout.extend({

        className: 'form observation-form',

        template: 'ObservationForm',

        regions: {
            media: '#media-resources-fieldset',
            map: '#location-fieldset',
            video: '#video-upload'
        },

        events: {
            'click #cancel': '_cancel',
            'click #save': '_save',
            'change input#Title': '_contentChanged',
            'change input#ObservedOn': '_contentChanged',
            'change input#Address': '_contentChanged',
            'change input#Latitude': '_latLongChanged',
            'change input#Longitude': '_latLongChanged',
            'change input#IsIdentificationRequired': '_isIdentificationRequiredChanged',
            'change input#AnonymiseLocation': '_anonymiseLocationChanged',
            'change #projects-field input:checkbox': '_projectsChanged',
            'change #category-field input:checkbox': '_categoryChanged',
            'click #media-resource-import-button': '_showImportMedia',
            'click #media-resource-embed-button': '_showEmbeddedVideo'
        },

        initialize: function (options) {
            log('observationFormLayoutView:initialize');
            this.categories = options.categories;
            this.model.mediaResources.on('change:Metadata', this.onMediaResourceFilesChanged, this);
        },

        serializeData: function () {
            log('observationFormLayoutView:serializeData');
            return {
                Model: {
                    Observation: this.model.toJSON(),
                    Categories: this.categories
                }
            };
        },

        onMediaResourceFilesChanged: function (mediaResource) {
            var dateTime = mediaResource.get('Metadata').DateTaken;
            this.model.set('ObservedOn', dateTime);
            this.$el.find('#ObservedOn').val(dateTime);
        },

        onShow: function () {
            log('observationFormLayoutView:onShow');
            this._showDetails();
        },

        showBootstrappedDetails: function () {
            log('observationFormLayoutView:showBootStrappedDetails');
            this.initializeRegions();
            this._showDetails();
        },

        _showDetails: function () {
            log('observationFormLayoutView:_showDetails');
            var editMapView = new EditMapView({ el: '#location-fieldset', model: this.model });
            this.map.attachView(editMapView);
            editMapView.render();

            var editMediaView = new EditMediaView({ el: '#media-resources-fieldset', model: this.model });
            this.media.attachView(editMediaView);
            editMediaView.render();

            this.observedOnDatePicker = this.$el.find('#ObservedOn').datepicker();

            this.categoryListSelectView = this.$el.find("#Category").multiSelect({
                selectAll: false,
                singleSelect: true,
                noOptionsText: 'No Categories',
                noneSelected: '<span>Select Category</span>',
                oneOrMoreSelected: function (selectedOptions) {
                    var $selectedHtml = $('<span />');
                    _.each(selectedOptions, function (option) {
                        $selectedHtml.append('<span>' + option.text + '</span> ');
                    });
                    return $selectedHtml.children();
                }
            });

            if (!ich.templates.ProjectSelectItem) {
                ich.addTemplate('ProjectSelectItem', '{{#Projects}}<option value="{{Id}}">{{Name}}</option>{{/Projects}}');
            }

            // Add project options
            this.$el.find('#Projects').append(ich.ProjectSelectItem({ Projects: app.authenticatedUser.projects.toJSON() }));

            this.projectListSelectView = this.$el.find('#Projects').multiSelect({
                selectAll: false,
                messageText: 'You can select more than one project',
                noOptionsText: 'No Projects',
                noneSelected: '<span>Select Projects</span>',
                renderOption: function (id, option) {
                    var html = '<label><input style="display:none;" type="checkbox" name="' + id + '[]" value="' + option.value + '"';
                    if (option.selected) {
                        html += ' checked="checked"';
                    }
                    var project = app.authenticatedUser.projects.get(option.value);

                    html += ' /><img src="' + project.get('Avatar').Files.thumbnail.RelativeUri + '" alt="" />' + project.get('Name') + '</label>';
                    return html;
                },
                oneOrMoreSelected: function (selectedOptions) {
                    var $selectedHtml = $('<div />');
                    _.each(selectedOptions, function (option) {
                        var project = app.authenticatedUser.projects.get(option.value);
                        $selectedHtml.append('<span class="selected-project"><img src="' + project.get('Avatar').Files.thumbnail.RelativeUri + '" alt="" />' + option.text + '</span> ');
                    });
                    return $selectedHtml.children();
                }
            });
        },

        _showImportMedia: function () {
            alert('Coming soon');
        },

        _showEmbeddedVideo: function () {
            log('observationFormLayoutView._showEmbeddedVideo');
            var embeddedVideo = new EmbeddedVideoView({ el: $('#modal-dialog'), model: new EmbeddedVideo()});
            embeddedVideo.render();
        },

        _contentChanged: function (e) {
            var target = $(e.currentTarget);
            var data = {};
            data[target.attr('id')] = target.attr('value');
            this.model.set(data);

            if (target.attr('id') === 'Address') {
                this._latLongChanged(e);
            }
        },

        _latLongChanged: function (e) {
            var oldPosition = { latitude: this.model.get('Latitude'), longitude: this.model.get('Longitude') };
            var newPosition = { latitude: $('#Latitude').val(), longitude: $('#Longitude').val() };

            this.model.set('Latitude', newPosition.latitude);
            this.model.set('Longitude', newPosition.longitude);

            // Only update pin if the location is different to avoid infinite loop
            if (newPosition.Latitude != null && newPosition.Longitude != null && (oldPosition.Latitude !== newPosition.Latitude || oldPosition.Longitude !== newPosition.Longitude)) {
                this.editMapView.changeMarkerPosition(this.model.get('Latitude'), this.model.get('Longitude'));
            }
        },

        _isIdentificationRequiredChanged: function (e) {
            var $checkbox = $(e.currentTarget);
            this.model.set({ IsIdentificationRequired: $checkbox.attr('checked') == 'checked' ? true : false });
        },

        _anonymiseLocationChanged: function (e) {
            var $checkbox = $(e.currentTarget);
            this.model.set({ AnonymiseLocation: $checkbox.attr('checked') == 'checked' ? true : false });
        },

        _projectsChanged: function (e) {
            var $checkbox = $(e.currentTarget);
            if ($checkbox.attr('checked') === 'checked') {
                var projectId = $checkbox.attr('value');
                this.model.addProject(projectId);
            } else {
                this.model.removeProject($checkbox.attr('value'));
            }
        },

        _categoryChanged: function (e) {
            var $checkbox = $(e.currentTarget);
            if ($checkbox.attr('checked') === 'checked') {
                this.model.set('Category', $checkbox.attr('value'));
            } else {
                this.model.set('Category', '');
            }
        },

        _cancel: function () {
            app.showPreviousContentView();
            //this.trigger('formClosed', this);
        },

        _save: function () {
            this.model.save();
            app.showPreviousContentView();
            //app.appRouter.navigate(app.stream.get('Uri'), { trigger: false });
            //this.trigger('formClosed', this);
        }
    });

    return ObservationFormLayoutView;

}