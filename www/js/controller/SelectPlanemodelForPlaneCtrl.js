sdApp.controller('SelectPlanemodelForPlaneCtrl', function ($scope, $routeParams, $http) {

    $scope.planemodels = JSON.parse(localStorage.getItem('planemodels'));
    $scope.planes = JSON.parse(localStorage.getItem('planes'));



    planeId = $routeParams.planeId;
    $scope.selectedPlane = $scope.planes.filter(function (entry) {
        return entry.id === parseInt($routeParams.planeId);
    })[0];

    var planemodelId_backup = $scope.selectedPlane.planemodelId;

    $scope.selectPlanemodel = function (planemodelId) {
        $scope.selectedPlane.planemodelId = planemodelId;
    };


    $scope.backAndSave = function () {
        console.log('backAndSave');
        localStorage.setItem('planes', JSON.stringify($scope.planes));
//        loadUrl('#/editPlane/' + planeId);
        window.location.href = '#/editPlane/' + planeId;
    }

    $scope.resetPlanemodelSelection = function() {
        console.log('resetPlanemodelSelection');
        $scope.selectedPlane.planemodelId = planemodelId_backup;
    }


});