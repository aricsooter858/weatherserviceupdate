angular.module('App')
//Wind Direction calculations from http://climate.umn.edu/snow_fence/components/winddirectionanddegreeswithouttable3.htm
.filter('windDirection', [function(){
        return function(direction){
          if(direction >= 11.25 && direction <=33.75){
              return 'From the NNE';
          }
          else if(direction >= 33.75 && direction <=56.25){
              return 'From the NE';
          }
          else if(direction >= 56.25 && direction <=78.75){
              return 'From the ENE';
          }
          else if(direction >= 78.75 && direction <=101.25){
              return 'From the E';
          }
          else if(direction >= 101.25 && direction <=123.75){
              return 'From the ESE';
          }
          else if(direction >= 123.75 && direction <=146.25){
              return 'From the SE';
          }
          else if(direction >= 146.25 && direction <=168.75){
              return 'From the SSE';
          }
          else if(direction >= 168.75 && direction <=191.25){
              return 'From the S';
          }
          else if(direction >= 191.25 && direction <=213.75){
              return 'From the SSW';
          }
          else if(direction >= 213.75 && direction <=236.25){
              return 'From the SW';
          }
          else if(direction >= 236.25 && direction <=258.75){
              return 'From the WSW';
          }
          else if(direction >= 258.75 && direction <=281.25){
              return 'From the W';
          }
          else if(direction >= 281.25 && direction <=303.75){
              return 'From the WNW';
          }
          else if(direction >= 303.75 && direction <=326.25){
              return 'From the NW';
          }
          else if(direction >= 326.25 && direction <=348.75){
              return 'From the NNW';
          }
          else{
              return 'N';
          }
        };
    }])

