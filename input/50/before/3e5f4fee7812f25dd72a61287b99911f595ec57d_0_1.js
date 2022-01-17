function() {
    return aws.load('ec2', this.config.key, this.config.secret);
}