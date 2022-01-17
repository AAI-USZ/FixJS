function(platform, commands) {
    if (typeof platform !== "string")
        throw new TypeError("'platform' argument must be either 'mac' or 'win'");

    this.platform = platform;
    this.commands = {};
    this.commmandKeyBinding = {};

    if (commands)
        commands.forEach(this.addCommand, this);
}