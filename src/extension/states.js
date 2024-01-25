creep.prototype.search=function () {

    if(creep.store.getFreeCapacity() > 0 ) {
        var sources = creep.room.find(FIND_SOURCES);
        var slot = 0;
        //pour chaque ressource on cherche les positions à 1 case où un harvester peut se placer pour récolter
        //les deux type de terrains qui fonctionnent : TERRAIN_MASK_PLAIN et TERRAIN_MASK_SWAMP
        for(var i=0;i<sources.length;i++){

        }
        creep.memory.state = 'moveToHarvest';
    }
    else {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (!(structure.structureType !== STRUCTURE_EXTENSION &&
                        structure.structureType !== STRUCTURE_SPAWN &&
                        structure.structureType !== STRUCTURE_CONTAINER &&
                        structure.structureType !== STRUCTURE_TOWER)) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        creep.memory.target = targets[0];
        creep.memory.state = 'moveToDeposit';
    }


}

creep.prototype.moveToHarvest = function (target){
    if(creep.harvest(target) === ERR_NOT_IN_RANGE){
        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
    if(creep.store.getFreeCapacity() > 0){
        creep.memory.state = 'search';
    }
}

creep.prototype.moveToDeposit = function (target){
    if(creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
    }
    if(creep.store[RESOURCE_ENERGY] === 0){
        creep.memory.state = 'search';
    }
}