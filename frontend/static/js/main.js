/*
* Update timeout as 20 sec
*/

var lastStatus;
var status;
var lastLevel;
var level;
function rotateFunc() {
    const sunMoonContainer = document.querySelector('.sun-moon-container');
    document.body.classList.toggle('dark');
    const currentRotation = parseInt(getComputedStyle(sunMoonContainer).getPropertyValue('--rotation'));
    sunMoonContainer.style.setProperty('--rotation', currentRotation + 180);
}

function onload() {

    $.ajax({
        type: 'GET',
        url: "https://espprojecteo.herokuapp.com/api/esp/list",
        //url: "http://127.0.0.1:8000/api/esp/list",
        success: function (response) {
            debugger;
            if (response[0].start == 0) {
                rotateFunc();
            }
            lastStatus = response[0].start;
            status = response[0].start;
            lastLevel = response[0].level;
            level = response[0].level;
            var buttonS = "<button id='StartButton' class='theme-toggle-button' onclick='startFunction()'> <svg class='icon' style='width:24px;height:24px' viewBox='0 0 24 24'><path fill='currentColor' d='M7.5,2C5.71,3.15 4.5,5.18 4.5,7.5C4.5,9.82 5.71,11.85 7.53,13C4.46,13 2,10.54 2,7.5A5.5,5.5 0 0,1 7.5,2M19.07,3.5L20.5,4.93L4.93,20.5L3.5,19.07L19.07,3.5M12.89,5.93L11.41,5L9.97,6L10.39,4.3L9,3.24L10.75,3.12L11.33,1.47L12,3.1L13.73,3.13L12.38,4.26L12.89,5.93M9.59,9.54L8.43,8.81L7.31,9.59L7.65,8.27L6.56,7.44L7.92,7.35L8.37,6.06L8.88,7.33L10.24,7.36L9.19,8.23L9.59,9.54M19,13.5A5.5,5.5 0 0,1 13.5,19C12.28,19 11.15,18.6 10.24,17.93L17.93,10.24C18.6,11.15 19,12.28 19,13.5M14.6,20.08L17.37,18.93L17.13,22.28L14.6,20.08M18.93,17.38L20.08,14.61L22.28,17.15L18.93,17.38M20.08,12.42L18.94,9.64L22.28,9.88L20.08,12.42M9.63,18.93L12.4,20.08L9.87,22.27L9.63,18.93Z' /></svg>Start/Stop</button><br>"
            var buttonU = "<button id='UpButton' class='button' style='margin-bottom:1rem; height:50px; width:60px;' onclick='levelUpFunction()'>+</button><br>"
            var buttonD = "<button id='DownButton' class='button' style='margin-bottom:1rem; height:50px; width:60px;' onclick='levelDownFunction()'>-</button><br>"
            var buttonF = "<button id='FocusButton' class='btn btn-danger' style='margin-bottom:1rem; height:50px; width:60px;' onclick='focusFunction()'>Focus</button><br>"
            var buttonE = "<button id='ExamButton' class='btn btn-secondary' style='margin-bottom:1rem; height:50px; width:60px;' onclick='examFunction()'>Exam</button><br>"

            $("#example").append(buttonS);
            $("#getButtonUp").append(buttonU);
            $("#getButtonDown").append(buttonD);
            $("#getButtonFocus").append(buttonF);
            $("#getButtonExam").append(buttonE);

        },
        error: function (response) {
            //alert("NO DATA");
        }
    });

}
let counter = 0;
let oldIsconnected = "0";
let colorCounter = 0;
let alarmCounter = 0;
$(document).ready(function () {

    setInterval(function () {
        $.ajax({
            type: 'GET',
            url: "https://espprojecteo.herokuapp.com/api/esp/list",
            //url: "http://127.0.0.1:8000/api/esp/list",
            success: function (response) {
                
                let battery = "";
                let tempString = response[0].temperature;
                let resultString = getTemperature(tempString);
                let batteryString = response[0].battery;
                let batteryNumber = parseInt(batteryString);
                $("#total").empty();
                $("#display").empty();
                $("#battery").empty();
                if (batteryNumber < 20) {
                    battery = "<div title='Charge:" + batteryString + " Please Charge !'> <div class='batteryCss' title=Charge:" + batteryString + "%><div class='batteryCss-light' style='height:100%" + batteryString + "%;'></div></div></div>";
                }
                else {
                    battery = "<div class='batteryCss' title=Charge:" + batteryString + "%><div class='batteryCss-level' style='height:" + batteryString + "%;'></div></div>";
                }

                if (response[0].temperature == "0") {
                    var temp = "<h5 style='margin-left: -46px; margin-bottom:8px;'><img src='media/termo4.png' style='width:30px;height:50px;margin-left: 47px;' > --.- °C</h5>";
                    battery = "<div class='batteryCss' title=Charge:" + batteryString + "%><div class='batteryCss-light' style='height:" + batteryString + "%;'></div></div>";
                }
                else {
                    var temp = "<h5 style='margin-left: -46px; margin-bottom:8px;'><img src='media/termo4.png' style='width:30px;height:50px;margin-left: 47px;' > " + resultString + " °C</h5>";
                }
                if (response[0].isConnected != oldIsconnected) {
                    document.getElementById("StartButton").disabled = false;
                    document.getElementById("UpButton").disabled = false;
                    document.getElementById("DownButton").disabled = false;
                    document.getElementById("FocusButton").disabled = false;
                    document.getElementById("ExamButton").disabled = false;
                    document.getElementById("warning").style.visibility = "collapse";
                    counter = 0;
                    if (response[0].start == 1) {
                        document.body.style.backgroundColor = "#fff";
                    }
                    else {
                        document.body.style.backgroundColor = "#333";
                    }
                }
                else {
                    counter++;
                    if (counter > 19) {
                        document.getElementById("StartButton").disabled = true;
                        document.getElementById("UpButton").disabled = true;
                        document.getElementById("DownButton").disabled = true;
                        document.getElementById("FocusButton").disabled = true;
                        document.getElementById("ExamButton").disabled = true;
                        document.body.style.backgroundColor = "#f65151";
                        document.getElementById("warning").style.visibility = "visible";
                        document.getElementById("warning").innerText = "Disconnected!";
                        temp = "<h5 style='margin-left: -46px; margin-bottom:8px;'><img src='media/termo4.png' style='width:30px;height:50px;margin-left: 47px;' > --.- °C</h5>";
                        //battery = "<a data-toggle='popover' title='Charge:"+batteryString+" Please Charge !'> <div class='batteryCss' title=Charge:" + batteryString + "%><div class='batteryCss-light' style='height:100%" + batteryString + "%;'></div></div></a>";
                        battery = "<a data-toggle='popover' title='Charge:" + batteryString + " Please Charge !'> <div class='batteryCss' title=Charge:" + batteryString + "%><div class='batteryCss-disc' style='height:100%" + batteryString + "%;'></div></div></a>";

                        if (alarmCounter == 0) {
                            snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
                            snd.play();
                            
                        }
                        alarmCounter++;

                    }
                    else {
                        alarmCounter = 0;
                        document.getElementById("StartButton").disabled = false;
                        document.getElementById("UpButton").disabled = false;
                        document.getElementById("DownButton").disabled = false;
                        document.getElementById("FocusButton").disabled = false;
                        document.getElementById("ExamButton").disabled = false;
                        document.getElementById("warning").style.display = "collapse";
                        if (response[0].start == 1) {
                            document.body.style.backgroundColor = "#fff";
                        }
                        else {
                            document.body.style.backgroundColor = "#333";
                        }
                    }
                }
                oldIsconnected = response[0].isConnected;

                $("#display").append(temp);
                $("#battery").append(battery);

                status = response[0].start;
                if (status != lastStatus) {
                    rotateFunc();
                }
                lastStatus = status;

                level = response[0].level;
                var bar1 = document.getElementsByClassName('bar1');
                var bar2 = document.getElementsByClassName('bar2');
                var bar3 = document.getElementsByClassName('bar3');
                var bar4 = document.getElementsByClassName('bar4');
                var bar5 = document.getElementsByClassName('bar5');

                switch (level) {
                    case ("1"):
                        [].forEach.call(bar1, function (bar) {
                            bar.style.height = 20 + 'px';
                        });
                        [].forEach.call(bar2, function (bar) {
                            bar.style.height = 00 + 'px';
                        });
                        [].forEach.call(bar3, function (bar) {
                            bar.style.height = 0 + 'px';
                        });
                        [].forEach.call(bar4, function (bar) {
                            bar.style.height = 0 + 'px';
                        });
                        [].forEach.call(bar5, function (bar) {
                            bar.style.height = 0 + 'px';
                        });
                        break;
                    case ("2"):
                        [].forEach.call(bar1, function (bar) {
                            bar.style.height = 20 + 'px';
                        });
                        [].forEach.call(bar2, function (bar) {
                            bar.style.height = 40 + 'px';
                        });
                        [].forEach.call(bar3, function (bar) {
                            bar.style.height = 0 + 'px';
                        });
                        [].forEach.call(bar4, function (bar) {
                            bar.style.height = 0 + 'px';
                        });
                        [].forEach.call(bar5, function (bar) {
                            bar.style.height = 0 + 'px';
                        });
                        break;
                    case ("3"):
                        [].forEach.call(bar1, function (bar) {
                            bar.style.height = 20 + 'px';
                        });
                        [].forEach.call(bar2, function (bar) {
                            bar.style.height = 40 + 'px';
                        });
                        [].forEach.call(bar3, function (bar) {
                            bar.style.height = 60 + 'px';
                        });
                        [].forEach.call(bar4, function (bar) {
                            bar.style.height = 0 + 'px';
                        });
                        [].forEach.call(bar5, function (bar) {
                            bar.style.height = 0 + 'px';
                        });
                        break;
                    case ("4"):
                        [].forEach.call(bar1, function (bar) {
                            bar.style.height = 20 + 'px';
                        });
                        [].forEach.call(bar2, function (bar) {
                            bar.style.height = 40 + 'px';
                        });
                        [].forEach.call(bar3, function (bar) {
                            bar.style.height = 60 + 'px';
                        });
                        [].forEach.call(bar4, function (bar) {
                            bar.style.height = 80 + 'px';
                        });
                        [].forEach.call(bar5, function (bar) {
                            bar.style.height = 0 + 'px';
                        });
                        break;
                    case ("5"):
                        [].forEach.call(bar1, function (bar) {
                            bar.style.height = 20 + 'px';
                        });
                        [].forEach.call(bar2, function (bar) {
                            bar.style.height = 40 + 'px';
                        });
                        [].forEach.call(bar3, function (bar) {
                            bar.style.height = 60 + 'px';
                        });
                        [].forEach.call(bar4, function (bar) {
                            bar.style.height = 80 + 'px';
                        });
                        [].forEach.call(bar5, function (bar) {
                            bar.style.height = 100 + 'px';
                        });
                        break;
                }
            },
            error: function (response) {
                //alert("NO DATA");
            }

        });
    }, 1000);

},
)


