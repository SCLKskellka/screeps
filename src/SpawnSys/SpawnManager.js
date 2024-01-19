var SpawnManager ={

    WorkType : function (roleName) {

        var array = _.filter(Game.creeps, (creep) => creep.memory.role == roleName);
        console.log(array.name + ': ' + array.length);
        return array;
    },
    Spawn : function (){
        var harvesters = this.WorkType('harvester');
        //console.log('Harvesters: ' + harvesters.length);
        var upgraders = this.WorkType('upgrader');
        //console.log('Upgraders: ' + upgraders.length);
        var builders = this.WorkType('builder');
        //console.log('Builders: ' + builders.length);

        if(harvesters.length < 3) {
            var newName = 'Harvester' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'harvester'}});
            console.log('Spawning new harvester: ' + newName + 'spawned.');
        }
        else if(upgraders.length < 3){
            var newName = 'Upgrader' + Game.time;
            console.log('Spawning new upgrader: ' + newName + 'spawned.');
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'upgrader'}});
        }
        if(builders.length < 4) {
            var newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName + 'spawned.');
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'builder'}});
        }
        if(Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }
    }

};

module.exports = SpawnManager;
