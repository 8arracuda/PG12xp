sdApp.controller('ShowPlaneCtrl', function ($scope, $routeParams, $http) {

    $scope.planemodels = JSON.parse(localStorage.getItem('planemodels'));
    $scope.planes = JSON.parse(localStorage.getItem('planes'));

    $scope.stringAirport = "";
    $scope.stringLandingSpd = "";

    planeId = $routeParams.planeId;
    $scope.selectedPlane = $scope.planes.filter(function (entry) {

        return entry.id === parseInt($routeParams.planeId);
    })[0];

    //alert(JSON.stringify($scope.selectedPlane));


    $scope.addLanding = function () {

        var newLanding = {
            'airport': 'EDDK',
            'landingSpd': 10
        };

        if ($scope.selectedPlane.landings == null) {
            $scope.selectedPlane.landings = [];
        }
        //landings.push(newLanding);

        $scope.selectedPlane.landings.push(newLanding);

        localStorage.setItem('planes', JSON.stringify($scope.planes));

    };

    $scope.deleteLanding = function (index) {


        var landingToRemove = $scope.selectedPlane.landings[index];
        var answer = confirm('Landing ' + $scope.selectedPlane.landings[index].airport +  '(' + $scope.selectedPlane.landings[index].landingSpd + ') will be removed. This cannot be undone.');


        if (answer) {



            var position = $scope.selectedPlane.landings.indexOf(landingToRemove);

            if (position >= 0) {
                $scope.selectedPlane.landings.splice(position, 1);
            }
        }
    }

    $scope.addLanding = function() {
        var newLanding = {
            'airport': $scope.stringAirport,
            'landingSpd': $scope.stringLandingSpd
        };

        $scope.planes[planeId].landings.push(newLanding);
        localStorage.setItem('planes', JSON.stringify($scope.planes));

        $scope.stringAirport = "";
        $scope.stringLandingSpd = "";
    }

});