/**
 * Harvest or move to a target
 * @param {Source} target
 */
Creep.prototype.harvestOrMove = function (target) {
    if (this.harvest(target) === ERR_NOT_IN_RANGE) {
        this.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
}
