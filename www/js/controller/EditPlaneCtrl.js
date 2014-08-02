sdApp.controller('EditPlaneCtrl', function ($scope, $routeParams, $http) {

    $scope.planemodels = JSON.parse(localStorage.getItem('planemodels'));
    $scope.planes = JSON.parse(localStorage.getItem('planes'));




    //$scope.selectedPlane = $scope.planes[$routeParams.planeId];



    planeId = $routeParams.planeId;
    $scope.selectedPlane = $scope.planes.filter(function (entry) {

        return entry.id === parseInt($routeParams.planeId);
    })[0];



    $scope.selectedPlaneIndex = $scope.planes.indexOf($scope.selectedPlane);

        $scope.test = function() {
        alert(JSON.stringify($scope.planes));
        alert($scope.planes);
    };

    $scope.resetPlanes = function() {
      $scope.planes = JSON.parse(localStorage.getItem('planes'));
    };

    $scope.backAndSave = function() {
        localStorage.setItem('planes', JSON.stringify($scope.planes));
        history.back();
    }

});