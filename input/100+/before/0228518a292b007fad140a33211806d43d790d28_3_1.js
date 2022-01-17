function() {
            this.objectInfoView = $("#objectInfoView");
            this.timelineView = $("#timelineView");
            this.timelineView[0].style.width = this.TIMELINE_WIDTH;
            
            this.objectInfoView.empty();
            this.timelineView.empty();
            this.timelineView.append('<div id="scrubberLine" style="left: 8px;"></div>');
            this.scrubberStartX = $("#timelineScrubber")[0].offsetLeft;
            this.scrubberPosX = $("#timelineScrubber")[0].offsetLeft;
            
            this.stageObjects = {};

            $("#timelineScrollContainer").scroll(this, function(e) {
                // Scroll the header to the left
                e.data.scrollLeft = $("#timelineScrollContainer").scrollLeft();
                $("#timelineHeaderScroller").scrollLeft(this.scrollLeft);
                // Scroll the info view on the left with the timeline
                $("#objectInfoView").scrollTop($("#timelineScrollContainer").scrollTop());
            });

            $(".keyframe").on("mousedown", this, function (e) {
                e.data.onKFMouseDown(e);
                e.data.selectedKeyframe = this; // set the selected keyframe to the current selected div
                
            });
            
            $("#timelineScrubber").on("mousedown", $.proxy(this.onMouseDown, this));
            $(window).on("mousemove", $.proxy(this.onMouseMove, this));
            $(window).on("mouseup", $.proxy(this.onMouseUp, this));
            
            

            $("#scrubberLine").css("left", (this.scrubberPosX + 8) + "px");
            
            $("#objectInfoView").on("DOMMouseScroll", function(event, delta) {
                // Handle Scroll Event on #objectInfoView on the left
                // Only the right area with the #timelineScrollContainer has a scroll container
                // But the left side has to be aligned to the right
                var delta = 0;
                if (!event) { /* IE. */
                    event = window.event;
                }
                if (event.wheelDelta) { /* IE/Opera. */
                    delta = event.wheelDelta/120;
                } else if (event.detail) { /* Mozilla */
                    delta = -event.detail/3;
                } else if (event.originalEvent && event.originalEvent.detail) { /* Mozilla */
                    delta = event.originalEvent.detail/3*2;
                }
                $("#timelineScrollContainer").scrollTop($("#timelineScrollContainer").scrollTop() + (delta * 30));
            });
            
            var tlHeader = $("#timelineHeader");
            tlHeader[0].style.width = this.TIMELINE_WIDTH;
            var val;
            for (var i = 1; i < this.TIMELINE_WIDTH / 16; i++) {
                val = "";
                if (i === 1 || (i % 5) === 0) {
                    val = "" + i;
                }
                tlHeader.append("<span>" + val + "</span>");
            }
        }