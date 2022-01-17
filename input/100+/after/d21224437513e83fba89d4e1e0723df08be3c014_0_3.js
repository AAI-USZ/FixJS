function(e) {
            // Get a reference to our drag and drop nodes
            var drag = e.drag.get('node');
            var drop = e.drop.get('node');

            // We need to fix the case when parent drop over event has determined
            // 'goingup' and appended the drag node after admin-block.
            if (drop.hasClass(this.parentnodeclass) && drop.one('.'+CSS.BLOCKADMINBLOCK) && drop.one('.'+CSS.BLOCKADMINBLOCK).next('.'+CSS.BLOCK)) {
                drop.prepend(drag);
            }

            // Block is moved within the same region
            // stop here, no need to modify anything.
            if (this.dragsourceregion.contains(drop)) {
                return false;
            }

            // TODO: Hiding-displaying block region only works for base theme blocks
            // (region-pre, region-post) at the moment. It should be improved
            // to work with custom block regions as well.

            // TODO: Fix this for the case when user drag block towards empty section,
            // then the section appears, then user chnages his mind and moving back to
            // original section. The opposite section remains opened and empty.

            var documentbody = Y.one('body');
            // Moving block towards hidden region-content, display it
            var regionname = this.get_region_id(this.dragsourceregion);
            if (documentbody.hasClass('side-'+regionname+'-only')) {
                documentbody.removeClass('side-'+regionname+'-only');
            }

            // Moving from empty region-content towards the opposite one,
            // hide empty one (only for region-pre, region-post areas at the moment).
            regionname = this.get_region_id(drop.ancestor('div.'+CSS.BLOCKREGION));
            if (this.dragsourceregion.all('.'+CSS.BLOCK).size() == 0 && this.dragsourceregion.get('id').match(/(region-pre|region-post)/i)) {
                if (!documentbody.hasClass('side-'+regionname+'-only')) {
                    documentbody.addClass('side-'+regionname+'-only');
                }
            }
        }