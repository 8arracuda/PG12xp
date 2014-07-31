sdApp.controller('PlanemodelsListCtrl', function ($scope, $routeParams, $http) {

    $scope.planemodels = JSON.parse(localStorage.getItem('planemodels'));



    $scope.planemodelsString = JSON.stringify($scope.planemodels);
//    tracks.find($routeParams.trackId, function (selectedTrack) {
//        $scope.selectedTrack = selectedTrack;
//    });



    $scope.clearPlanemodelsFromLocalStorage = function() {
        localStorage.removeItem("planemodels");
    };


    $scope.savePlanemodels = function() {
        localStorage.setItem('planemodels', JSON.stringify($scope.planemodels));
    };

    $scope.initPlanemodels = function() {
        $scope.planemodels = [
            {"id":0, "name": "Airbus A320neo"},
            {"id":1, "name": "Boeing 737 Advanced 200"}
        ];

    };

    $scope.importPlanemodels = function() {
        $http.get('planemodels.json').
            success(function (data) {
                $scope.planemodels = data;
            }).
            error(function (data, status, headers, config) {
                console.log('error loading planemodels.json');
            });
    }

    $scope.addPlanemodel = function() {
        var newPlanemodel = {
        "id": $scope.planemodels.length,
        "name": ""
    };
      $scope.planemodels.push(newPlanemodel);
    };


    $scope.updateExportString = function() {
      $scope.planemodelsString = JSON.stringify($scope.planemodels);
    };

});