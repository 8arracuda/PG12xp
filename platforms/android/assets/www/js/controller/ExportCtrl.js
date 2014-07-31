sdApp.controller('ExportCtrl', function ($scope) {


    $scope.planemodels = JSON.parse(localStorage.getItem('planemodels'));
    $scope.planes = JSON.parse(localStorage.getItem('planes'));

    $scope.stringPlanes = JSON.stringify($scope.planes);
    $scope.stringPlanemodels = JSON.stringify($scope.planemodels);


});