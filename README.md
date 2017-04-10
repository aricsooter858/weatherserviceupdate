# Ionic in Action Chapter 4 Resort App

This code is from Chapter 4 and the challenges in the Ionic in Action book by Wilken.

index html

Firebase Key
AIzaSyCn-NlvElrb3P0QJHpY-f6X1Q1rGSERHNo

https://github.com/aricsooter858/resort-app

```

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <title></title>

    <link href="lib/ionic/css/ionic.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <link href="views/tour/tour.css" rel="stylesheet">

    <!-- IF using Sass (run gulp sass first), then uncomment below and remove the CSS includes above
    <link href="css/ionic.app.css" rel="stylesheet">
    -->

    <!-- ionic/angularjs js -->
    <script src="lib/ionic/js/ionic.bundle.js"></script>

    <!-- cordova script (this will be a 404 during development) -->
    <script src="cordova.js"></script>

    <!-- your app's js -->
    <script src="js/app.js"></script>
    <script src="views/reservation/reservation.js"></script>
    <script src="views/restaurants/restaurants.js"></script>
    <script src="views/weather/weather.js"></script>
    <script src="views/directions/directions.js"></script>
  </head>
  <body ng-app="App">

    <ion-nav-bar class="bar-positive">
      <ion-nav-back-button class="button-clear">
        <i class="icon ion-ios-arrow-left"></i> Back
      </ion-nav-back-button>
    </ion-nav-bar>

    <ion-nav-view></ion-nav-view>

  </body>
</html>


```

app.js

```

angular.module('App', ['ionic'])

.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/home/home.html'
    })
    .state('reservation', {
      url: '/reservation',
      controller: 'ReservationController',
      templateUrl: 'views/reservation/reservation.html'
    })
    .state('weather', {
      url: '/weather',
      controller: 'WeatherController',
      templateUrl: 'views/weather/weather.html'
    })
    .state('restaurants', {
      url: '/restaurants',
      controller: 'RestaurantsController',
      templateUrl: 'views/restaurants/restaurants.html'
    })
    .state('tour', {
      url: '/tour',
      templateUrl: 'views/tour/tour.html'
    })
    .state('directions', {
      url: '/directions',
      controller: 'DirectionsController',
      templateUrl: 'views/directions/directions.html'
    });

  $urlRouterProvider.otherwise('/tour');

})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})



```