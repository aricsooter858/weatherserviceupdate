angular.module('App')
.controller('DirectionsController', function ($scope, $http, DirectionsService) {
   
   $http.get("https://maps.googleapis.com/maps/api/directions/json?origin=75+9th+Ave+New+York,+NY&destination=MetLife+Stadium+1+MetLife+Stadium+Dr+East+Rutherford,+NJ+07073&key=AIzaSyD4qAANK_XESBByTT6n8I_yX2uKM2B0478").success(function (direction) {
    $scope.direction = direction;
  });
   
   
   
    $scope.getDirections = function(){
        DirectionsService.geoLocate()
        .then(function(res){
            
        });
        
    };
    
    

})
.factory('DirectionsService', ['$sce', '$http', 
        function($sce, $http){
            //https://docs.angularjs.org/api/ng/service/$sce
            
            //create an empty object
            var directionService = {};
            
            var key = "AIzaSyD4qAANK_XESBByTT6n8I_yX2uKM2B0478";
            
            directionService.geoLocate = function(){

                var url = "https://maps.googleapis.com/maps/api/directions/json?origin=75+9th+Ave+New+York,+NY&destination=MetLife+Stadium+1+MetLife+Stadium+Dr+East+Rutherford,+NJ+07073&key=" + key;

                var trustedurl = $sce.trustAsResourceUrl(url);
                return $http.get(trustedurl);
            };
            
            return directionService;            
            
        }]);