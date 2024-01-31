
Room.prototype.SourceManager = function (){
    const sources = this.find(FIND_SOURCES);
    let slot = 0;
    let usedSlot = 0;
    let freeSlot = 0;
    let totalSlot = 0;
    const sourceStats = [];
    //for each source search free place for harvester to harvest
    //type of terrain witch match : plain : 0 and swamp : TERRAIN_MASK_SWAMP
    for(let i=0;i<sources.length;i++) {
        sourceStats[i] = [];
        var voisins =
            [[sources[i].pos.x - 1, sources[i].pos.y - 1],
                [sources[i].pos.x - 1, sources[i].pos.y],
                [sources[i].pos.x - 1, sources[i].pos.y + 1],
                [sources[i].pos.x, sources[i].pos.y - 1],
                [sources[i].pos.x, sources[i].pos.y + 1],
                [sources[i].pos.x + 1, sources[i].pos.y - 1],
                [sources[i].pos.x + 1, sources[i].pos.y],
                [sources[i].pos.x + 1, sources[i].pos.y + 1]];
        for (let j = 0; j < voisins.length; j++) {
            const terrain = this.getTerrain();
            switch(terrain.get(voisins[j][0], voisins[j][1])) {
                case TERRAIN_MASK_SWAMP:
                    slot += 1;
                    totalSlot += 1;
                    const creepsAtSwampPos = this.lookForAt(LOOK_CREEPS,voisins[j][0], voisins[j][1]);
                    if (creepsAtPos === null) freeSlot += 1;
                    else {
                        usedSlot += 1;
                    }
                    break;
                case 0:
                    slot += 1;
                    totalSlot += 1;
                    const creepsAtPlainPos = this.lookForAt(LOOK_CREEPS,voisins[j][0], voisins[j][1]);
                    if (creepsAtPlainPos.length>0) usedSlot += 1;
                    else {
                        freeSlot += 1;
                    }
                    break;
            }
        }
        sourceStats[i][0] = freeSlot;
        sourceStats[i][1] = usedSlot;
        sourceStats[i][2] = slot;
        console.log('freeslot:' + freeSlot + ' usedSlot:' + usedSlot);
        freeSlot = 0;
        usedSlot = 0;
        slot = 0
    }
    console.log('FIN ');
    this.memory.totalSlotsQuantity = slot;
    this.memory.mySources = sources;
    this.memory.sourceStats = sourceStats;
    const myCreeps = this.find(FIND_MY_CREEPS)
    let creepsTargetingSource = 0;
    const targetingSourceList = [];
    //for each harvester if this source target limit > this source current target number , harvester target this source
    for(let i = 0; i < myCreeps.length;i++){
        if(myCreeps[i].memory.role === 'harvester'){
            for(let j =0; j < sources.length; j++){
                if(targetingSourceList[j] === undefined )targetingSourceList[i]=0;
                var targetlimit = sourceStats[j[2] * 2 + 1]
                if(targetingSourceList[j]<targetlimit){
                    myCreeps[i].memory.mySource = sources[j].id;
                }
            }
        }
    }
};