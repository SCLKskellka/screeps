
Room.prototype.SourceManager = function (){
    const sources = this.find(FIND_SOURCES);
    let slot = 0;
    let usedSlot = 0;
    let freeSlot = 0;
    const sourceStats = [];
    console.log(sourceStats + 'contenant: ' + sourceStats[0]);
    //for each source search free place for harvester to harvest
    //type of terrain witch match : plain : 0 et swamp : TERRAIN_MASK_SWAMP
    for(let i=0;i<sources.length;i++) {
        sourceStats[i] = [];
        console.log(sourceStats + 'contenant: ' + sourceStats[i]);
        sourceStats[0][i] = sources[i];
        console.log('source pos: ' + sourceStats[0][i].pos);
        var voisins =
            [[sourceStats[0][i].pos.x - 1, sourceStats[0][i].pos.y - 1],
                [sourceStats[0][i].pos.x - 1, sourceStats[0][i].pos.y],
                [sourceStats[0][i].pos.x - 1, sourceStats[0][i].pos.y + 1],
                [sourceStats[0][i].pos.x, sourceStats[0][i].pos.y - 1],
                [sourceStats[0][i].pos.x, sourceStats[0][i].pos.y + 1],
                [sourceStats[0][i].pos.x + 1, sourceStats[0][i].pos.y - 1],
                [sourceStats[0][i].pos.x + 1, sourceStats[0][i].pos.y],
                [sourceStats[0][i].pos.x + 1, sourceStats[0][i].pos.y + 1]];
        for (let j = 0; j < voisins.length; j++) {
            const terrain = this.getTerrain();
            //console.log('coord cases voisines: '+voisins[j][0]+' x/y '+voisins[j][1]);
            switch(terrain.get(voisins[j][0], voisins[j][1])) {
                case TERRAIN_MASK_WALL:

                    break;
                case TERRAIN_MASK_SWAMP:
                    slot += 1;
                    //const creepAtPosSwamp = this.lookForAt('creep', j, k);//look objects at position return array
                    if (this.lookForAt('creep',voisins[j][0], voisins[j][1])) usedSlot += 1;
                    else {
                        freeSlot += 1;
                    }
                    break;
                case 0:
                    slot += 1;
                    //const creepAtPosSwamp = this.lookForAt('creep', j, k);//look objects at position return array
                    if (this.lookForAt('creep', voisins[j][0], voisins[j][1])) usedSlot += 1;
                    else {
                        freeSlot += 1;
                    }
                    break;
            }
        }
        console.log('freeslot:' + freeSlot + ' usedSlot:' + usedSlot+' slot:'+slot);
        sourceStats.grid[1][i] = freeSlot ;
        sourceStats.grid[2][i] = usedSlot;
        sourceStats.grid[3][i] = slot;
        //freeSlot = 0;
        //usedSlot = 0;
    }
    console.log('FIN ');
    this.memory.sourceStats = sourceStats;
};

Room.prototype.displaySourceManager = function () {
    console.table(this.memory.sourceStats);
}