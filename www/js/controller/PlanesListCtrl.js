sdApp.controller('PlanesListCtrl', function ($scope, $routeParams, $http) {

    $scope.tab = 1;

    $scope.planes = JSON.parse(localStorage.getItem('planes'));
    $scope.planemodels = JSON.parse(localStorage.getItem('planemodels'));


    $scope.planesString = JSON.stringify($scope.planes);
//    tracks.find($routeParams.trackId, function (selectedTrack) {
//        $scope.selectedTrack = selectedTrack;
//    });


    //get the correct planemodels for the planes

    $scope.arrayPlanemodels = [];


    //alert($scope.planes);
//    for (var plane in $scope.planes) {
//        var currentPlanemodel = $scope.planemodels.filter(function (entry) {
//
//        return entry.id === plane.planeId;
//    })[0];
//
//        $scope.arrayPlanemodels.push(currentPlanemodel);
//
//
//    }

    angular.forEach($scope.planes, function (plane) {
        var currentPlanemodel = $scope.planemodels.filter(function (entry) {

            return entry.id === parseInt($routeParams.planemodelId);
        })[0];

        $scope.arrayPlanemodels.push(currentPlanemodel);
    });
    //end


    $scope.updateArrayPlanemodels = function() {
        $scope.arrayPlanemodels = [];

        angular.forEach($scope.planes, function (plane) {
            var currentPlanemodel = $scope.planemodels.filter(function (entry) {

                return entry.id === parseInt($routeParams.planemodelId);
            })[0];

            $scope.arrayPlanemodels.push(currentPlanemodel);
        });
    };

    $scope.clearPlanesFromLocalStorage = function () {
        localStorage.removeItem("planes");
    };

    $scope.savePlanes = function () {
        localStorage.setItem('planes', JSON.stringify($scope.planes));
    };

    $scope.initPlanes = function () {
        $scope.planes = [
            {"id": 0, "planeId": 1, "reg": "F-XXX"},
            {"id": 1, "planeId": 1, "reg": "D-AILE"}
        ];

    };

    $scope.importPlanes = function () {
        $http.get('planes.json').
            success(function (data) {
                $scope.planes = data;
            }).
            error(function (data, status, headers, config) {
                console.log('error loading planes.json');
            });
    }




    $scope.updateExportString = function () {
        $scope.planesString = JSON.stringify($scope.planes);
    };

    $scope.importPlanes = function() {
        $http.get('planes.json').
            success(function (data) {
                $scope.planes = data;
            }).
            error(function (data, status, headers, config) {
                console.log('error loading planes.json');
            });
    }

    $scope.addPlanes = function() {
        var newPlane = {
            "id": $scope.planes.length,
            "planemodelId": 1,
            "airline": "",
            "reg": ""
        };
        $scope.planes.push(newPlane);
        localStorage.setItem('planes', JSON.stringify($scope.planes));
    };


});