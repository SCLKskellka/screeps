var EnergyManager = {
    StoredEnergieInRoom : function totlaAmount(){
        /*var storingEnergieStructure = screen.room.find(FIND_STRUCTURES,{
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_CONTAINER ||
                    structure.structureType == STRUCTURE_STORAGE );
            }
        })
        var totalAmount = 0;
        for(var i = 0;i<storingEnergieStructure.length-1;i++){
            totalAmount += storingEnergieStructure[i].store[RESOURCE_ENERGY];
        }*/
        return Game.spawns['Spawn1'].room.energyCapacity;
    },

};
module.exports = EnergyManager;