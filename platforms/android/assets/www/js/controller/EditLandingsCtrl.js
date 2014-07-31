sdApp.controller('EditLandingsCtrl', function ($scope, $routeParams, $http) {

    $scope.planemodels = JSON.parse(localStorage.getItem('planemodels'));
    $scope.planes = JSON.parse(localStorage.getItem('planes'));


    $scope.landingIndex = $routeParams.landingIndex;
    planeId = $routeParams.planeId;
    $scope.selectedPlane = $scope.planes.filter(function (entry) {

        return entry.id === parseInt($routeParams.planeId);
    })[0];






    $scope.selectedPlaneIndex = $scope.planes.indexOf($scope.selectedPlane);


    $scope.prevLanding = function() {
           $scope.landingIndex--;
    };

    $scope.nextLanding = function() {
        $scope.landingIndex++;
    };

    $scope.backAndSave = function() {
        localStorage.setItem('planes', JSON.stringify($scope.planes));
        history.back();
    }

    $scope.reset = function() {
        $scope.planes = JSON.parse(localStorage.getItem('planes'));
    };


});