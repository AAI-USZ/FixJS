function showUI(aForce) {
        let domWindow = this.dock.getCurrentTabWindow();

        let cache = !aForce && ResultStore.getEntry(domWindow.location.href) || null;

        // Disable controls and change frame url
        this.disableControls();
        this.iframe.setAttribute("src", "about:blank");

        if (aForce || cache) {
            // Display test results (with ou without running them)
            let load_msg = cache && _("oqs.loading_cache") || _("oqs.loading_tests");
            let ui = this.resultsUI.bind(this, cache);

            let loadResults = function(evt) {
                try {
                    this.iframe.removeEventListener("DOMContentLoaded", loadResults, true);
                    let doc = evt.target;
                    let {_H, _T} = domTools(doc);
                    let e = _H("p", {"id": "loader"})
                    e.appendChild(_T(load_msg));
                    doc.body.appendChild(e);

                    // A little timer to avoid immediate blocking
                    setTimeout(ui, 100);
                } catch(e) { console.exception(e); }
            }.bind(this);

            this.iframe.addEventListener("DOMContentLoaded", loadResults, true);
        } else {
            // No cache, not forcing tests, show landing page
            let loadMain = function(evt) {
                try {
                    this.iframe.removeEventListener("DOMContentLoaded", loadMain, false);
                    let doc = evt.target;
                    let {_H, _T} = domTools(doc);

                    let e = _H("p", {"id": "noresults"});
                    e.appendChild(_T(_("oqs.no_result_yet")));
                    e.appendChild(_H("br"));

                    let b = _H("button", {"class": "launch"});
                    b.appendChild(_H("span"));
                    b.appendChild(_T(_("oqs.launch")));
                    b.addEventListener("click", this.tbLaunch.bind(this), false);

                    e.appendChild(b);

                    doc.body.appendChild(e);
                } catch(e) { console.exception(e); }
            }.bind(this);

            this.iframe.addEventListener("DOMContentLoaded", loadMain, false);
        }

        this.iframe.setAttribute("src", self.data.url("ui/blank.html"));
    }