.controller('WeatherController', ['$scope', '$http', '$ionicLoading', '$firebaseObject', 'DarkSkyWeatherService', 'localStorageService',
    function ($scope, $http, $ionicLoading, $firebaseObject,
                 DarkSkyWeatherService, localStorageService) {
  var directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  
    var age = Date.now();

    var first = true;
    console.log(first);
    
    $scope.selected_city = {
        id : "Honolulu",
					lat : 21.306944,
					lon : -157.858333,
					weather: {
					    current_conditions: "",
					    temperature: 0,
					    humidity: 0,
					    wind_speed: 0,
					    wind_direction: 0,
					    icon: ""
					}
    };
    
  
        /*      $scope.cities = 
			[
			    {
					id : "Honolulu",
					lat : 21.306944,
					lon : -157.858333,
					weather: {
					    current_conditions: "",
					    temperature: 0,
					    humidity: 0,
					    wind_speed: 0,
					    wind_direction: 0
					}
				},
				{
					id : "Amarillo",
					lat : 35.221997,
					lon : -101.831297,
					weather: {
					    current_conditions: "",
					    temperature: 0,
					    humidity: 0,
					    wind_speed: 0,
					    wind_direction: 0
					}
				},
				{
					id : "Anchorage",
					lat : 61.218056,
					lon : -149.900278,
					weather: {
					    current_conditions: "",
					    temperature: 0,
					    humidity: 0,
					    wind_speed: 0,
					    wind_direction: 0
					}
				},
				{
					id : "Denver",
					lat : 39.739236,
					lon : -104.990251,
					weather: {
					    current_conditions: "",
					    temperature: 0,
					    humidity: 0,
					    wind_speed: 0,
					    wind_direction: 0
					}
				},
				{
					id : "Little Rock",
					lat : 34.746481,
					lon : -92.289595,
					weather: {
					    current_conditions: "",
					    temperature: 0,
					    humidity: 0,
					    wind_speed: 0,
					    wind_direction: 0
					}
				},
				{
					id : "Missoula",
					lat : 46.878718,
					lon : -113.996586,
					weather: {
					    current_conditions: "",
					    temperature: 0,
					    humidity: 0,
					    wind_speed: 0,
					    wind_direction: 0
					}
				}
			]; */
			/*global firebase*/
      //enable our ability to contact the database at a certain point
      var ref  = firebase.database().ref();
      //obtain the firebas object so that we can sync changes
      $scope.db = $firebaseObject(ref);      
      
      //load from local storage
      $scope.latestWeather = function() {
          return localStorageService.getData();
      };
      
      //update to local storage
      $scope.updateWeather = function(val) {
          return localStorageService.setData(val);
      };
  
  
  $scope.getCurrentConditions = function(){
      
      //ionic's "I'm busy loading graphic"
        $ionicLoading.show();        
        
        //is weather more than 15 minutes old?      
        if(Date.now() > age + 1000 * 60 * 15 || first){
          
          //it is no longer the first time
          first = false;
          
          //get new age
          //age = Date.now();
      
                DarkSkyWeatherService.getCurrentConditions($scope.selected_city)
                    .then(function(res){

                        console.log(res.data);
                        //$scope.observation_time = new Date(res.data.currently.time * 1000);
                        $scope.selected_city.weather.temperature = res.data.currently.temperature;
                        $scope.selected_city.weather.wind_direction = res.data.currently.windBearing;
                        $scope.selected_city.weather.wind_speed = res.data.currently.windSpeed;
                        $scope.selected_city.weather.current_conditions = res.data.currently.summary;
                        $scope.selected_city.weather.icon = res.data.currently.icon;
                        $scope.selected_city.weather.humidity = res.data.currently.humidity * 100;

                        //all images except tornado from http://vclouds.deviantart.com/art/VClouds-Weather-Icons-179152045
                        //tornado from https://pixabay.com/en/tornado-storm-wind-rotation-46793/
                        if($scope.selected_city.weather.icon == "clear-day"){
                            $scope.image = "images/clearDay.png";
                        }
                        else if($scope.selected_city.weather.icon == "clear-night"){
                            $scope.image = "images/clearNight.png";
                        }
                        else if($scope.selected_city.weather.icon == "rain"){
                            $scope.image = "images/rain.png";
                        }
                        else if($scope.selected_city.weather.icon == "snow"){
                            $scope.image = "images/snow.png";
                        }
                        else if($scope.selected_city.weather.icon == "sleet"){
                            $scope.image = "images/sleet.png";
                        }
                        else if($scope.selected_city.weather.icon == "wind"){
                            $scope.image = "images/windy.png";
                        }
                        else if($scope.selected_city.weather.icon == "fog"){
                            $scope.image = "images/fog.png";
                        }
                        else if($scope.selected_city.weather.icon == "cloudy"){
                            $scope.image = "images/cloudy.png";
                        }
                        else if($scope.selected_city.weather.icon == "partly-cloudy-day"){
                            $scope.image = "images/cloudyDay.png";
                        }
                        else if($scope.selected_city.weather.icon == "partly-cloudy-night"){
                            $scope.image = "images/cloudyNight.png";
                        }
                        else if($scope.selected_city.weather.icon == "hail"){
                            $scope.image = "images/hail.png";
                        }
                        else if($scope.selected_city.weather.icon == "thunderstorm"){
                            $scope.image = "images/thunderstorm.png";
                        }
                        else if($scope.selected_city.weather.icon == "tornado"){
                            $scope.image = "images/tornado.png";
                        }
                        else {
                            $scope.image = "images/clearDay.png";
                        }
                        
//for the database
                $scope.db.latest_current_conditions = res.data.currently.summary;
                $scope.db.latest_temperature = res.data.currently.temperature;
                $scope.db.latest_icon = res.data.currently.icon;
                $scope.db.latest_humidity = res.data.currently.humidity * 100;
                $scope.db.latest_wind_speed = res.data.currently.windSpeed;
                $scope.db.latest_wind_direction = res.data.currently.windBearing;

                //set the local age variable and last accessed at once        
                $scope.db.last_accessed = age = new Date().getTime();

                //save it
                $scope.db.$save().then(function(){
                    console.log("SAVED");
                }).catch(function(error){
                    console.log("PROBLEM: " + error);
                });

                //hide ionic's "I'm busy loading" graphic
                $ionicLoading.hide();
                
            })
            .catch(function(err){
                console.log(err);
                $ionicLoading.show({
                  template: 'Could not load weather. Please try again later.',
                  duration: 3000
                });
                
                //ionic's "I'm busy loading graphic"
                $ionicLoading.hide();                            
            });          
          
        }else{

          $scope.weather = $scope.latestWeather();
        }
        
        //ionic's "I'm busy loading graphic"
        $ionicLoading.hide();         
        
      };
            
          //  $scope.selected_city = $scope.cities[0];
            $scope.getCurrentConditions();

  $ionicLoading.show();
  $http.get('https://ionic-in-action-api.herokuapp.com/weather').success(function (weather) {
    $scope.weather = weather;
    $ionicLoading.hide();
  }).error(function (err) {
    $ionicLoading.show({
      template: 'Could not load weather. Please try again later.',
      duration: 3000
    });
  });

  $scope.getDirection = function (degree) {
    if (degree > 338) {
      degree = 360 - degree;
    }
    var index = Math.floor((degree + 22) / 45);
    return directions[index];
  };
}])

.factory('DarkSkyWeatherService',['$sce', '$http', 
        function($sce, $http){
            //work happens here
            
            var darkSkyWeatherService = {};
            
            //DarkSky API key
            var key = "ff0e9220be49b46d617bd3a58bb3a09d";
            
            darkSkyWeatherService.getCurrentConditions = function(location){
                
                var url = "https://api.darksky.net/forecast/" +
                          key + "/" + location.lat + "," + location.lon + "?callback=JSON_CALLBACK";
                          
                console.log("DarkSky API URL:");
                console.log(url);
                
                //var trustedurl = $sce.trustAsResourceUrl(url);
                //return $http.jsonp(trustedurl, {jsonpCallbackParam: 'callback'});
                
                return $http.jsonp(url);
                
            };
            
            return darkSkyWeatherService;
        }
    ]);
