Creep.prototype.searchSource=function () {
    var sourcesStats = this.room.memory.sourceStats;
    for (let i = 0; i < sourcesStats[0].length;i++){
        if(sourcesStats[i][1] > 0){
            this.memory.target = sourcesStats[i][1];
            return;
        }
    }
    this.memory.target = null;
}

Creep.prototype.searchStructureWithFreeCapacity=function () {
    var targets = this.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (!(structure.structureType !== STRUCTURE_EXTENSION &&
                    structure.structureType !== STRUCTURE_SPAWN &&
                    structure.structureType !== STRUCTURE_CONTAINER &&
                    structure.structureType !== STRUCTURE_TOWER)) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });
    this.memory.target = targets[0];
}

Creep.prototype.moveToHarvest = function (){
    const target = this.memory.target;
    if(creep.harvest(target) === ERR_NOT_IN_RANGE){
        this.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
}

Creep.prototype.moveToDeposit = function (){
    const target = creep.memory.target;
    if(this.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        this.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
    }

}