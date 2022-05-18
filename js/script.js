flag = false;
flag_pay = false;
var map;
var lat = 36.3426551;
var lng = 59.5280652;

var info = document.getElementById("alertdiv");

function getDistance(start, end) {

    x1 = start.lat();
    x2 = end.lat();
    y1 = start.lng();
    y2 = end.lng();
    var distance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    return distance;

}




function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 15,
    };

    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;

        var myCenter = new google.maps.LatLng(lat, lng);
        map.setCenter(myCenter);



        for (var i = 0; i < Coordinates.length; i++) {

            var mylocate = new google.maps.LatLng(Coordinates[i].latt, Coordinates[i].lngg);
            map.setCenter(mylocate);
            var marker_taxi = new google.maps.Marker(
                {

                    position: mylocate,
                    icon: "images/taxi.png"

                });

            marker_taxi.setMap(map);


        }





        var marker_start = new google.maps.Marker(
            {
                position: myCenter,
                draggable: true

            });

        marker_start.setMap(map);

        google.maps.event.addListener(marker_start, 'click', (function () {



            var location = marker_start.getPosition();

            if (flag == false) {
                flag = true;
                info.innerHTML = "Determine the destination";
                var marker_end = new google.maps.Marker(
                    {
                        position: myCenter,
                        draggable: true,
                        icon: "images/des.png"

                    });

                marker_end.setMap(map);

                google.maps.event.addListener(marker_end, 'click', (function () {


                    var location_end = marker_end.getPosition();


                    var dis = getDistance(location, location_end);
                    var price = Math.round(dis * 500);

                    if (flag_pay == false) {
                        flag_pay = true;

                        info.classList.remove("alert-warning");
                        info.classList.add("alert-success");
                        info.innerHTML = "The request was submitted"


                        var alertdiv = document.getElementById("divprice");
                        alertdiv.style.color = "green";
                        alertdiv.innerHTML = "The cost of this route is: " + price + " dollar";

                        var paydiv = document.getElementById("btndivpay");
                        var canceldiv = document.getElementById("btndivcancel");
                        var btnpay = document.createElement("button");
                        btnpay.style.backgroundColor = "green";
                        btnpay.style.color = "white";
                        btnpay.style.padding = "6px";
                        btnpay.style.fontSize = "25px";
                        btnpay.style.borderRadius = "12px";
                        btnpay.style.width = "100%";
                        paydiv.appendChild(btnpay);
                        btnpay.innerHTML = "Pay";
                        var btncancel = document.createElement("button");
                        btncancel.style.backgroundColor = "red";
                        btncancel.style.color = "white";
                        btncancel.style.padding = "6px";
                        btncancel.style.fontSize = "25px";
                        btncancel.style.borderRadius = "12px";
                        btncancel.style.width = "100%";
                        canceldiv.appendChild(btncancel);

                        btncancel.innerHTML = "cancel";
                    }


                }));
            }
        }));

    });
}
else {
    alert("Geolocation is not supported by this browser.");
}


