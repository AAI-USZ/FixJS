function (hook_name, args, cb)
{
	args.content = args.content + require('ep_etherpad-lite/node/eejs/').require("ep_syntaxhighlighting/templates/syntaxHighlightingStyles.ejs");
}