function getTemperature(value) {
    let responseString = value.charAt(0) + value.charAt(1) + "." + value.charAt(2);
    return responseString;
}
function startFunction() {

    if (status == "1") {
        status = "0";
    }
    else {
        status = "1";
    }


    let data = { "start": status }
    $.ajax({
        type: 'PUT',
        //url: 'http://127.0.0.1:8000/api/esp/update/1',
        url: "https://espprojecteo.herokuapp.com/api/esp/update/1",
        contentType: 'application/json',
        data: JSON.stringify(data), // access in body
    }).done(function () {
        console.log('SUCCESS');
    }).fail(function (msg) {
        console.log('FAIL');
    }).always(function (msg) {
        console.log('ALWAYS');
    });

}

function focusFunction() {

    $.ajax({
        type: 'GET',
        url: "https://espprojecteo.herokuapp.com/api/esp/list",
        //url: "http://127.0.0.1:8000/api/esp/list",
        success: function (response) {

            fStatus = response[0].focus;
            if (fStatus == "0") {
                fStatus = "1";
            }
            else {
                fStatus = "0";
            }
            let data = { "focus": fStatus }
            $.ajax({
                type: 'PUT',
                url:"https://espprojecteo.herokuapp.com/api/esp/update/1",
                //url: "http://127.0.0.1:8000/api/esp/update/1",
                contentType: 'application/json',
                data: JSON.stringify(data),

            }).done(function () {

                console.log('SUCCESS');
            }).fail(function (msg) {
                console.log('FAIL');
            }).always(function (msg) {
                console.log('ALWAYS');
            });

        },
        error: function (response) {
            //alert("NO DATA");
        }
    });


}

