function () {
                    widget._projectDevice.rotating = !widget._projectDevice.rotating;
                    widget._projectDevice.screenWidth = widget._screenHeight.val();
                    widget._projectDevice.screenHeight = widget._screenWidth.val();
                    $.rib.pmUtils.pInfoDirty = true;
                    widget._screenWidth.val(widget._projectDevice.screenWidth);
                    widget._screenHeight.val(widget._projectDevice.screenHeight);
                    widget._setDevice();
                }