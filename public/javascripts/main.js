$(function () {
    console.log("Module configurator");
    var serverTimestamp = $("p.moduleTime span").data("unixtime");
    var localTime = new Date().getTime();

    // 10 min tolerance
    var largeTimeDifference = Math.abs(serverTimestamp - localTime) > (10 * 60 * 1);
    if (true) {
        if (confirm("module time does not match your local time. Do you want to update module time? New time will be " + new Date())) {
            $.get("/syncTime", {"newTime": new Date().getTime() / 1000},
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
})
;