function(el, id, options) {
        var self = this;
        this.setOptions(options);
        this.id = id;

        // -- Elements
        this.el = (typeof el === 'undefined' || typeOf(el) === 'null') ? $(document.body) : $(el);
        this.container = new Element('div', {
            id: 'gallery'
        }).inject(this.el);
        this.toolsElement = new Element('div', {id: 'frog_tools'}).inject(this.container, 'before');
        var uploaderElement = $('upload');

        // -- Members
        this.tilesPerRow = Frog.Prefs.tile_count;
        this.tileSize = Math.floor((window.getWidth() - 2) / this.tilesPerRow);
        this.objects = [];
        this.thumbnails = [];
        this.y = 0;
        this.timer = this._scrollTimer.periodical(30, this);
        this.dirty = true;
        this.requestValue = {};
        this.isRequesting = false;
        this.uploader = null;
        this.requestData = {};
        this.spinner = new Spinner(undefined, {message: "fetching images...", fxOptions: {duration: 0}});

        // -- Events
        window.addEvent('scroll', this._scroll.bind(this));
        window.addEvent('resize', this.resize.bind(this));
        window.addEventListener('hashchange', this.historyEvent.bind(this), false)
        this.container.addEvent('click:relay(a.frog-tag)', function(e, el) {
            self.filter(el.dataset.frog_tag_id);
        });
        this.container.addEvent('click:relay(a.frog-image-link)', this.viewImages.bind(this));
        Frog.Comments.addEvent('post', function(id) {
            var commentEl = $(self.thumbnails[id]).getElements('.frog-comment-bubble')[0];
            var count = commentEl.get('text').toInt();
            commentEl.set('text', count + 1);

        })

        // -- Instance objects
        this.controls = new Frog.Gallery.Controls(this.toolsElement, this.id);
        this.controls.addEvent('remove', this.removeItems.bind(this))
        this.uploader = new Frog.Uploader(this.id);
        this.uploader.addEvent('complete', function() {
            this.request();
        }.bind(this));
        this.viewer = new Frog.Viewer();
        this.viewer.addEvent('show', function() {
            window.scrollTo(0,0);
            self.container.setStyle('height', 0)
        }.bind(this));
        this.viewer.addEvent('hide', function() {
            self.container.setStyle('height', 'auto')
            this.resize();
            window.scrollTo(0,this.y);
        }.bind(this));
        this.keyboard = new Keyboard({
            active: true,
            events: {
                'ctrl+a': function(e) { e.stop(); $$('.thumbnail').addClass('selected'); },
                'ctrl+d': function(e) { e.stop(); $$('.thumbnail').removeClass('selected'); }
            }
        })
        
        var builderData;
        if (location.hash !== "") {
            data = JSON.parse(location.hash.split('#')[1]);
            builderData = data.filters;
        }
        this.builder = new Frog.QueryBuilder({
            data: builderData,
            onChange: function(data) {
                self.setFilters(data)
            }
        });
        $(this.builder).inject(this.container, 'before')
    }