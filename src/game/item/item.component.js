'use strict';

(function () {

    function GameItemController() {
        var ctrl = this;

        setTimeout(function () {
            ctrl.hover = function () {
                ctrl.show = true;
            };

            ctrl.leave = function () {
                ctrl.show = false;
            };

            ctrl.openGame = function () {
                console.log(ctrl.game)
                alert(
                    'game_name:' + ctrl.game.game_name + ' ' +
                    'game_code:' + ctrl.game.game_code + ' ' +
                    'machine_id:' + ctrl.game.machine_id + ' ' +
                    'denominations:' + ctrl.game.denominations + ' ' +
                    'hands:' +  ctrl.game.hands
                );
            };

        }, 0);
    }

    angular
            .module('problem_3')
            .component('gameItem', {
                templateUrl: 'game/item/views/item.html',
                controller: GameItemController,
                bindings: {
                    game: '=',
                    generateThumb: '&',
                    hover: '&'
                }
            });

})();
