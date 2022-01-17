function() {
    resetGlobals();
    var test = 'dummytest.html';
    var builderName = 'dummyBuilder';
    BUILDER_TO_MASTER[builderName] = WEBKIT_BUILDER_MASTER;
    g_testToResultsMap[test] = [createResultsObjectForTest(test, builderName)];

    equal(htmlForIndividualTestOnAllBuildersWithResultsLinks(test),
        '<table class=test-table><thead><tr>' +
                '<th sortValue=test><div class=table-header-content><span></span><span class=header-text>test</span></div></th>' +
                '<th sortValue=bugs><div class=table-header-content><span></span><span class=header-text>bugs</span></div></th>' +
                '<th sortValue=modifiers><div class=table-header-content><span></span><span class=header-text>modifiers</span></div></th>' +
                '<th sortValue=expectations><div class=table-header-content><span></span><span class=header-text>expectations</span></div></th>' +
                '<th sortValue=slowest><div class=table-header-content><span></span><span class=header-text>slowest run</span></div></th>' +
                '<th sortValue=flakiness colspan=10000><div class=table-header-content><span></span><span class=header-text>flakiness (numbers are runtimes in seconds)</span></div></th>' +
            '</tr></thead>' +
            '<tbody></tbody>' +
        '</table>' +
        '<div>The following builders either don\'t run this test (e.g. it\'s skipped) or all runs passed:</div>' +
        '<div class=skipped-builder-list>' +
            '<div class=skipped-builder>Webkit Linux</div>' +
            '<div class=skipped-builder>Webkit Linux (dbg)</div>' +
            '<div class=skipped-builder>Webkit Mac10.5</div>' +
            '<div class=skipped-builder>Webkit Win</div>' +
        '</div>' +
        '<div class=expectations test=dummytest.html>' +
            '<div><span class=link onclick="setQueryParameter(\'showExpectations\', true)">Show results</span> | ' +
            '<span class=link onclick="setQueryParameter(\'showLargeExpectations\', true)">Show large thumbnails</span>' +
            '<form onsubmit="setQueryParameter(\'revision\', revision.value);return false;">' +
                'Show results for WebKit revision: <input name=revision placeholder="e.g. 65540" value="" id=revision-input>' +
            '</form></div>' +
        '</div>');
}