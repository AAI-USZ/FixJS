function() {
            var serialization = delegate.repetition1._iterationTemplate._ownerSerialization;
            expect(stripPP(serialization)).toBe('{"owner":{"prototype":"montage/ui/repetition.reel","properties":{"element":{"#":"list1"},"_isComponentExpanded":true,"ownerComponent":{"@":"__root__"}}},"__root__":{}}');
        }