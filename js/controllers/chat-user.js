(function (ng) {
    'use strict';

    function ChatUserAuthCtrl(userService) {
        var self = this;

        self.isCurrentUserExists = function () {
            return userService.isCurrentUserExists();
        };

        self.auth = function (userName) {
            if (userName) {
                userService.authorize(userName);
            }

            self.userName = '';
        };

    }

    ng.module('exl-chat')
        .controller('chatUserAuthCtrl', ['userService', ChatUserAuthCtrl]);
})(angular);