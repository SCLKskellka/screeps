room.prototype.SourceManager = function (){
    const sources = creep.room.find(FIND_SOURCES);
    let slot = 0;
    let usedSlot = 0;
    let freeSlot = 0;
    var sourceStats = new [];
    //pour chaque ressource on cherche les positions à 1 case où un harvester peut se placer pour récolter
    //les deux type de terrains qui fonctionnent : TERRAIN_MASK_PLAIN et TERRAIN_MASK_SWAMP
    for(let i=0;i<sources.length;i++){
        sourceStats[i] = [];
        for(let j = sources[i].pos.x-1;j<sources[i].pos.x+2;j++){
            for(let k = sources[i].pos.y-1;j<sources[i].pos.y+2;j++){
                switch(terrain.get(j,k)) {
                    case 0:
                        slot +=1;
                        const creepAtPosPlain = creep.lookForAt('creep',j,k);
                        if(creepAtPosPlain.length>0)usedSlot+=1;
                        else{
                            freeSlot+=1;
                        }
                        break;
                    case TERRAIN_MASK_SWAMP:
                        slot +=1;
                        const creepAtPosSwamp = creep.lookForAt('creep',j,k);//look objects at position return array
                        if(creepAtPosSwamp.length>0)usedSlot+=1;
                        else{
                            freeSlot+=1;
                        }
                        break;
                }
            }
        }
        sourceStats[i][0] = sources[i];
        sourceStats[i][1] = freeSlot;
        sourceStats[i][2] = usedSlot;
        sourceStats[i][3] = freeSlot+usedSlot;
        freeSlot = 0;
        usedSlot = 0;
    }
    room.memory.sourceStats = sourceStats;
};