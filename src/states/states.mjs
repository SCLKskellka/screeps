export const moveToHarvest = function (creep) {
    creep.harvestOrMove(Game.getObjectById(creep.memory.mySourceId));
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
    console.log(targets[0])
    if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
    }
}
/**
 *
 * @param {Creep} creep
 * @param {number} flagNum
 */
export const harvesterAfk = function (creep, flagNum) {
    const flags = creep.room.find(Flag);
    creep.moveTo(flags[flagNum], {visualizePathStyle: {stroke: '#00f4ff'}});
}