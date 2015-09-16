'use strict';

var ng = require('angular');

ng.module('exl-chat')
    .service('chatService', ['$http', 'serverConstants', 'wordsDictionary', 'messageFactory', 'utils', function ($http, serverConstants, wordsDictionary, messageFactory, _) {
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
                var formattedDictionary = _.toFormat(uniqueWords);

                messages.push(newMessage);
                wordsDictionary.push(formattedDictionary);
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

                var uniqueWords = _.uniq(words);

                messages.push.apply(messages, storedMessages);
                wordsDictionary.push.apply(wordsDictionary, _.toFormat(uniqueWords));
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

    }]);