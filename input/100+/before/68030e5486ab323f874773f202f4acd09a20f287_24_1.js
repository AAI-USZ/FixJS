function (require, exports, module) {
    'use strict';
    
    var DocumentManager = require("document/DocumentManager"),
        ProjectManager  = require("project/ProjectManager");
    
    /**
     * Tracks "change" events on opened Documents. Used to monitor changes
     * to documents in-memory and update caches. Assumes all documents have
     * changed when the Brackets window loses and regains focus. Does not
     * read timestamps of files on disk. Clients may optionally track file
     * timestamps on disk independently.
     */
    function ChangedDocumentTracker() {
        var self = this;
        
        this._changedPaths = {};
        this._windowFocus = true;
        this._addListener = this._addListener.bind(this);
        this._onChange = this._onChange.bind(this);
        this._onWindowFocus = this._onWindowFocus.bind(this);
        
        $(DocumentManager).on("workingSetAdd", function (event, fileEntry) {
            // Only track documents in the current project
            if (ProjectManager.isWithinProject(fileEntry.fullPath)) {
                DocumentManager.getDocumentForPath(fileEntry.fullPath).done(function (doc) {
                    self._addListener(doc);
                });
            }
        });
        
        $(DocumentManager).on("workingSetRemove", function (event, fileEntry) {
            // Only track documents in the current project
            if (ProjectManager.isWithinProject(fileEntry.fullPath)) {
                DocumentManager.getDocumentForPath(fileEntry.fullPath).done(function (doc) {
                    $(doc).off("change", self._onChange);
                    doc.releaseRef();
                });
            }
        });
        
        // DocumentManager has already initialized the working set
        DocumentManager.getWorkingSet().forEach(function (fileEntry) {
            // Can't use getOpenDocumentForPath() here since being in the working set
            // does not guarantee that the file is opened (e.g. at startup)
            DocumentManager.getDocumentForPath(fileEntry.fullPath).done(function (doc) {
                self._addListener(doc);
            });
        });
        
        $(window).focus(this._onWindowFocus);
    }
    
    /**
     * @private
     * Assumes all files are changed when the window loses and regains focus.
     */
    ChangedDocumentTracker.prototype._addListener = function (doc) {
        $(doc).on("change", this._onChange);
        doc.addRef();
    };
    
    /**
     * @private
     * Assumes all files are changed when the window loses and regains focus.
     */
    ChangedDocumentTracker.prototype._onWindowFocus = function (event, doc) {
        this._windowFocus = true;
    };
    
    /**
     * @private
     * Tracks changed documents.
     */
    ChangedDocumentTracker.prototype._onChange = function (event, doc) {
        // if it was already changed, and the client hasn't reset the tracker,
        // then leave it changed.
        this._changedPaths[doc.file.fullPath] = true;
    };
    
    /**
     * Empty the set of dirty paths. Begin tracking new dirty documents. 
     */
    ChangedDocumentTracker.prototype.reset = function () {
        this._changedPaths = {};
        this._windowFocus = false;
    };
    
    /**
     * Check if a file path is dirty.
     * @param {!string} file path
     * @return {!boolean} Returns true if the file was dirtied since the last reset.
     */
    ChangedDocumentTracker.prototype.isPathChanged = function (path) {
        return this._windowFocus || this._changedPaths[path];
    };
    
    /**
     * Get the set of changed paths since the last reset.
     * @return {Array.<string>} Changed file paths
     */
    ChangedDocumentTracker.prototype.getChangedPaths = function () {
        return $.makeArray(this._changedPaths);
    };

    module.exports = ChangedDocumentTracker;
}