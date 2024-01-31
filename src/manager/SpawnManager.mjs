export const WorkerType = function (roleName) {
    const array = _.filter(Game.creeps, (creep) => creep.memory.role === roleName);
    //console.log(roleName + ': ' + array.length);
    return array;
}

/**
 *
 * @param {string} spawnName
 * @param {string} screepsRole
 * @param {string} screepsName
 */
export const basicCreep = function (spawnName,screepsRole,screepsName){
    Game.spawns[spawnName].spawnCreep([WORK,CARRY,MOVE,MOVE], screepsName, {memory: {role: screepsRole}});
    console.log('Spawning new ' + screepsRole + ': ' + screepsName + 'spawned.');
}

/**
 *
 * @param {string} roleName
 * @param {string} spawnName
 * @constructor
 */
export const CrafterUnit = function (roleName, spawnName){
    let creepsName = roleName + Game.time;
    basicCreep(spawnName,roleName,creepsName);
    /*switch (roleName){
        case 'harvester':
            Game.spawns[spawnName].basicCreep(spawnName,roleName,creepsName);
            break;
        case 'upgrader':
            Game.spawns[spawnName].basicCreep(spawnName,roleName,creepsName);
            break;
        case 'builder':
            Game.spawns[spawnName].basicCreep(spawnName,roleName,creepsName);
            break;
        case 'upkeeper':
            Game.spawns[spawnName].basicCreep(spawnName,roleName,creepsName);
            break;
        case 'roadUpkeeper':
            Game.spawns[spawnName].basicCreep(spawnName,roleName,creepsName);
            break;
        case 'gardian':
            Game.spawns[spawnName].basicCreep(spawnName,roleName,creepsName);
            break;
        default:
            Game.spawns[spawnName].basicCreep(spawnName,roleName,creepsName);
            break;
    }*/
}

/**
 * ghgjkhjkhjkhjkhjkhjkhjkhjk
 * @param {string} spawnName
 * @param {boolean} alarm
 * @param {number} upgraderQtt
 * @param {number} builderQtt
 * @param {number} upkeeperQtt
 * @param {number} roadUpkeeperQtt
 * @param {number} gardianQtt
 * @constructor
 */
export const runSpawnManager = function (spawnName,alarm,upgraderQtt,builderQtt,upkeeperQtt,
                                         roadUpkeeperQtt,gardianQtt){
    const harvesters = WorkerType('harvester');
    //console.log('Harvesters: ' + harvesters.length);
    const upgraders = WorkerType('upgrader');
    //console.log('Upgraders: ' + upgraders.length);
    const builders = WorkerType('builder');
    //console.log('Builders: ' + builders.length);
    const upkeepers = WorkerType('upkeeper');
    //console.log('Builders: ' + builders.length);
    const roadUpkeepers = WorkerType('roadUpkeeper');
    //console.log('Builders: ' + builders.length);
    const gardians = WorkerType('gardian');
    //console.log('Builders: ' + builders.length);

    const harvesterQtt = Game.spawns[spawnName].room.memory.slotsQuantity + Game.spawns[spawnName].room.memory.mySources.length;

    if(alarm){
        if(gardians.length < gardianQtt) {
            CrafterUnit('gardian',spawnName)
        }
    }
    else{
        if(harvesters.length < harvesterQtt) {
            CrafterUnit('harvester',spawnName)
        }
        else if(upgraders.length < upgraderQtt){
            CrafterUnit('upgrader',spawnName)
        }
        else if(builders.length < builderQtt) {
            CrafterUnit('builder',spawnName)
        }
        else if(upkeepers.length < upkeeperQtt) {
            CrafterUnit('upkeeper',spawnName)
        }
        else if(roadUpkeepers.length < roadUpkeeperQtt) {
            CrafterUnit('roadUpkeeper',spawnName)
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
