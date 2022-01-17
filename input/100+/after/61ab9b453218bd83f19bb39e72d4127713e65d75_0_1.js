function (namespaceName, getMemberName, inheritedMember) {
  var state = {
    alreadyWarned: false
  };

  var result;
  if (typeof (inheritedMember) === "function") {
    result = function ExternalMemberStub () {
      if (!state.alreadyWarned) {
        JSIL.Host.warning("The external method '" + getMemberName() + "' of type '" + namespaceName + "' has not been implemented; calling inherited method.");
        state.alreadyWarned = true;
      }

      return Function.prototype.apply.call(inheritedMember, this, arguments);
    };
  } else {
    result = function ExternalMemberStub () {
      JSIL.Host.error(new Error("The external method '" + getMemberName() + "' of type '" + namespaceName + "' has not been implemented."));
    };
  }

  result.__IsPlaceholder__ = true;

  return result;
}