function examFunction() {
    $.ajax({
        type: 'GET',
        url: "https://espprojecteo.herokuapp.com/api/esp/list",
        //url: "http://127.0.0.1:8000/api/esp/list",
        success: function (response) {

            eStatus = response[0].exam;
            if (eStatus == "0") {
                eStatus = "1";
            }
            else {
                eStatus = "0";
            }
            let data = { "exam": eStatus }
            $.ajax({
                type: 'PUT',
                url:"https://espprojecteo.herokuapp.com/api/esp/update/1",
                //url: "http://127.0.0.1:8000/api/esp/update/1",
                contentType: 'application/json',
                data: JSON.stringify(data),

            }).done(function () {

                console.log('SUCCESS');
            }).fail(function (msg) {
                console.log('FAIL');
            }).always(function (msg) {
                console.log('ALWAYS');
            });

        },
        error: function (response) {
            //alert("NO DATA");
        }
    });

}

function levelUpFunction() {

    level++;
    if (level > 5) {
        level = 5;
    }
    let data = { "level": level }
    $.ajax({
        type: 'PUT',
        //url: 'http://127.0.0.1:8000/api/esp/update/1',
        url: "https://espprojecteo.herokuapp.com/api/esp/update/1",
        contentType: 'application/json',
        data: JSON.stringify(data), // access in body
    }).done(function () {
        console.log('SUCCESS');
    }).fail(function (msg) {
        console.log('FAIL');
    }).always(function (msg) {
        console.log('ALWAYS');
    });
}

function levelDownFunction() {

    level--;
    if (level < 1) {
        level = 1;
    }


    let data = { "level": level }
    $.ajax({
        type: 'PUT',
        //url: 'http://127.0.0.1:8000/api/esp/update/1',
        url: "https://espprojecteo.herokuapp.com/api/esp/update/1",
        contentType: 'application/json',
        data: JSON.stringify(data), // access in body
    }).done(function () {
        console.log('SUCCESS');
    }).fail(function (msg) {
        console.log('FAIL');
    }).always(function (msg) {
        console.log('ALWAYS');
    });
}