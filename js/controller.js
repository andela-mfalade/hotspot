var App = angular.module('App', ['serviceModule']);
App.controller('hotspotController', ['$scope', 'searchQuery', function($scope, searchQuery) {
    // $scope.gMap = searchQuery.getGMap();
    $scope.lat = 6.5243793;
    $scope.lng = 3.379205700000057;
    $scope.query = 'lagos';
    $scope.queryLocation = $scope.query;

    $scope.searchHotels = function(query){
      //Clear form field on ENTER keypress and show query in left pane
      if ($scope.query !== null) {
        $scope.queryLocation = $scope.query;
      }
      $scope.query = null; 
      searchQuery.getLatitudeLongitude(query, function(latLong) {
        $scope.lat = latLong[0];
        $scope.lng = latLong[1];
        $scope.initialize();          
        $scope.hotels = searchQuery.getHotels(query, $scope);
      });
    };

    $scope.getImageUrl =  function(query,venueId) {
      $scope.imageUrl = searchQuery.getImageUrl(query, venueId, $scope);      
    };

    $scope.updateLatLng = function(lat, lng, title) {
      $scope.lat         = lat;
      $scope.lng         = lng;
      $scope.markerTitle = title;
      $scope.updateMap();
    };

    $scope.updateMap = function() {
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
    };

    $scope.setHotels = function() {
      $scope.hotels = searchQuery.getHotels($scope.queryLocation, $scope);
    };

    $scope.initialize = function() {
      $scope.updateMap();
      $scope.setHotels();
    }

    google.maps.event.addDomListener(window, 'load', $scope.initialize);
    
  }]);