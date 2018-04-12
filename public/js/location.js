//var x = document.getElementById("demo");

// var cars = ["B2FA1", "B2FA2", "B2FA3","B2FA4","B2FA5",
//                 "B2FA6","B2FA7","B2FA8","B2FA9","B3FA1","B3FA2","B3FA3","B3FA4","B3FA5","B3FA6","B3FA7"];

// var x = Math.floor((Math.random() * 15) + 0);

// function getLocation(){

// 	$.post("/location",{account:localStorage.getItem("username"),address:cars[x]}, function(result) {
// 		    if(result[0].isSucssess=="success"){
// 		        alert("定位成功");
// 		    }else{
// 		        alert("定位失敗");
// 		    }
      
// 	  });
    
// }

// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     } else { 
//         x.innerHTML = "Geolocation is not supported by this browser.";
//     }
// }

// function showPosition(position) {
//     x.innerHTML = "Latitude: " + position.coords.latitude + 
//     "<br>Longitude: " + position.coords.longitude;
    
// 	$.ajax({
// 	  type: 'POST',
// 	  url: '/location',
// 	  data: { Lat: position.coords.latitude, Lng: position.coords.longitude, No: $('#txtNo').val() },
// 	  //success: success,
// 	  //dataType: dataType
// 	});
    
// }