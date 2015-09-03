(function (ng) {
    'use strict';

    function User(name) {
        this.name = name;
        this.id = (Math.round(Math.random() * (new Date))).toString();
    }

    function UserService() {
        var user;

        this.authorize = function (name) {
            user = user || new User(name);
        };

        this.currentUser = function () {
            return user;
        };

        this.isCurrentUserExists = function () {
            return !!user;
        };
    }

    ng.module('exl-chat')
        .service('userService', [UserService]);
})(angular);