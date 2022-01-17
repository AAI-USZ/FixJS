function(event) {
                $this.url.obj.set('fragment', '/'+_viewPortItem.get('id')).go();
                var setScroller = $this.scrollToElement(_viewPortItem);
            }