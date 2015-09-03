(function (ng) {
    'use strict';

    function wordsFilter($sce) {

        return function (text, phrase) {
            if (phrase) {
                text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
                    '<span class="exl-highlighted">$1</span>');
            }

            return $sce.trustAsHtml(text);
        }
    }

    ng.module('exl-chat')
        .filter('highlighter', wordsFilter);
})(angular);