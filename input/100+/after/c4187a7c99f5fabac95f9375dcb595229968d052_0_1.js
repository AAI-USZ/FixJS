function (outputDiv) {
    this.outputDiv = outputDiv;
    this.last_requests = {};
    this.sessionContinue = true;
    // Set this object because we aren't loading the full IPython JavaScript library
    IPython.notification_widget = {"set_message": console.log};
    $.post = function (url, callback) {
        sagecell.sendRequest("POST", url, {}, function (data) {
            callback(JSON.parse(data));
        });
    }
    this.executed = false;
    this.opened = false;
    this.deferred_code = [];
    this.interacts = [];
    if (window.addEventListener) {
        // Prevent Esc key from closing WebSockets and XMLHttpRequests in Firefox
        window.addEventListener("keydown", function (event) {
            if (event.keyCode === 27) {
                event.preventDefault();
            }
        });
    }
    /* Always use sockjs, until we can get websockets working reliably.
     * Right now, if we have a very short computation (like 1+1), there is some sort of 
     * race condition where the iopub handler does not get established before 
     * the kernel is closed down.  This only manifests itself on a remote server, since presumably
     * if you are running on a local server, the connection is established too quickly.
     *
     * Also, there are some bugs in, for example, Firefox and other issues that we don't want to have
     * to work around, that sockjs already worked around.
     */
    /* 
    // When we restore the websocket, things are messed up if window.WebSocket was undefined and window.MozWebSocket was.
    var old_ws = window.WebSocket || window.MozWebSocket;
    if (!old_ws) {
        window.WebSocket = sagecell.MultiSockJS;
    }
    this.kernel = new IPython.Kernel(sagecell.URLs.kernel);
    window.WebSocket = old_ws;
    */
    var old_ws = window.WebSocket;
    window.WebSocket = sagecell.MultiSockJS;
    this.kernel = new IPython.Kernel(sagecell.URLs.kernel);
    window.WebSocket = old_ws;

    var that = this;
    this.kernel._kernel_started = function (json) {
        this.base_url = this.base_url.substr(sagecell.URLs.root.length);
        this._kernel_started = IPython.Kernel.prototype._kernel_started;
        this._kernel_started(json);
        this.shell_channel.onopen = function () {
            that.opened = true;
            while (that.deferred_code.length > 0) {
                that.execute(that.deferred_code.shift());
            }
        }
        this.iopub_channel.onopen = undefined;
    }
    this.kernel.start(IPython.utils.uuid());
    this.output_blocks = {};
    var ce = sagecell.util.createElement;
    this.outputDiv.find(".sagecell_output").prepend(
        this.session_container = ce("div", {"class": "sagecell_sessionContainer"}, [
        	ce("div", {"class": "sagecell_permalink"}, [ce("a", {}, [document.createTextNode("Permalink")])]),
            this.output_blocks[null] = ce("div", {"class": "sagecell_sessionOutput sagecell_active"}, [
                this.spinner = ce("img", {"src": sagecell.URLs.spinner,
                        "alt": "Loading", "class": "sagecell_spinner"})
            ]),
            ce("div", {"class": "sagecell_poweredBy"}, [
                document.createTextNode("Powered by "),
                ce("a", {"href": "http://www.sagemath.org"}, [
                    ce("img", {"src": sagecell.URLs.sage_logo, "alt": "Sage"})
                ])
            ]),
            this.session_files = ce("div", {"class": "sagecell_sessionFiles"})
        ]));
    $([IPython.events]).on("status_busy.Kernel", function (e, kernel_id) {
        if (kernel_id === that.kernel.kernel_id) {
            that.spinner.style.display = "";
        }
    });
    $([IPython.events]).on("status_idle.Kernel", function (e, kernel_id) {
        if (kernel_id === that.kernel.kernel_id) {
            that.spinner.style.display = "none";
        }
    });
    $([IPython.events]).on("status_dead.Kernel", function (e, kernel_id) {
        if (kernel_id === that.kernel.kernel_id) {
            for (var i = 0; i < that.interacts.length; i++) {
                that.interacts[i].disable();
            }
            $(that.output_blocks[null]).removeClass("sagecell_active");
        }
    });
    this.replace_output = {};
    this.lock_output = false;
    this.files = {};
    this.eventHandlers = {};
}