(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
angular.module('sgb-screen-login', ['megazord'])
    .controller('sgb-screen-login-controller', ['_router', '_screenParams', '_screen', '$injector', '$stateParams', '$scope', '$translate', '$q','$ionicPopup', 
                function(_router, _screenParams, _screen, $injector, $stateParams, $scope, $translate, $q, $ionicPopup){

        //Screen template parameters
        _screen.initialize($scope, _screenParams);
        $scope.data = $stateParams.data; 

        //Dummy implementation for blocked account
        $scope.attemptsLeft = (_screenParams.maxAttempts?_screenParams.maxAttempts : 3); 

        var defaultLoginHandler = function(username, password) {
            //TODO: Default to rest api call instead of this dummy implementation
            var result = $q.defer();
            result.resolve(username == password);
            return result.promise;
        };

        var loginHandler = (_screenParams.loginHandler?_screenParams.loginHandler : defaultLoginHandler);
        $scope.login = {};
        
        $scope.clearFields = function () {
            $scope.login = {
                username:'',
                password: ''
            };
        };

        $scope.showPopup = function(message) {
            $translate(message).then(function(result){
               var alertPopup = $ionicPopup.alert({
                   title: result
                });
                alertPopup.then(function(res) {
                    $scope.clearFields();
                });
            }); 
        }

        $scope.checkField = function (regexp, field) {
            if(regexp) {
                var exp = new RegExp(regexp);
                return (exp.test(field));
            }
            return true; 
        }

        $scope.doLogin = function() {
            console.log($scope.login.username);
            if ($scope.attemptsLeft>0) {
                //Validate username and password (if needed)

                if (!($scope.checkField(_screenParams.usernameValidation, $scope.login.username))) {
                    $scope.showPopup('login_invalid_username');
                    return; 
                }
                if (!($scope.checkField(_screenParams.passwordValidation, $scope.login.password))) {
                    $scope.showPopup('login_invalid_password');
                    return; 
                }

                $injector.invoke(loginHandler, null, { username: $scope.login.username, password: $scope.login.password })
                    .then(function(result){
                        if(result) {
                            /* If $scope.keepSession Do something */
                            _router.fireEvent({
                                name: 'loginFinished', 
                                params: {
                                    username: $scope.login.username,
                                    password: $scope.login.password
                                }
                            });
                        }
                        else {
                            $scope.attemptsLeft--;
                            var msg = ($scope.attemptsLeft?'login_invalid_credentials':'login_attempts_reached'); 
                            if ($scope._screenParams.showPopup) {
                                $scope.showPopup(msg);
                            } else {
                                _router.fireEvent({
                                    name: 'loginFailed', 
                                    params: {}
                                });
                            }
                        }
                    });

            } else { 

                if ($scope._screenParams.showPopup) {
                    $scope.showPopup('login_blocked');
                } else {
                    _router.fireEvent({
                        name: 'loginBlocked', 
                        params: {}
                    });
                }
            }
        };

        $scope.forgotPass = function () {
            _router.fireEvent(
                {
                 name: 'forgotPassword', 
                 params: {}
                }
            );
        }

    }]);

},{}]},{},[1]);
