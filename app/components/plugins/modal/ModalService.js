angular.module("BitchTV.plugins").factory('ModalService',
    function($modal) {
        var ModalService = function(options) {
            this.instance = null;
            this.parentScope = options.parentScope;
            this.templateUrl = options.templateUrl;
            this.template = options.template;
            this.scopeData = {
                functions: options.scopeFunctions,
                watchers: options.scopeWatchers,
                data: options.scopeData
            };
            this.openned = false;
            this.scope = null;
        };

        ModalService.prototype.open = function(callback) {
            var modalOptions = this.createModalOptions();

            var self = this;
            try {
                this.instance = $modal.open(modalOptions);
                this.instance.opened.then(function() {
                    self.openned = true;
                    if(callback) callback(null);
                }, function(err) {
                    if(callback) callback(err);
                });
            } catch(err) {
                throw err;
            }
        };

        ModalService.prototype.isOpen = function() {
            return this.openned;
        };

        ModalService.prototype.close = function() {
            if(this.instance) {
                this.instance.close();
                this.openned = false;
            }
        };

        ModalService.prototype.createModalOptions = function() {
            var self = this;
            var modalOptions = {
                controller: ["$scope", function ($scope) {
                    //Functions
                    for(var key in self.scopeData.functions) {
                        $scope[key] = createCallbackWithScope(self.scopeData.functions[key], $scope);
                    }
                    $scope.closeModal = function () {
                        $scope.$close();
                    };

                    //Variables
                    for(var key in self.scopeData.data) {
                        $scope[key] = self.scopeData.data[key];
                    }

                    //Watchers
                    for(var key in self.scopeData.watchers) {
                        if(key[0] === '[') {
                            $scope.$watchCollection(key, createCallbackWithScope(self.scopeData.watchers[key], $scope));
                        } else {
                            $scope.$watch(key, createCallbackWithScope(self.scopeData.watchers[key], $scope));
                        }
                    }

                    self.scope = $scope;
                }]
            };
            if(this.templateUrl)
                modalOptions.templateUrl = this.templateUrl;
            if(this.template)
                modalOptions.template = this.template;
            if(this.parentScope)
                modalOptions.scope = this.parentScope;

            return modalOptions;

            function createCallbackWithScope(callback, scope) {
                return function() {
                    //Get the arguments of the original callback
                    var args = Array.prototype.slice.call(arguments);
                    callback(scope, args);
                };
            }
        };

        return ModalService;
    });