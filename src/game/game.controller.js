'use strict';

(function () {
    angular
            .module('problem_3')
            .controller('GameController', GameController);

    GameController.$inject = ['$scope', '$timeout', 'GameService'];

    function GameController($scope, $timeout, GameService) {
        $scope.categories = GameService.getGameCategories();
        $scope.selectedMenu = null;

        $scope.setCategoryGames = function (category) {
            $scope.selectedMenu = category;

            var games = GameService.getGamesByCategory(category);

            for (var i in games) {
                var thumb = 'http://cacheimg.casinomidas.com/images/www/games/minipods/'
                        + games[i].game_name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')
                        + '-minipod.jpg';

                games[i].thumb = thumb;
            }

            $scope.games = games;
        };

        function setCategoryGamesByCategoryIndex(index) {
            if (index >= 0 && index < $scope.categories.length) {
                $scope.setCategoryGames($scope.categories[index]);
            }
        }

        setCategoryGamesByCategoryIndex(0);

        function detectswipe(el, func) {
            var swipe_det = new Object();
            swipe_det.sX = 0;
            swipe_det.sY = 0;
            swipe_det.eX = 0;
            swipe_det.eY = 0;
            var min_x = 20;  //min x swipe for horizontal swipe
            var max_x = 40;  //max x difference for vertical swipe
            var min_y = 40;  //min y swipe for vertical swipe
            var max_y = 50;  //max y difference for horizontal swipe
            var direc = "";
            var ele = document.getElementById(el);
            ele.addEventListener('touchstart', function (e) {
                var t = e.touches[0];
                swipe_det.sX = t.screenX;
                swipe_det.sY = t.screenY;
            }, false);
            ele.addEventListener('touchmove', function (e) {
                e.preventDefault();
                var t = e.touches[0];
                swipe_det.eX = t.screenX;
                swipe_det.eY = t.screenY;
            }, false);
            ele.addEventListener('touchend', function (e) {
                //horizontal detection
                if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y)))) {
                    if (swipe_det.eX > swipe_det.sX)
                        direc = "r";
                    else
                        direc = "l";
                }
                //vertical detection
                if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x)))) {
                    if (swipe_det.eY > swipe_det.sY)
                        direc = "d";
                    else
                        direc = "u";
                }

                if (direc != "") {
                    if (typeof func == 'function')
                        func(el, direc);
                }
                direc = "";
            }, false);


        }

        function handle(el, d) {
            $scope.$apply(function () {
                var curCategoryIndex = 0;
                for (var i in $scope.categories) {
                    if ($scope.categories[i] === $scope.selectedMenu) {
                        curCategoryIndex = i;
                    }
                }

                if ('l' === d) {
                    setCategoryGamesByCategoryIndex(+curCategoryIndex + 1);
                } else if ('r' === d) {
                    setCategoryGamesByCategoryIndex(curCategoryIndex - 1);
                }
            });
        }
        detectswipe('games-cont', handle);
    }

})();
