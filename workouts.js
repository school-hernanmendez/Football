var exercises = [
    ['power_clean', 'lbs'],
    ['wt_crunch', 'n'],
    ['press_variations', 'no'],
    ['partner_hip', 'no'],
    ['snatch', 'lbs'],
    ['spot', 'no'],
    ['squat', 'lbs'],
    ['spot_hit_exercise', 'no'],
    ['spot_hip', 'no'],
    ['plate_good_mornings', 'no'],
    ['hang_clean', 'lbs'],
    ['jump_rope', 'no'],
    ['knees_2_elbows', 'no'],
    ['superman', 'no'],
    ['clean_&_jerk', 'lbs'],
    ['bar_thrusters', 'lbs'],
    ['pull_up', 'n'],
    ['dead_bugs', 'no'],
    ['bench', 'lbs'],
    ['db_rows', 'lbs'],
    ['plank_raises', 'no'],
    ['overhead_walking_lunge', 'no'],
    ['walking_lunge', 'no'],
    ['romanian_deadlift', 'lbs'],
    ['squat_variation', 'no'],
    ['straight_leg_deadlift', 'lbs'],
    ['calves_raises', 'no'],
    ['partner_neck', 'no'],
    ['spot_neck', 'no'],
    ['pizza_pies', 'no'],
    ['sabers', 'no'],
    ['chopping_wood', 'no'],
    ['team_finishers', 'no']
]

var workouts = {}

for (let i=0; exercises.length > i; i++) {
    workouts[exercises[i][0]] = {
        num: 0,
        type: exercises[i][1]
    }
}

module.exports = workouts