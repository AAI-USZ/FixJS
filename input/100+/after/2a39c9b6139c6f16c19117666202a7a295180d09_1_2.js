function(evt) {
                if (self.opts.fixed) return;
                var fullSize,globalOffset,elmOffset;
                if (!moving) return;
                var splitterSize = self.getSplitter().fullSize();

                if (self._vertical) {
                    fullSize= self.elm().width()-splitterSize.width;
                    globalOffset = evt.pageX-Math.ceil(splitterSize.width/2);
                    elmOffset = self.elm().offset().left;
                } else {
                    fullSize= self.elm().height()-splitterSize.height;
                    globalOffset = evt.pageY-Math.ceil(splitterSize.height/2);
                    elmOffset = self.elm().offset().top;

                }
                var offset = (globalOffset-elmOffset)/fullSize;

                self.setSplitPosition(offset);
                self._children[0]._layout();
                self._children[1]._layout();
            }