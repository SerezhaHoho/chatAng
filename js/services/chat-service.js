(function (ng) {
    'use strict';

    function Message(text, user, userId) {
        this.text = text;
        this.date = new Date();
        this.userName = user.name;
        this.userId = user.id || userId;
        this.isVisible = true;
    }

    Message.prototype.toString = function () {
        return JSON.stringify(this, ['text', 'userName', 'userId']);
    };

    Message.toMessage = function (data) {
        return new Message(data.text, data.user, data.id);
    };

    function ChatService($http, serverConstants) {
        var messages = [],
            token = serverConstants.startToken;

        this.sendMessage = function (message, user) {
            var newMessage = new Message(message, user);

            $http.post(serverConstants.serverUrl, newMessage.toString(), {
                headers: {
                    'Content-Type': 'text/plain;charset=UTF-8'
                }
            }).then(function () {
                messages.push(newMessage);
            }).catch(function (err) {
                console.error(err);
            });
        };

        this.getMessages = function () {

            $http.get(serverConstants.serverUrl, {
                params: {
                    token: token
                }
            }).then(function (result) {
                var storedMessages = result.data.messages;
                token = result.data.token;
                storedMessages = storedMessages.map(Message.toMessage);

                messages.push.apply(messages, storedMessages);
            }).catch(function (err) {
                console.error(err);
            });

            return messages;
        };

        this.clearMessagesHistory = function () {
            messages.length = 0;
        };

        this.hideUserMessagesFromHistory = function (userName) {

            messages.forEach(function (message) {
                if (message.userName === userName) {
                    message.isVisible = false;
                }
            });
        }

    }

    ng.module('exl-chat')
        .service('chatService', ['$http', 'serverConstants', ChatService]);
})(angular);
