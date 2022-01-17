function() {
    return  aws.createClient(this.config.secret, this.config.key, 'ec2.amazonaws.com');
}