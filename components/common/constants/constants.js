'use strict';

var ng = require('angular');

ng.module('exl-chat')
    .constant('serverConstants', {
        startToken: 'TE11EN',
        serverUrl: 'http://localhost:999/chat'
    });