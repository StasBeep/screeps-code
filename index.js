// Найди среди спавнов 'Spawn1' и заспамь Creep, со свойствами такими-то, скрипера назови 'Harvester1'
Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Harvester1');

// Запускается каждый тик (игровой)
module.exports.loop = function () {
    // Переменная которая будет держать скрипера под названием 'Harvester1'
    var creep = Game.creeps['Harvester1'];
    // Переменная которая ищет во всей комнате - источники ресурсов
    var sources = creep.room.find(FIND_SOURCES);
    // Если в комнате существует ресурс, то иди к нему
    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
    }
}