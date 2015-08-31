(function (ng) {
    'use strict';

    function Message(text, user) {
        this.text = text;
        this.date = new Date();
        this.user = user;
        this.isVisible = true;
    }

    function ChatService($http, serverConstants) {
        var messages = [];

        this.sendMessage = function (message, user) {
            var newMessage = new Message(message, user);
            messages.push(newMessage);
        };

        this.getMessages = function () {
            return messages;
        };

        this.clearMessagesHistory = function () {
            messages.length = 0;
        };

        this.hideUserMessagesFromHistory = function (userName) {

            messages.forEach(function (message) {
                if (message.user.name === userName) {
                    message.isVisible = false;
                }
            });
        }

    }

    ng.module('exl-chat')
        .service('chatService', ['$http', 'serverConstants', ChatService]);
})(angular);
