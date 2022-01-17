function() {
            // Remove Virtual MFA device
            if (item.mfaDevices[idx].id.indexOf('arn:aws') == 0) {
                me.core.api.deleteVirtualMFADevice(item.mfaDevices[idx].id);
            }
            item.mfaDevices = null;
            me.selectionChanged();
        }