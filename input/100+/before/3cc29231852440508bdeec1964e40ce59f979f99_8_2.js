function(event, isChanging) {
            if(!event.detail || !event.detail.data) {
                return;
            }
            var els = event.detail.data.els;
            if(els && this._shouldUpdatePlanes(event.detail.data.prop)) {
                var len = els.length,
                    stage = this.application.ninja.stage,
                    minLeft = stage.userPaddingLeft,
                    minTop = stage.userPaddingTop,
                    docLeft = stage.userContentLeft,
                    docTop = stage.userContentTop,
                    l,
                    t,
                    plane,
                    changed = false,
                    elt,
                    adjustStagePadding = !isChanging || (event.detail.data.prop !== "matrix");
                for(var i=0; i < len; i++) {
                    elt = els[i];
                    plane = elt.elementModel.props3D.elementPlane;
                    if(plane) {
                        plane.init();
                        if(adjustStagePadding) {
                            l = plane._rect.m_left - docLeft;
                            t = plane._rect.m_top - docTop;
                            if(l < minLeft) {
                                minLeft = l;
                                stage.minLeftElement = elt;
                            } else if((elt === stage.minLeftElement) && (l > minLeft)) {
                                this._recalculateScrollOffsets = true;
                            }

                            if(t < minTop) {
                                minTop = t;
                                stage.minTopElement = elt;
                            } else if((elt === stage.minTopElement) && (t > minTop)) {
                                this._recalculateScrollOffsets = true;
                            }
                        }
                    }
                }

                if(adjustStagePadding) {
                    if(this._recalculateScrollOffsets && !isChanging) {
                        this.initializeFromDocument(true, true);
                        changed = true;
                    } else {
                        if(minLeft !== stage.userPaddingLeft) {
                            stage.userPaddingLeft = minLeft;
                            changed = true;
                        }
                        if(minTop !== stage.userPaddingTop) {
                            stage.userPaddingTop = minTop;
                            changed = true;
                        }
                    }
                }

                if(!changed) {
                    this.drawWorkingPlane();
                    this.draw3DCompass();
                }

                // TODO - Remove this once all stage drawing is consolidated into a single draw cycle
                if(!isChanging && this.application.ninja.toolsData.selectedToolInstance.captureSelectionDrawn) {
                    this.application.ninja.toolsData.selectedToolInstance.captureSelectionDrawn(null);
                }
            }
        }