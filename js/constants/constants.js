(function (ng) {
    'use strict';

    ng.module('exl-chat')
        .constant('serverConstants', {
            startToken: 'TE11EN',
            serverUrl: 'http://localhost:999/chat'
        });
})(angular);