function() {
            jqUnit.assertEquals("Exact depth", 0, gpii.matchMaker.prefixLength("display.screenEnhancement.fontSize", sammyProfile));
            jqUnit.assertEquals("Near depth", 0, gpii.matchMaker.prefixLength("display.screenEnhancement.fontSize", sammyProfile));
            jqUnit.assertEquals("Mid depth", -1, gpii.matchMaker.prefixLength("display.unrecognizable", sammyProfile));
            jqUnit.assertEquals("Far depth", -2, gpii.matchMaker.prefixLength("display.unrecognizable.thing", sammyProfile));
            var skeleton = gpii.matchMaker.pathsToSkeleton(magnifierLeaves);
            jqUnit.assertDeepEq("Computed model skeleton", magnifierSkeleton, skeleton);
        }