$(document).ready(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD_3AOaIScyfQz9ZDNJ_f5MoRm1wYhD-yk",
    authDomain: "mai-ausum-projekt.firebaseapp.com",
    databaseURL: "https://mai-ausum-projekt.firebaseio.com",
    storageBucket: "mai-ausum-projekt.appspot.com",
    messagingSenderId: "338693798249"
  };
  firebase.initializeApp(config);
  var numcities = 0;

  //get input data
  document.getElementById("city").addEventListener('keyup',function(event) {
    var cityInput = '';
    if (event.which == 13 || event.keyCode == 13) { // as the user presses the enter key, we will attempt to save the data
      cityInput = document.getElementById('city').value.trim();
      if (cityInput.includes(',')) {
      	var li = '<li>' + cityInput + '</li>';
          document.getElementById('cities').innerHTML += li;
      }
      document.getElementById('city').value = '';
    }
  var cityState = cityInput.split(',');
  //only run with proper input of City, State
  if(cityState.length === 2){


    var biGone = document.getElementById('bigOne');
    var dbRef = firebase.database().ref();
    var cityRef = dbRef.child("Cities");
    var dataRef = dbRef.child("Data");

    var yahooClientID = "dj0yJmk9VnFLcFZBMjd5UUVFJmQ9WVdrOWVuQjBhVGMyTjJrbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD1iZg--";
    var yahooClientSecret = "a7c85d2feaf14a7895bc2f4e55bd648de1c245bd";

    var city = "shity";
    var sunset = "set";
    var sunrise = "rise";
    var temp = "zero";
    var cityName = cityState[0].trim();
    var stateName = cityState[1].trim();
    console.log(cityState);
    $.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+cityName+'%2C%20'+stateName+'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function (data,status) {
      city = data.query.results.channel.location.city;
      sunrise = data.query.results.channel.astronomy.sunrise;
      sunset = data.query.results.channel.astronomy.sunset;
      temp = data.query.results.channel.item.condition.temp;

      if(data.query.results !== null){
        cityRef.child("City"+numcities).set({City:cityName, State: stateName});
        dataRef.child("City"+numcities++).set({Sunrise:sunrise,Sunset:sunset,Temp:temp});
        biGone.innerHTML = 'JK now it works';
      }
      else{
        biGone.innerHTML = 'JK now it doesn\'t';
      }
    });
  }
  return false;
});

});
