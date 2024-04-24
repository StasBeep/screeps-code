// Найди среди спавнов 'Spawn1' и заспамь Creep, со свойствами такими-то, скрипера назови 'Harvester1'
Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Harvester1');

// Запускается каждый тик (игровой)
module.exports.loop = function () {
    // Переменная которая будет держать скрипера под названием 'Harvester1'
    var creep = Game.creeps['Harvester1'];

    // Если скрип, который переносит не пустой
    if (creep.store.getFreeCapacity() > 0) {
        // Переменная которая ищет во всей комнате - источники ресурсов
        var sources = creep.room.find(FIND_SOURCES);
        // Если в комнате существует ресурс, то иди к нему
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    } else {
        // Если он собрал энергию, то найди Spawn1 и принеси ресурсы
        if (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.spawns['Spawn1']);
        }
    }
}

// Создание второго screeps, под названием Harvester2, для него нужно 200 энергии
// Если энергии не хватает, то выскакивает ошибка -6
Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Harvester2');

module.exports.loop = function () {
    // бегаем по всем скрипам, которые присутствуют в комнате
    for (var name in Game.creeps) {
        // берём одного из screeps
        var creep = Game.creeps[name];

        if (creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        } else {
            if (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
    }
}

// Создание screeps для upgrade (для улучшения (слежения за контроллером))
Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Upgrader1');

// Разделение на роли разных скриперов
Game.creeps['Harvester1'].memory.role = 'harvester';
Game.creeps['Upgrader1'].memory.role = 'upgrader';

// создание скрипера (строителя), под названием Builder1, с ролью builder
Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Builder1', {
    memory: {
        role: 'builder'
    }
});

// Сооздание большого скрипера (который передвигается и собирает), но очень медлительный
//  (должен быть 2 уровень + ресурсы на строительство)
Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],
    'HarvesterBig', {
        memory: {
            role: 'harvester'
        }
});

// Определение сколько энергии в комнате
for (var name in Game.rooms) {
    console.log('Room "' + name + '" has ' + Game.rooms[name].energyAvailable + ' energy');
}

Game.rooms['sim'].energyAvailable // проверка в консоли на количество энергии

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

// новая функция (жизненый хук, работающий каждый тик)
module.exports.loop = function () {

    // переменная, которая с помощью filter, собирает в комнате скриперов собирателей
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    // вывод в консоли количества скриперов собирателей
    console.log('Harvesters: ' + harvesters.length);

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


// ? Создание автоматического спавна скрипера
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {

    // Переменная, которая содержит скриперов собирателей
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    // если массив собирателей меньше 2,
    if (harvesters.length < 2) {
        // Переменная содержащая имя скрипера
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);

        // Заспавнь в Spawn1, скрипера со статусом: работа, перемещение, перенос, с именем newName и ролью harvester
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {
            memory: {
                role: 'harvester'
            }
        });
    }

    // Если спавн спавнит
    if (Game.spawns['Spawn1'].spawning) {
        // переменная, которая содержит скриперов
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        // то спавн скриперы с этого спавна выдают текст, с определёнными стилями
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y, {
                align: 'left',
                opacity: 0.8
            });
    }

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