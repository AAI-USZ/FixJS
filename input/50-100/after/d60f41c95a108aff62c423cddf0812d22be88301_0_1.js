function (xhr) {
        try {
            var json = $.parseJSON(xhr.responseText);
            var errorMessage = json.reason;

            if (json.additional) {
                for (var s in json.additional)
                    errorMessage += "\n" + s + ": " + json.additional[s];
            }

            alert(errorMessage);
        } catch (e) {
            // We don't want to show an error dialog if readyState != 4.
            // In some case, we might abort XHR connection on moving to another page.
            if (e.readyState == 4) // == completed
                alert('レスポンスが JSON 形式ではありません。');
        }
    }