(function (ng) {
    'use strict';

    function utilsFactory() {
        var wordsRegexPattern = /\w+/g;

        function words(text) {
            if(typeof text === 'string') {
                return text.match(wordsRegexPattern) || [];
            }

            return [];
        }

        function uniq(array) {
            var map = array.reduce(function (map, key) {
                map[key] = true;
                return map;
            }, {});

            return Object.keys(map);
        }

        function diff(base, diffArray) {
            var diffResult = [];

            for (var i = 0, length = base.length; i < length; i++) {
                if (!(~diffArray.indexOf(base[i]))) {
                    diffResult.push(base[i]);
                }
            }

            return diffResult;
        }

        return {
            words: words,
            uniq: uniq,
            diff: diff
        };
    }

    ng.module('exl-chat')
        .factory('utils', utilsFactory);
})(angular);