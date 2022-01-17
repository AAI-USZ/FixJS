function(event, widget) {
            var newIndex = event&&event.page && event.page.getZoneIndex(),
                oldIndex = event&&event.oldPage && event.oldPage.getZoneIndex();

            widget = widget || this;

            // FIXME: This should just toggle 'ui-selected' class, not
            //        cause a complete re-creation of the page list
            //widget.refresh(event,widget);
            widget.element.find('.ui-selected').removeClass('ui-selected');
            widget.element.find('#pages').children().eq(newIndex)
                .addClass('ui-selected');
            widget._scrollPage(newIndex);
        }