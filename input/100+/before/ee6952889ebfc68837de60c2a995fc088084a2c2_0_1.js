function (user, message, client) {
        var self = this;
        var cmd = message.command ? message.command.toLowerCase() : "";

        if (cmd !== "gitc") {
            return false;
        }

        if (typeof message.protocol == "undefined")
            message.protocol = "client";

        //remove gitc command and execute actual command
        var args = message.argv.slice(1);
        message.extra.args = args;
        
        if (args[0] === "gitcdiff") {
            if (args[1] === "writefile"){
                return this.gitcdiff_write_command(user, message, client);
            } else {
                return this.gitcdiff_command(user, message, client);
            }
            //return true;
        }

        // git encourages newlines in commit messages; see also #678
        // so if a \n is detected, treat them properly as newlines
        if (args[1] == "commit" && args[2] == "-m") {
            if (args[3].indexOf("\\n") > -1) {
                args[3] = args[3].replace(/\\n/g,"\n");
            }
        }

        var finalCmd = args[0];
        var finalArgs = args.slice(1);

        if (args[0] == "gitc_diff") {
            finalCmd = "./plugins-server/cloud9.ide.gitc/git_diff.sh"
        } else if (args[0] == "gitc_stage") {
            finalCmd = "./plugins-server/cloud9.ide.gitc/git_stage.sh"
        } else if (args[0] == "gitc_unstage") {
            finalCmd = "./plugins-server/cloud9.ide.gitc/gitc_unstage.sh"
        } else if (args[0] == "gitc_discard") {
            finalCmd = "./plugins-server/cloud9.ide.gitc/gitc_discard.sh"
        }

        this.pm.spawn("shell", {
            command: finalCmd,
            args: finalArgs,
            cwd: message.cwd,
            env: this.gitEnv,
            extra: message.extra
        }, this.channel, function(err, pid) {
            if (err)
                self.error(err, 1, message, client);
        });

        return true;
    }