function() {
            var newMappedNodes = mapping(valueToMap, index) || [];

            // On subsequent evaluations, just replace the previously-inserted DOM nodes
            if (mappedNodes.length > 0) {
                fixUpNodesToBeRemoved(mappedNodes);
                ko.utils.replaceDomNodes(mappedNodes, newMappedNodes);
                if (callbackAfterAddingNodes)
                    callbackAfterAddingNodes(valueToMap, newMappedNodes);
            }

            // Replace the contents of the mappedNodes array, thereby updating the record
            // of which nodes would be deleted if valueToMap was itself later removed
            mappedNodes.splice(0, mappedNodes.length);
            ko.utils.arrayPushAll(mappedNodes, newMappedNodes);
        }, null, { 'disposeWhenNodeIsRemoved': containerNode, 'disposeWhen': function() { return (mappedNodes.length == 0) || !ko.utils.domNodeIsAttachedToDocument(mappedNodes[0]) } }