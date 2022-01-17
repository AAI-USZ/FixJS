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
            alert('レスポンスが JSON 形式ではありません。');
        }
    }