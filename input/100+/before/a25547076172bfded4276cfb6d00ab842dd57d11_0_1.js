function(position, hasChanges, forceRefresh) {
            self.layout.updatePosition(position);

            var currentRow = self.layout.getCurrentRow();

            var numRowsOnScreen = self.layout.getNumRows();
            var numColumnsOnScreen = self.layout.getNumColumns();

            var startIndex = currentRow * numColumnsOnScreen;
            var relevantItems = self.lives().slice(startIndex, startIndex + (numRowsOnScreen + 2) * numColumnsOnScreen);

            if (hasChanges || relevantItems.length != self.viewables().length || currentRow != self.viewableRow) {
                self.viewableRow = currentRow;

                if (forceRefresh) {
                    self.viewables.removeAll();
                    for (var i = 0; i < relevantItems.length; i++) {
                        self.viewables.push(relevantItems[i]);
                    }
                }
                else {
                    var diff = relevantItems.length - self.viewables().length;
                    for (var i = 0; i < diff; i++) {
                        self.viewables.push(new LifeViewModel('', '', '', ''));
                    }

                    var left = [];
                    var free = [];
                    for (var i = 0; i < relevantItems.length; i++) {
                        free.push(true);
                    }

                    for (var i = 0; i < relevantItems.length; i++) {
                        var found = false;
                        for (var j = 0; j < self.viewables().length; j++) {
                            if (self.viewables()[j].id == relevantItems[i].id) {
                                if (self.viewables()[j].left != relevantItems[i].left ||
                                    self.viewables()[j].top != relevantItems[i].top) {
                                    self.viewables.replace(self.viewables()[i], relevantItems[i]);
                                }
                                free[j] = false;
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            left.push(relevantItems[i]);
                        }
                    }

                    for (var i = 0; i < left.length; i++) {
                        for (var j = 0; j < free.length; j++) {
                            if (free[j]) {
                                self.viewables.replace(self.viewables()[j], left[i]);
                                free[j] = false;
                                break;
                            }
                        }
                    }
                }
            }

            // Only save progress for show all page
            if (self.collection_id == null && self.search_term == "*") {
                self.saveProgress();
            }
        }