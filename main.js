// Разделение на модульное программирование
// Переменная (объект), который вытаскивается с файла role.havester, с помощью export
var roleHarvester = require('role.harvester');
// Переменная (объект), который вытаскивается с файла role.upgrade, с помощью export
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {
    // Цикл, который проходит каждый screeps
    for (var name in Game.creeps) {
        // Берётся один из screeps
        var creep = Game.creeps[name];
        // если role - harvester, то запускаем один объект
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        // если role - upgrader, то запускаем один объект
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}