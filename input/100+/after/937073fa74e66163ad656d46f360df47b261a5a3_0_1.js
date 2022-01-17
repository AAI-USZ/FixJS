function()
{
    var ret = "";
    //print(JSON.stringify(this.args));

    ret += this.tp$name;
    if (this.args)
        ret += ": " + this.args.v[0].v;

    if (this.args.v.length > 4)		//	RNL from length > 1
    {
        ret += "\nFile \"" + this.args.v[1].v + "\", " + "line " + this.args.v[2] + "\n" +
            this.args.v[4].v + "\n";
        for (var i = 0; i < this.args.v[3]; ++i) ret += " ";
        ret += "^\n";
    }
    return new Sk.builtin.str(ret);
}