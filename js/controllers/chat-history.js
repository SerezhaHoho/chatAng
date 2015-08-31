(function (ng) {
    'use strict';

    function ChatHistoryCtrl(userService, chatService) {
        var self = this;

        self.messagesHistory = chatService.getMessages();

        self.user = userService.currentUser();

        Object.defineProperty(this, 'getDictionary', {
            get: function () {
                var regExp = /\w+/g,
                    autocompleteDictionary = [],
                    newArray = [];

                self.messagesHistory.forEach(function (message) {
                    newArray = message.text.match(regExp);

                    autocompleteDictionary = autocompleteDictionary.concat(newArray);
                });

                return autocompleteDictionary;
            }
        });

        self.isCurrentUserExists = function () {
            return userService.isCurrentUserExists();
        };

        self.send = function (message, user) {
            if (message) {
                chatService.sendMessage(message, user);
            }

            self.message = '';
        };

        self.clearHistory = function () {
            chatService.clearMessagesHistory();
        };

        self.quoteMessage = function (name, date, text) {
            self.message = 'Цитата: ' + name + ' в ' + date + ' написал: ' + text;
        };

        self.hideUserMessages = function (userName) {
            chatService.hideUserMessagesFromHistory(userName);
        };
    }

    ng.module('exl-chat')
        .controller('chatHistoryCtrl', ['userService', 'chatService', ChatHistoryCtrl]);
})(angular);