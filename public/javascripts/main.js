$(function () {
    console.log("Module configurator");
    var serverTimestamp = $("p.moduleTime span").data("unixtime");
    var localTime = new Date().getTime();

    // 10 min tolerance
    var largeTimeDifference = Math.abs(serverTimestamp - localTime) > (10 * 60 * 1);
    if (largeTimeDifference) {
        if (confirm("module time does not match your local time. Do you want to update module time? New time will be " + new Date())) {
            $.get("/syncTime", {"newTime": Math.ceil(new Date().getTime() / 1000)},
                function (response) {
                    alert(response);
                })
                .fail(function (data) {
                    alert("error: " + data.responseText);
                });
        } else {
            $(".moduleTime .status")
                .text("WARNING: Module time is not in sync with your device!!! Module time is: " + new Date(serverTimestamp))
                .addClass("warning");
        }
    }

    function bindEvents() {
        $("#closeSession").click(function () {
            if (confirm("Are you sure you want to close this session and restart the module?")) {
                $("body").empty().append("<h1>SESSION CLOSED. MODULE IS RESTARTING IN DEFAULT MODE...WAIT 5 min</h1>");
                $.get("/closeSession");
            }
        });
    }

    bindEvents();

    function getStatus(command, placeholderSelector) {
        $.get("/execute", {command: command},
            function (response) {
                $(placeholderSelector).append("<span class='ok'>" + response.stdout + "</span>");
                $(placeholderSelector).append("<span class='error'>" + JSON.stringify(response.error) + "</span>");
                $(placeholderSelector).append("<span class='error'>" + response.stderr + "</span>");
            })
            .fail(function (data) {
                alert("error: " + data.responseText);
            });
    }

    if ($("#hardwareStatus").length === 1) {
        console.log("hardware status");
        getStatus("battery-voltage", "#battery");
        getStatus("ls /dev/video0", "#camera");
        getStatus("df -h /media/storage/", "#storage");
    }
})
;