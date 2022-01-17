function (opt_config) {

    opt_config = opt_config || {};

    // INSTANCE PROPERTY SETUP
    //
    // Your library likely has some instance-specific properties.  The value of
    // these properties can depend on any number of things, such as properties
    // passed in via opt_config or global state.  Whatever the case, the value
    // should be set in this constructor.

    // Instance variables that have an underscore prepended mean that should
    // not be modified outside of the library.  They can be freely modified by
    // library methods, however.  If an instance variable will likely be
    // accessed outside of the library, consider making a public getter
    // function for it.
    this._readOnlyVar = 'read only';

    // Instance variables that do not have an underscore prepended are
    // considered to be part of the library's public API.  External code may
    // change the value of these variables freely.
    this.readAndWrite = 'read and write';

    return this;
  }