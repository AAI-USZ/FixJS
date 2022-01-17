function(event) {
        if(this.scheduledUpdate) {
            // Postpone the cursor move until the update propagates
            this.postponedCursorMove = event;
            return;
        }
        var pos = event.data;
        var _self = this;
        var hintMessage = ""; // this.checkForMarker(pos) || "";
        // Not going to parse for this, only if already parsed successfully
        var aggregateActions = {markers: [], hint: null, displayPos: null, enableRefactorings: []};
        
        function cursorMoved() {
            asyncForEach(_self.handlers, function(handler, next) {
                if (handler.handlesLanguage(_self.$language)) {
                    handler.onCursorMovedNode(_self.doc, ast, pos, currentNode, function(response) {
                        if (!response)
                            return next();
                        if (response.markers && response.markers.length > 0) {
                            aggregateActions.markers = aggregateActions.markers.concat(response.markers);
                        }
                        if (response.enableRefactorings && response.enableRefactorings.length > 0) {
                            aggregateActions.enableRefactorings = aggregateActions.enableRefactorings.concat(response.enableRefactorings);
                        }
                        if (response.hint) {
                            if (aggregateActions.hint)
                                aggregateActions.hint += "\n" + response.hint;
                            else
                                aggregateActions.hint = response.hint;
                        }
                        if (response.displayPos) {
                            aggregateActions.displayPos = response.displayPos;
                        }
                        next();
                    });
                }
                else
                    next();
            }, function() {
                if (aggregateActions.hint && !hintMessage) {
                    hintMessage = aggregateActions.hint;
                }
                _self.scheduleEmit("markers", _self.filterMarkersBasedOnLevel(_self.currentMarkers.concat(aggregateActions.markers)));
                _self.scheduleEmit("enableRefactorings", aggregateActions.enableRefactorings);
                _self.lastCurrentNode = currentNode;
                _self.setLastAggregateActions(aggregateActions);
                _self.scheduleEmit("hint", {
                    pos: pos,
                    displayPos: aggregateActions.displayPos,
                    message: hintMessage
                });
            });

        }
        
        if (this.cachedAst) {
            var ast = this.cachedAst;
            var currentNode = ast.findNode({line: pos.row, col: pos.column});
            if (currentNode !== this.lastCurrentNode || pos.force) {
                cursorMoved();
            }
        } else {
            cursorMoved();
        }
    }