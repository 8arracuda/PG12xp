sdApp.controller('SelectPlanemodelCtrl', function ($scope, $routeParams, $http) {

    $scope.planemodels = JSON.parse(localStorage.getItem('planemodels'));
    $scope.planes = JSON.parse(localStorage.getItem('planes'));


    planeId = $routeParams.planeId;
    $scope.selectedPlane = $scope.planes.filter(function (entry) {

        return entry.id === parseInt($routeParams.planeId);
    })[0];


    $scope.selectPlanemodel = function (planemodelId) {
        $scope.selectedPlane.planemodelId = planemodelId;
    };


    $scope.backAndSave = function () {
        localStorage.setItem('planes', JSON.stringify($scope.planes));
        history.back();
    }


});