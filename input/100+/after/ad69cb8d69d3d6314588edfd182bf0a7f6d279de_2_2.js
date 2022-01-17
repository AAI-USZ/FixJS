function LoadBalancer(name, CreatedTime, DNSName, HostName, ZoneId, Instances, Listeners, HealthCheck, availabilityZones, appPolicies, lbPolicies, oPolicies, vpcId, subnets, srcGroup, groups)
{
    this.name = name;
    this.CreatedTime = CreatedTime;
    this.DNSName = DNSName;
    this.CanonicalHostedHostName = HostName;
    this.CanonicalHostedZoneId = ZoneId;
    this.Instances = Instances;
    this.Listeners = Listeners;
    this.HealthCheck = HealthCheck;
    this.zones = availabilityZones;
    this.appStickinessPolicies = appPolicies;
    this.lbStickinessPolicies = lbPolicies;
    this.otherPolicies = oPolicies;
    this.vpcId = vpcId
    this.SourceSecurityGroup = srcGroup;
    this.subnets = subnets
    this.securityGroups = groups

    this.toString = function() {
        return this.name;
    }
}