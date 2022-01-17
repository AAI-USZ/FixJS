function (hook_name, args, cb) {
	args.content = require('ep_etherpad-lite/node/eejs/').require("ep_syntaxhighlighting/templates/syntaxHighlightingEditbarButtons.ejs") + args.content;
}