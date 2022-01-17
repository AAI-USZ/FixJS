function () {
                    var screenWidth = widget._screenWidth.val();
                    widget._projectDevice.rotating = !widget._projectDevice.rotating;
                    $.rib.pmUtils.pInfoDirty = true;
                    widget._screenWidth.val(widget._screenHeight.val());
                    widget._screenHeight.val(screenWidth);
                    widget._setDevice();
                }