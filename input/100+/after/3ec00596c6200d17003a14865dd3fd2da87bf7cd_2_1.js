function fixUpVirtualElements(contiguousNodeArray) {
        // Re-written templates insert comments into the node list during memoization and then remove them during un-memoization.
        // If the first node in the list is one of those comments, we need to remove it from the list and get the actual first node.
        // See https://github.com/SteveSanderson/knockout/pull/440
        while (contiguousNodeArray.length && !ko.utils.domNodeIsAttachedToDocument(contiguousNodeArray[0]))
            contiguousNodeArray.splice(0, 1);

        // Ensures that contiguousNodeArray really *is* an array of contiguous siblings, even if some of the interior
        // ones have changed since your array was first built (e.g., because your array contains virtual elements, and
        // their virtual children changed when binding was applied to them).
        // This is needed so that we can reliably remove or update the nodes corresponding to a given array item

        if (contiguousNodeArray.length > 1) {
            // Build up the actual new contiguous node set
            var current = contiguousNodeArray[0], last = contiguousNodeArray[contiguousNodeArray.length - 1], newContiguousSet = [current];
            while (current !== last) {
                current = current.nextSibling;
                if (!current) // Won't happen, except if the developer has manually removed some DOM elements (then we're in an undefined scenario)
                    return;
                newContiguousSet.push(current);
            }

            // ... then mutate the input array to match this.
            // (The following line replaces the contents of contiguousNodeArray with newContiguousSet)
            Array.prototype.splice.apply(contiguousNodeArray, [0, contiguousNodeArray.length].concat(newContiguousSet));
        }
    }