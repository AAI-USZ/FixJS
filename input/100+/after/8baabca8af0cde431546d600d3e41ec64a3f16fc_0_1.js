function(data) {
                    console.log(data);
                // TODO: invent events triggered by changing attributes
                    console.log(data.pics)
                    $('#page').data('loaded', slug)
                              .data('date', data.from)
                              .data('next', data.next)
                              .data('prev', data.prev);
                    currentPage.pics = data.pics;
                    currentPage.timeline = data.timeline;
                    render(data);
                    if (typeof(leaf) != 'undefined') {
                        if (leaf == 'last') loadLeaf($('#page .subpage').length);
                        else loadLeaf(leaf, undefined, true);
                    }
                    $('#page-inner,#footer').anim({opacity:1},.6,'ease-in');
                }