(function (ng) {
    'use strict';

    function ChatService($http, serverConstants, wordsDictionary, messageFactory, _) {
        var messages = [],
            token = serverConstants.startToken;

        this.sendMessage = function (message, user, id) {
            var newMessage = messageFactory.createMessage(message, user, id);

            $http.post(serverConstants.serverUrl, newMessage.toString(), {
                headers: {
                    'Content-Type': 'text/plain;charset=UTF-8'
                }
            }).then(function () {
                var words = _.words(newMessage.text);
                var uniqueWords = _.uniq(words);
                uniqueWords = _.diff(uniqueWords, wordsDictionary);

                messages.push(newMessage);
                wordsDictionary.push(uniqueWords);
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
                storedMessages = storedMessages.map(function (msg) {
                    return messageFactory.createMessage(msg.text, msg.user, msg.id);
                });

                var words = _.words(storedMessages.reduce(function (text, message) {
                    return text + ' ' + message.text;
                }, ''));

                messages.push.apply(messages, storedMessages);
                wordsDictionary.push.apply(wordsDictionary, _.uniq(words));
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
                if (message.user === userName) {
                    message.isVisible = false;
                }
            });
        }

    }

    ng.module('exl-chat')
        .service('chatService', ['$http', 'serverConstants', 'wordsDictionary', 'messageFactory', 'utils', ChatService]);
})(angular);
