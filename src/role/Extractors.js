const {fill} = require("lodash");
var roleExtractors = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var sources = creep.room.find(FIND_SOURCES);
        var Creeps = creep.room.find(FIND_CREEPS);
        var tmp = 0;
        var ExtractorsList = [];
        for(var h = 0; h< Creeps.length; h++){
            if(Creeps[h].memory.role == 'Extractor'){
                ExtractorsList[tmp] = Creeps[h]
                tmp++;
            }
        }
        for (var i = 0; i < ExtractorsList.length; i++) {
            if(ExtractorsList[i] === creep){
                if(creep.harvest(sources[i]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(sources[i], {visualizePathStyle: {stroke: '#ffdd00'}});
                }
            }
        }
    }
};

module.exports = roleExtractors;