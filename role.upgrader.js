// Объект с функцией run
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {
        // Если разница в энергии нет (в станции спавна)
        if (creep.store[RESOURCE_ENERGY] == 0) {
            // берём массив из ресурсов
            var sources = creep.room.find(FIND_SOURCES);
            // если нет никаих проблем, то harvest идёт собирать ресурсы
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        } else {
            // если
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                // 
                creep.moveTo(creep.room.controller);
            }
        }
    }
};

// Экспорт объекта roleUpgrade
module.exports = roleUpgrader;