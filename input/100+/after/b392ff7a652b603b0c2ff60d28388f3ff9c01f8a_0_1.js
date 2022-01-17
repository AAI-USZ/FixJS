function() {
 // /////////////////////////
 
 // get local ref to global PhoneGap/Cordova/cordova object for exec function
 var cordovaRef = window.PhoneGap || window.Cordova || window.cordova; // old to new fallbacks
 
/**
 * Constructor
 */
 function AudioPlugin()
 {
 }
 
/**
 * show - true to show the ad, false to hide the ad
 */
 AudioPlugin.prototype.play = function(sound)
 {
    cordovaRef.exec("AudioPlugin.play", sound);
 }
 
/**
 * Install function
 */
 AudioPlugin.install = function()
 {
 if ( !window.plugins ) {
 window.plugins = {};
 } 
 if ( !window.plugins.AudioPlugin ) {
 window.plugins.AudioPlugin = new AudioPlugin();
 }
 }

/**
 * Add to Cordova constructor
 */
 if (cordovaRef && cordovaRef.addConstructor) {
    cordovaRef.addConstructor(AudioPlugin.install);
 } else {
 console.log("AudioPlugin could not be installed.");
 return null;
 }
 
 
 // /////////////////////////
 }