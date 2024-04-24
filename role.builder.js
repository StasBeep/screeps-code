// Объект roleBuilder, с функцией run внутри
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {
        // Если скрипер имеет роль строителя и ресурсы = 0
        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            // то строить - отключить
            creep.memory.building = false;
            // ожидание
            creep.say('🔄 harvest');
        }

        // если строительство - false, и значение равно 0
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            // то включить строить
            creep.memory.building = true;
            // строитель
            creep.say('🚧 build');
        }

        // если скрипер строитель
        if (creep.memory.building) {
            // то мы ищем в комнате все конструкции (массив конструкций)
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            // если конструкции есть
            if (targets.length) {
                // если строитель строит постройку[0],
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    // то идём к ней
                    creep.moveTo(targets[0], {
                        // и видимость screeps белого цвета
                        visualizePathStyle: {
                            stroke: '#ffffff'
                        }
                    });
                }
            }
            // если он  не строитель
        } else {
            // то ищем ресурсы
            var sources = creep.room.find(FIND_SOURCES);
            // идём к ресурсу
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {
                    visualizePathStyle: {
                        // видимость screeps жёлтого
                        stroke: '#ffaa00'
                    }
                });
            }
        }
    }
};

module.exports = roleBuilder;