Creep.prototype.searchSource=function () {
    this.say('srch.src');
    var sourcesStats = this.room.memory.sourceStats;
    var sources = this.room.memory.mySources;
    for (let i = 0; i < sourcesStats[0].length;i++){
        if(sourcesStats[i][0] > 0){
            //console.log('slot libre -> '+sourcesStats[i][0]);
            this.memory.target = sources[i];
            return;
        }
    }
    this.memory.target = null;
}

Creep.prototype.searchStructureWithFreeCapacity=function () {
    this.say('srch.freecap.');
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
    this.say('M.T.harvest');
    const target = Game.getObjectById(this.memory.target.id);
    if(this.harvest(target) === ERR_NOT_IN_RANGE){
        this.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
}

//je dois ajouter la condition où la cible a toujours de l'espace libre sinon le creep deviens afk
Creep.prototype.moveToDeposit = function (){
    this.say('M.T.deposit');
    const target = Game.getObjectById(this.memory.target.id);
    console.log(target)
    if(this.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        this.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
    }

}
/**
 *
 * @param {number}flagNum
 */
Creep.prototype.harvesterAfk= function (flagNum){
    this.say('afk.harvester');
    var flags = this.room.find(Flag);
    this.moveTo(flags[flagNum], {visualizePathStyle: {stroke: '#00f4ff'}});
}