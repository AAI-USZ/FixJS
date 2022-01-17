function CapabilitiesClass(runtime, scope, instance, baseClass) {
    function Capabilities() {}
    var c = new runtime.domain.system.Class("Capabilities", Capabilities, C(Capabilities));
    c.extend(baseClass);
    c.nativeStatics = {
      "get playerType": function () { return "AVMPlus"; }
    };
    return c;
  }