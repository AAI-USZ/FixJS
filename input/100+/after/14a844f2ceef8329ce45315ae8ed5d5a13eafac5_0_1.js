function() {

var user;

function githubUser () {
    if (!user) {
        var box = document.getElementById("user");
        user = box.getElementsByClassName("name")[0].innerHTML;
    }
    return user;
}

var SHORTCUTS = {
        "h": "/",
        "n": "/inbox/notifications",
        "y": "/dashboard/yours",
        "p": "/dashboard/pulls",
        "r": function() {
            if (!githubUser()) return;
            var input = document.createElement("input");
            input.style.cssText = "display: block; position: absolute; top: 0; left: 0";
            input.addEventListener("keyup", function(e) {
                if (e.keyCode == 13) {  // 13 = Enter
                    if (-1 != this.value.indexOf("/")) {
                        if (-1 != this.value.search(/^\//)) {
                            window.location.href = this.value;
                        } else {
                            window.location.href = "/" + this.value;
                        }
                    } else {
                        var path = "/" + githubUser() + "/" + this.value;
                        window.location.href = path;
                    }
                } else if (e.keyCode == 27) {  // 27 = Escape
                    this.blur();
                    document.body.removeChild(this);
                }
            }, true);
            document.body.appendChild(input);
            input.focus();
        },
        "?": function() {
            var help = document.createElement("div");
        }
    },
    ACTIVE = false;

document.addEventListener("keyup", function(e) {
    var tag = e.target.tagName && e.target.tagName.toLowerCase();
    if (tag == "input" || tag == "textarea") { return; }

    var key = String.fromCharCode(e.keyCode).toLowerCase();

    if (key == "g") {
        ACTIVE = true;
    } else if (ACTIVE) {
        ACTIVE = false;
        if (typeof SHORTCUTS[key] == "string") {
            var dest = SHORTCUTS[key];
            window.location.href = dest;
            return false;
        } else if (typeof SHORTCUTS[key] == "function") {
            SHORTCUTS[key]();
            return false;
        }
    }
}, true);

// Add to the global shortcuts.
var shortcutsPane = document.getElementById("keyboard_shortcuts_pane"),
    firstCol = shortcutsPane.getElementsByClassName("first")[0];
firstCol.innerHTML += "<dl class='keyboard-mappings'><dt>gh</dt><dd>Go to the home page</dd></dl>" +
                      "<dl class='keyboard-mappings'><dt>gn</dt><dd>Go to your notifications</dd></dl>" +
                      "<dl class='keyboard-mappings'><dt>gy</dt><dd>Go to your actions</dd></dl>" +
                      "<dl class='keyboard-mappings'><dt>gp</dt><dd>Go to your pull requests</dd></dl>" +
                      "<dl class='keyboard-mappings'><dt>gr</dt><dd>Bring up the quick repo switch</dd></dl>";
}