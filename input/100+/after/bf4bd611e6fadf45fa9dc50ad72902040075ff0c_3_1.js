function () {
        	
        	// Get some selectors
            this.layout_tracks = this.element.querySelector(".layout-tracks");
            this.layout_markers = this.element.querySelector(".layout_markers");
            
            // Bind drag and drop event handlers
            this.container_layers.addEventListener("dragstart", this.handleLayerDragStart.bind(this), false);
            this.container_layers.addEventListener("dragend", this.handleLayerDragEnd.bind(this), false);
            this.container_layers.addEventListener("dragover", this.handleLayerDragover.bind(this), false);
            this.container_layers.addEventListener("drop", this.handleLayerDrop.bind(this), false);
            this.container_tracks.addEventListener("dragover", this.handleKeyframeDragover.bind(this), false);
            this.container_tracks.addEventListener("drop", this.handleKeyframeDrop.bind(this), false);
            
            // Bind the handlers for the config menu
            this.checkable_animated.addEventListener("click", this.handleAnimatedClick.bind(this), false);
            this.tl_configbutton.addEventListener("click", this.handleConfigButtonClick.bind(this), false);
            document.addEventListener("click", this.handleDocumentClick.bind(this), false);
            
            // Add some event handlers
            this.timeline_leftpane.addEventListener("click", this.handleTimelineLeftPanelClick.bind(this), false);
            this.layout_tracks.addEventListener("scroll", this.handleLayerScroll.bind(this), false);
            this.user_layers.addEventListener("scroll", this.handleLayerScroll.bind(this), false);
            this.end_hottext.addEventListener("changing", this.handleTrackContainerWidthChange.bind(this), false);
            this.playhead.addEventListener("mousedown", this.startPlayheadTracking.bind(this), false);
            this.playhead.addEventListener("mouseup", this.stopPlayheadTracking.bind(this), false);
            this.time_markers.addEventListener("click", this.updatePlayhead.bind(this), false);
            document.addEventListener("keydown", this.timelineLeftPaneKeydown.bind(this), false);
            document.addEventListener("keyup", this.timelineLeftPaneKeyup.bind(this), false);
            this.eventManager.addEventListener("updatedID", this.handleLayerIdUpdate.bind(this), false);
			this.checkable_lock.addEventListener("click",this.handleLockLayerClick.bind(this),false);
            this.checkable_visible.addEventListener("click",this.handleLayerVisibleClick.bind(this),false);
            this.addPropertyChangeListener("currentDocument.model.domContainer", this);
            
			// Start the panel out in disabled mode by default
			// (Will be switched on later, if appropriate).
            this.enablePanel(false);

            // Create the easing menu for future use.
            this.easingMenu = EasingMenuPopup;
        }