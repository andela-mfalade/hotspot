var serviceModule = angular.module('serviceModule', []);

serviceModule.factory('searchQuery', ['$http', function($http) {
      var id     = 'client_id=NMKJPFSX0P4TNANK3W2LEVDWOXVZPKC3XXV2SE1Y0IQEFI5Z',
          secret = '&client_secret=IMBETH4YGJSJ5UOC5B1UJHHQH5C4DOLYFOWFHQ1LZ2IHAHRV',
          a      = 'https://api.foursquare.com/v2/venues/';


  return {
    getHotels: function(q, s) {
      var url = a + 'explore?' + id + secret + '&v=20130815&near=' + q + '&query=hotels';      
      $http.get(url).success(function(data){
        s.retreivedInfo = data.response.groups[0].items;
      }).error(function(err){
        console.log('error: ',err);
      });
    },

    getImageUrl: function(query,venueId,s) {
      var imgUrl = a + venueId + id + secret + '&v=20130815&near=' + query + '&query=hotels';
      // console.log(imgUrl)
      $http.get(imgUrl).success(function(data){

        console.log(data);    
      }).error(function(err){
        console.log('error: ',err);
      });
    },

    getLatitudeLongitude: function(s, location) {
      var geocoder = new google.maps.Geocoder();
      var address = location;
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK)
        {
           s.latLong = [results[0].geometry.location.k, results[0].geometry.location.D];
           return;
        }
      });
      
    }
  };
}]);  