(function(ng) {
    'use strict';

    function scrollBottom() {
        return {
            scope: {
                messages: "="
            },
            link: function (scope, element) {
                scope.$watchCollection('messages', function (newValue) {
                    if (newValue)
                    {
                        $(element).animate({scrollTop: $(element)[0].scrollHeight}, 1000);
                    }
                });
            }
        }
    }

    ng.module('exl-chat')
        .directive('scrollBottom', scrollBottom)
})(angular);