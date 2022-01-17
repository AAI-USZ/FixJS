function() {
                    var containerElement, containerData;

                    containerElement = $(this);
                    containerData = containerElement.data('jqae');

                    // If container element dimensions have changed, or the container element is new, run ellipsis on
                    // that container element.
                    if ((containerData.containerWidth != containerElement.width()) ||
                            (containerData.containerHeight != containerElement.height())) {
                        ellipsisOnElement(containerElement, liveUpdatingTargetSelectors[targetSelector]);
                    }
                }