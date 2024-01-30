export const searchSource = function (creep) {
    //this.say('srch.src');
    const sourcesStats = creep.room.memory.sourceStats;
    const sources = creep.room.memory.mySources;
    for (let i = 0; i < sourcesStats[0].length; i++) {
        if (sourcesStats[i][0] > 0) {
            //console.log('slot libre -> '+sourcesStats[i][0]);
            creep.memory.target = sources[i];
            return;
        }
    }
    creep.memory.target = null;
}

export const searchStructureWithFreeCapacity = function (creep) {
    creep.say('srch.freecap.');
    const targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (!(structure.structureType !== STRUCTURE_EXTENSION &&
                    structure.structureType !== STRUCTURE_SPAWN &&
                    structure.structureType !== STRUCTURE_CONTAINER &&
                    structure.structureType !== STRUCTURE_TOWER)) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });
    creep.memory.target = targets[0];
}

export const moveToHarvest = function (creep) {
    const sourcesStats = creep.room.memory.sourceStats;
    const sources = creep.room.memory.mySources;
    let target;
    for (let i = 0; i < sourcesStats[0].length; i++) {
        if (sourcesStats[i][0] > 0) {
            target = sources[i];
            return;
        }
    }
    creep.say('M.T.harvest');
    creep.harvestOrMove(target);
}

//je dois ajouter la condition où la cible a toujours de l'espace libre sinon le creep deviens afk
export const moveToDeposit = function (creep) {
    const targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (!(structure.structureType !== STRUCTURE_EXTENSION &&
                    structure.structureType !== STRUCTURE_SPAWN &&
                    structure.structureType !== STRUCTURE_CONTAINER &&
                    structure.structureType !== STRUCTURE_TOWER)) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });
    const target = Game.getObjectById(creep.memory.target.id);
    console.log(target)
    if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
    }
    creep.say('M.T.deposit');
}
/**
 *
 * @param {number}flagNum
 */
export const harvesterAfk = function (creep, flagNum) {
    creep.say('afk.harvester');
    const flags = creep.room.find(Flag);
    creep.moveTo(flags[flagNum], {visualizePathStyle: {stroke: '#00f4ff'}});
}