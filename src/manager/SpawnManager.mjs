export const WorkType = function (roleName) {
    const array = _.filter(Game.creeps, (creep) => creep.memory.role === roleName);
    //console.log(roleName + ': ' + array.length);
    return array;
}

export const CrafterUnit = function (roleName){
    const spawn = Game.spawns['Spawn1'];
    let newName;
    switch (roleName){
        case 'harvester':
            newName = 'Harvester' + Game.time;
            spawn.spawnCreep([WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'harvester'}});
            console.log('Spawning new harvester: ' + newName + 'spawned.');
            break;
        case 'upgrader':
            newName = 'Upgrader' + Game.time;
            console.log('Spawning new upgrader: ' + newName + 'spawned.');
            spawn.spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, {memory: {role: 'upgrader'}});
            break;
        case 'builder':
            newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName + 'spawned.');
            spawn.spawnCreep([WORK,WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'builder'}});
            break;
        case 'upkeeper':
            newName = 'Upkeeper' + Game.time;
            console.log('Spawning new upkeeper: ' + newName + 'spawned.');
            spawn.spawnCreep([WORK,WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'upkeeper'}});
            break;
        case 'roadUpkeeper':
            newName = 'RoadUpkeeper' + Game.time;
            console.log('Spawning new roadUpkeeper: ' + newName + 'spawned.');
            spawn.spawnCreep([WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'roadUpkeeper'}});
            break;
        case 'gardian':
            newName = 'Gardian' + Game.time;
            console.log('Spawning new gardian: ' + newName + 'spawned.');
            spawn.spawnCreep([ATTACK,CARRY,WORK,MOVE,MOVE,MOVE], newName, {memory: {role: 'gardian'}});
            break;
        default:

    }
}

/**
 * ghgjkhjkhjkhjkhjkhjkhjkhjk
 * @param {boolean} alarm
 * @param {number} upgraderQtt
 * @param {number} builderQtt
 * @param {number} upkeeperQtt
 * @param {number} roadUpkeeperQtt
 * @param {number} gardianQtt
 * @constructor
 */
export const runSpawnManager = function (alarm,upgraderQtt,builderQtt,upkeeperQtt,
                                         roadUpkeeperQtt,gardianQtt){
    const harvesters = WorkType('harvester');
    //console.log('Harvesters: ' + harvesters.length);
    const upgraders = WorkType('upgrader');
    //console.log('Upgraders: ' + upgraders.length);
    const builders = WorkType('builder');
    //console.log('Builders: ' + builders.length);
    const upkeepers = WorkType('upkeeper');
    //console.log('Builders: ' + builders.length);
    const roadUpkeepers = WorkType('roadUpkeeper');
    //console.log('Builders: ' + builders.length);
    const gardians = WorkType('gardian');
    //console.log('Builders: ' + builders.length);

    const harvesterQtt = Game.spawns['Spawn1'].room.memory.sourceStats[Game.spawns['Spawn1'].room.memory.mySources.length-1][2]
        * 2 - Game.spawns['Spawn1'].room.memory.mySources.length;

    if(alarm){
        if(gardians.length < gardianQtt) {
            CrafterUnit('gardian')
        }
    }
    else{
        if(harvesters.length < harvesterQtt) {
            CrafterUnit('harvester')
        }
        else if(upgraders.length < upgraderQtt){
            CrafterUnit('upgrader')
        }
        else if(builders.length < builderQtt) {
            CrafterUnit('builder')
        }
        else if(upkeepers.length < upkeeperQtt) {
            CrafterUnit('upkeeper')
        }
        else if(roadUpkeepers.length < roadUpkeeperQtt) {
            CrafterUnit('roadUpkeeper')
        }
    }


    if(Game.spawns['Spawn1'].spawning) {
        const spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }
}
