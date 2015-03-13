var App = angular.module('App', ['serviceModule']);
App.controller('hotspotController', ['$scope', 'searchQuery', function($scope, searchQuery) {
    $scope.query = 'lagos';
    $scope.searchHotels = function(query, event){
      if (event.which === 13 || event.type === 'click') {
        searchQuery.getLatitudeLongitude($scope,query);
        $scope.initialize();
        $scope.hotels = searchQuery.getHotels(query, $scope);
        $scope.lat = $scope.latLong[0];
        $scope.lng = $scope.latLong[1];                
        console.log($scope.retreivedInfo);
      } 
    };

    $scope.getImageUrl =  function(query,venueId) {
      $scope.imageUrl = searchQuery.getImageUrl(query,venueId,$scope);      
    };

    // $scope.gMap = searchQuery.getGMap();
    $scope.lat = 6.5243793;
    $scope.lng = 3.379205700000057;

    $scope.updateLatLng = function(lat, lng, title) {

      $scope.lat         = lat;
      $scope.lng         = lng;
      $scope.markerTitle = title;
      $scope.initialize();
    };

    

    $scope.initialize = function() {
      var mapOptions = {
      center: { lat: $scope.lat, lng: $scope.lng},
      zoom: 15
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var marker = new google.maps.Marker({
        position: { lat: $scope.lat, lng: $scope.lng},
        map: map,
        title: $scope.markerTitle
    });
    marker.setMap(map);
    $scope.hotels = searchQuery.getHotels($scope.query, $scope);
    }
    google.maps.event.addDomListener(window, 'load', $scope.initialize);
    
  }]);