function(_args) {
        var _ = this._ = {};
        
        _.a  = 0; _.d  = 0; _.s  = Infinity; _.r  = 0;
        _.al = 0; _.dl = 1; _.sl = 0       ; _.rl = 0;
        _.delay = 0;
        _.status = -1;
        _.samples = Infinity;
        _.x0 = 0;
        _.dx = 0;
        _.currentTime = 0;
        _.reversed = false;
        
        var i = 0;
        if (typeof _args[i] === "string") {
            this.table = _args[i++];
        }
        if (_.table === undefined) this.table = "linear";
        
        var nums = [];
        while (typeof _args[i] === "number") {
            nums.push(_args[i++]);
        }
        
        switch (nums.length) {
        case 0: // T("adsr");
            break;
        case 1: // T("adsr", decay);
            _.d = nums[0];
            break;
        case 2: // T("adsr", attack, decay);
            _.a = nums[0]; _.d = nums[1];
            break;
        case 3: // T("adsr", attack, decay, release);
            _.a = nums[0]; _.d = nums[1]; _.r = nums[2];
            break;
        case 4: // T("adsr", attack, decay, sustain-level, release);
            _.a = nums[0]; _.d = nums[1]; _.sl = nums[2]; _.r = nums[3];
            break;
        case 5: // T("adsr", delay, attack, decay, sustain-level, release);
            _.delay = nums[0];
            _.a = nums[1]; _.d = nums[2]; _.sl = nums[3]; _.r = nums[4];
            break;
        case 6: // T("adsr", delay, attack, decay, sustain, release, sustain-level);
            _.delay = nums[0];
            _.a  = nums[1]; _.d  = nums[2]; _.s  = nums[3]; _.r   = nums[4];
            _.sl = nums[5];
            break;
        case 7: // T("adsr", delay, attack, decay, sustain, release, attack-release-level, sustain-level);
            _.delay = nums[0];
            _.a  = nums[1]; _.d  = nums[2]; _.s  = nums[3]; _.r  = nums[4];
            _.al = nums[5]; _.sl = nums[6]; _.rl = nums[5];
            break;
        case 8: // T("adsr", delay, attack, decay, sustain, release, attack-release-level, decay-level, sustain-level);
            _.delay = nums[0];
            _.a  = nums[1]; _.d  = nums[2]; _.s  = nums[3]; _.r  = nums[4];
            _.al = nums[5]; _.dl = nums[6]; _.sl = nums[7]; _.rl = nums[5];
            break;
        default: // T("adsr", delay, attack, decay, sustain, release, attack-level, decay-level, sustain-level, release-level);
            _.delay = nums[0];
            _.a  = nums[1]; _.d  = nums[2]; _.s  = nums[3]; _.r  = nums[4];
            _.al = nums[5]; _.dl = nums[6]; _.sl = nums[7]; _.rl = nums[8];
            break;
        }
        
        if (typeof _args[i] === "boolean") {
            _.reversed = _args[i++];
        }
        
        _.changeState = changeState;
    }