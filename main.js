// Разделение на модульное программирование
// Переменная (объект), который вытаскивается с файла role.havester, с помощью export
var roleHarvester = require('role.harvester');

module.exports.loop = function () {
    // Цикл, который проходит каждый screeps
    for (var name in Game.creeps) {
        // Берётся один из screeps
        var creep = Game.creeps[name];
        // Вызов функции run и прокидывание screeps(скрипера)
        roleHarvester.run(creep);
    }
}