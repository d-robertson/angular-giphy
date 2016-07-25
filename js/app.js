angular.module('GiphyApp', ['infinite-scroll'])

.controller('myCtrl', ['$scope', '$http', function($scope, $http){
  $scope.offset = 0;
  $scope.busy = false;
  $scope.search = 'dogs';

  $scope.add = function(){
    $scope.results = null;
    query();
  }

  function query(){
    $scope.busy = true;

    $http.get('http://api.giphy.com/v1/stickers/search', {
      params: {
        api_key: 'dc6zaTOxFJmzC',
        q: $scope.search,
        limit: 30,
        offset: $scope.offset
      }
    })
    .then(function success(res){
      if(!$scope.results) {
        $scope.results = res.data.data;
      } else {
        Array.prototype.push.apply($scope.results, res.data.data);
      }
      $scope.busy = false;
    }, function error(res){
      console.log(res);
    });
  }

  $scope.next = function(){
    console.log("looking for more stuff");
    $scope.offset += 30;
    query();
  }
}]);
