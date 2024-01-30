
Room.prototype.SourceManager = function (){
    const sources = this.find(FIND_SOURCES);

    let slot = 0;
    let usedSlot = 0;
    let freeSlot = 0;
    const sourceStats = [];
    console.log(sourceStats + 'contenant: ' + sourceStats[0]);
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
                    const creepsAtSwampPos = this.lookForAt(LOOK_CREEPS,voisins[j][0], voisins[j][1]);
                    if (creepsAtPos === null) freeSlot += 1;
                    else {
                        usedSlot += 1;
                    }
                    break;
                case 0:
                    slot += 1;
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
        console.log('freeslot:' + freeSlot + ' usedSlot:' + usedSlot+' slot:'+slot);
        freeSlot = 0;
        usedSlot = 0;
    }
    console.log('FIN ');
    this.memory.mySources = sources;
    this.memory.sourceStats = sourceStats;
};

Room.prototype.displaySourceManager = function () {
    console.table(this.memory.sourceStats);
}