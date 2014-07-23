angular.module('starter.controllers', [])
        .controller('DashCtrl', function($scope, $cordovaDevice, $cordovaDeviceMotion, $cordovaDialogs, $cordovaVibration) {
            function __setRanges(acceleration) {
                if (acceleration.x < $scope.ranges.x.min)
                    $scope.ranges.x.min = acceleration.x;
                if (acceleration.y < $scope.ranges.y.min)
                    $scope.ranges.y.min = acceleration.y;
                if (acceleration.z < $scope.ranges.z.min)
                    $scope.ranges.z.min = acceleration.z;

                if (acceleration.x > $scope.ranges.x.max)
                    $scope.ranges.x.max = acceleration.x;
                if (acceleration.y > $scope.ranges.y.max)
                    $scope.ranges.y.max = acceleration.y;
                if (acceleration.z > $scope.ranges.z.max)
                    $scope.ranges.z.max = acceleration.z;

                $scope.ranges.x.d = (100 * ($scope.ranges.x.max - $scope.ranges.x.min) / $scope.ranges.x.max);
                $scope.ranges.y.d = (100 * ($scope.ranges.y.max - $scope.ranges.y.min) / $scope.ranges.y.max);
                $scope.ranges.z.d = (100 * ($scope.ranges.z.max - $scope.ranges.z.min) / $scope.ranges.z.max);
            }

            // TODO needed?
            $scope.getAcceleration = function() {
                $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
                    // Success! 
                }, function(err) {
                    // An error occured. Show a message to the user
                });
            };

            $scope.watchReset = function(vibrate) {
                /*if (vibrate !== false)
                 $cordovaVibration.vibrate(100);*/
                // $scope.buttons = {start: true, stop: false, reset: false};
                $scope.buttons = {start: false, stop: true, reset: true};

                $scope.counter = 0;
                $scope.ranges = {
                    x: {min: null, max: null, d: null},
                    y: {min: null, max: null, d: null},
                    z: {min: null, max: null, d: null}
                };
                $scope.acceleration = {x: 0, y: 0, z: 0};
            };

            $scope.watchStart = function() {
                $scope.buttons = {start: true, stop: false, reset: true};

                var options = {frequency: 250};

                watch = $cordovaDeviceMotion.watchAcceleration(options);
                $scope.watchId = watch.watchId;

                watch.promise.then(
                        function() { // unused
                        },
                        function(err) {
                        },
                        function(acceleration) {
                            $scope.acceleration = acceleration;

                            if ($scope.counter == 0) {
                                $scope.ranges.x.min = acceleration.x;
                                $scope.ranges.x.max = acceleration.x;

                                $scope.ranges.y.min = acceleration.y;
                                $scope.ranges.y.max = acceleration.y;

                                $scope.ranges.z.min = acceleration.z;
                                $scope.ranges.z.max = acceleration.z;
                            }

                            $scope.counter++;
                            if ($scope.counter == $scope.counterMax)
                                $scope.watchStop();

                            __setRanges(acceleration);
                        });
            };

            $scope.watchStop = function() {
                // $cordovaVibration.vibrate(100);
                $scope.buttons = {start: true, stop: true, reset: false};

                if (!watch) {
                    return;
                }

                // use watchID from watchAccelaration()
                $cordovaDeviceMotion.clearWatch($scope.watchId).then(function(result) {
                    // Success!
                }, function(err) {
                    // An error occured. Show a message to the user
                });
            };

            var watch;
            $scope.counter = 0;
            $scope.counterMax = 100;
            $scope.buttons = {start: false, stop: true, reset: true};
            $scope.watchReset(false);
        })

        .controller('FriendsCtrl', function($scope, Friends) {
            $scope.friends = Friends.all();
        })

        .controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
            $scope.friend = Friends.get($stateParams.friendId);
        })

        .controller('AccountCtrl', function($scope) {
        });
