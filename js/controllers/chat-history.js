(function (ng) {
    'use strict';

    function ChatHistoryCtrl(userService, chatService, wordsDictionary, _) {
        var self = this;

        self.messagesHistory = chatService.getMessages();

        self.user = userService.currentUser();

        self.dictionary = wordsDictionary;

        self.isCurrentUserExists = function () {
            return userService.isCurrentUserExists();
        };

        self.send = function (message, user, id) {
            if (message) {
                chatService.sendMessage(message, user, id);
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
        .controller('chatHistoryCtrl', ['userService', 'chatService', 'wordsDictionary', 'utils', ChatHistoryCtrl]);
})(angular);