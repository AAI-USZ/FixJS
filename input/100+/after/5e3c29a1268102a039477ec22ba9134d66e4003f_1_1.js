function( browser, elem, stripeWidth, refseq, zoomLevel, browserRoot) {

    // keep a reference to the main browser object
    this.browser = browser;

    var seqCharSize = this.calculateSequenceCharacterSize( elem );
    this.charWidth = seqCharSize.width;
    this.seqHeight = seqCharSize.height;

    this.posHeight = this.calculatePositionLabelHeight( elem );
    // Add an arbitrary 50% padding between the position labels and the
    // topmost track
    this.topSpace = 1.5 * this.posHeight;

    //the reference sequence
    this.ref = refseq;
    //current scale, in pixels per bp
    this.pxPerBp = zoomLevel;
    //path prefix for static assets (e.g., cursors)
    this.browserRoot = browserRoot ? browserRoot : "";
    //width, in pixels, of the vertical stripes
    this.stripeWidth = stripeWidth;
    //the page element that the GenomeView lives in
    this.elem = elem;

    // the scrollContainer is the element that changes position
    // when the user scrolls
    this.scrollContainer = dojo.create(
        'div', {
            id: 'container',
            style: { position: 'absolute',
                     left: '0px',
                     top: '0px'
                   }
        }, elem
    );

    this._renderVerticalScrollBar();

    // we have a separate zoomContainer as a child of the scrollContainer.
    // they used to be the same element, but making zoomContainer separate
    // enables it to be narrower than this.elem.
    this.zoomContainer = document.createElement("div");
    this.zoomContainer.id = "zoomContainer";
    this.zoomContainer.style.cssText =
        "position: absolute; left: 0px; top: 0px; height: 100%;";
    this.scrollContainer.appendChild(this.zoomContainer);

    this.outerTrackContainer = document.createElement("div");
    this.outerTrackContainer.className = "trackContainer outerTrackContainer";
    this.outerTrackContainer.style.cssText = "height: 100%;";
    this.zoomContainer.appendChild( this.outerTrackContainer );

    this.trackContainer = document.createElement("div");
    this.trackContainer.className = "trackContainer innerTrackContainer draggable";
    this.trackContainer.style.cssText = "height: 100%;";
    this.outerTrackContainer.appendChild( this.trackContainer );

    //width, in pixels of the "regular" (not min or max zoom) stripe
    this.regularStripe = stripeWidth;
    //width, in pixels, of stripes at full zoom (based on the sequence
    //character width)
    //The number of characters per stripe is somewhat arbitrarily set
    //at stripeWidth / 10
    this.fullZoomStripe = this.charWidth * (stripeWidth / 10);

    this.overview = dojo.byId("overview");
    this.overviewBox = dojo.coords(this.overview);

    this.tracks = [];
    this.uiTracks = [];
    this.trackIndices = {};

    //set up size state (zoom levels, stripe percentage, etc.)
    this.sizeInit();

    //distance, in pixels, from the beginning of the reference sequence
    //to the beginning of the first active stripe
    //  should always be a multiple of stripeWidth
    this.offset = 0;
    //largest value for the sum of this.offset and this.getX()
    //this prevents us from scrolling off the right end of the ref seq
    this.maxLeft = this.bpToPx(this.ref.end+1) - this.getWidth();
    //smallest value for the sum of this.offset and this.getX()
    //this prevents us from scrolling off the left end of the ref seq
    this.minLeft = this.bpToPx(this.ref.start);
    //distance, in pixels, between each track
    this.trackPadding = 20;
    //extra margin to draw around the visible area, in multiples of the visible area
    //0: draw only the visible area; 0.1: draw an extra 10% around the visible area, etc.
    this.drawMargin = 0.2;
    //slide distance (pixels) * slideTimeMultiple + 200 = milliseconds for slide
    //1=1 pixel per millisecond average slide speed, larger numbers are slower
    this.slideTimeMultiple = 0.8;
    this.trackHeights = [];
    this.trackTops = [];
    this.trackLabels = [];
    this.waitElems = dojo.filter( [ dojo.byId("moveLeft"), dojo.byId("moveRight"),
                                    dojo.byId("zoomIn"), dojo.byId("zoomOut"),
                                    dojo.byId("bigZoomIn"), dojo.byId("bigZoomOut"),
                                    document.body, elem ],
                                  function(e) { return e; }
                                );
    this.prevCursors = [];
    this.locationThumb = document.createElement("div");
    this.locationThumb.className = "locationThumb";
    this.overview.appendChild(this.locationThumb);
    this.locationThumbMover = new dndMove.parentConstrainedMoveable(this.locationThumb, {area: "margin", within: true});

    if ( dojo.isIE ) {
        // if using IE, we have to do scrolling with CSS
        this.x = -parseInt( this.scrollContainer.style.left );
        this.y = -parseInt( this.scrollContainer.style.top );
        this.rawSetX = function(x) {
            this.scrollContainer.style.left = -x + "px";
            this.x = x;
        };
        this.rawSetY = function(y) {
            this.scrollContainer.style.top = -y + "px";
            this.y = y;
        };
    } else {
	this.x = this.elem.scrollLeft;
	this.y = this.elem.scrollTop;
        this.rawSetX = function(x) {
            this.elem.scrollLeft = x;
            this.x = x;
        };
        this.rawSetY = function(y) {
            this.elem.scrollTop = y;
            this.y = y;
        };
    }

    var scaleTrackDiv = document.createElement("div");
    scaleTrackDiv.className = "track static_track rubberBandAvailable";
    scaleTrackDiv.style.height = this.posHeight + "px";
    scaleTrackDiv.id = "static_track";

    this.scaleTrackDiv = scaleTrackDiv;
    this.staticTrack = new LocationScaleTrack("static_track", "pos-label", this.posHeight);
    this.staticTrack.setViewInfo(function(height) {}, this.stripeCount,
                                 this.scaleTrackDiv, undefined, this.stripePercent,
                                 this.stripeWidth, this.pxPerBp,
                                 this.trackPadding);
    this.zoomContainer.appendChild(this.scaleTrackDiv);
    this.waitElems.push(this.scaleTrackDiv);

    var gridTrackDiv = document.createElement("div");
    gridTrackDiv.className = "track";
    gridTrackDiv.style.cssText = "top: 0px; height: 100%;";
    gridTrackDiv.id = "gridtrack";
    var gridTrack = new GridLinesTrack("gridtrack");
    gridTrack.setViewInfo(function(height) {}, this.stripeCount,
                          gridTrackDiv, undefined, this.stripePercent,
                          this.stripeWidth, this.pxPerBp,
                          this.trackPadding);
    this.trackContainer.appendChild(gridTrackDiv);
    this.uiTracks = [this.staticTrack, gridTrack];

    // accept tracks being dragged into this
    this.trackDndWidget =
        new dndSource(
            this.trackContainer,
            {
                accept: ["track"], //accepts only tracks into the viewing field
                withHandles: true,
                creator: dojo.hitch( this, function( trackConfig, hint ) {
                    return {
                        data: trackConfig,
                        type: ["track"],
                        node: hint == 'avatar'
                                 ? dojo.create('div', { innerHTML: trackConfig.key || trackConfig.label, className: 'track-label dragging' })
                                 : this.renderTrack( trackConfig )
                    };
                })
            });

    // subscribe to showTracks commands
    this.browser.subscribe(
        '/dnd/drop',
        dojo.hitch(
            this,
            function( source, nodes, copy, target ) {
                this.updateTrackList();
                if( target.node === this.trackContainer ) {
                    // if dragging into the trackcontainer, we are showing some tracks
                    // get the configs from the tracks being dragged in
                    var confs = dojo.filter( dojo.map( nodes, function(n) {
                                                           return n.track && n.track.config;
                                                       }),
                                             function(c) {return c;}
                                           );
                    this.browser.publish( '/jbrowse/v1/v/tracks/show', confs );
                }
            }
        )
    );
    this.browser.subscribe( '/jbrowse/v1/c/tracks/show', dojo.hitch( this, 'showTracks' ));
    this.browser.subscribe( '/jbrowse/v1/c/tracks/hide', dojo.hitch( this, 'hideTracks' ));

    // render our UI tracks (horizontal scale tracks, grid lines, and so forth)
    dojo.forEach(this.uiTracks, function(track) {
        track.showRange(0, this.stripeCount - 1,
                        Math.round(this.pxToBp(this.offset)),
                        Math.round(this.stripeWidth / this.pxPerBp),
                        this.pxPerBp);
    }, this);

    this.zoomContainer.style.paddingTop = this.topSpace + "px";

    this.addOverviewTrack(new LocationScaleTrack("overview_loc_track", "overview-pos", this.overviewPosHeight));
    this.showFine();
    this.showCoarse();

    // initialize the behavior manager used for setting what this view
    // does (i.e. the behavior it has) for mouse and keyboard events
    this.behaviorManager = new BehaviorManager({ context: this, behaviors: this._behaviors() });
    this.behaviorManager.initialize();
}