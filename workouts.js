var exercises = [
    ['power_clean', 'lbs'],
    ['wt_crunch', 'n'],
    ['press_variation', 'no'],
    ['partner_hip', 'no'],
    ['spot', 'no'],
    ['squat', 'lbs'],
    ['spot_hit_exercise', 'no'],
    ['plate_good_morning', 'no'],
    ['jump_rope', 'no'],
    ['knee_2_elbow', 'no'],
    ['superman','no'],
    ['post_workout_stretch'],
    ['clean_&_jerk', 'no'],
    ['bar_thrusters', 'no'],
    ['pull_up', 'n'],
    ['dead_bugs', 'no'],
    ['bench', 'lbs'],
    ['bd_rows', 'lbs'],
    ['plank_rise', 'no'],
    ['overhead_walking_lunge'],
    ['walking_lunge', 'no'],
    ['romanian_deadlift','lbs'],
    ['squat_variation', 'no'],
    ['straight_leg_deadlift', 'lbs'],
    ['calves_raises','no']
    ['partner_neck', 'no'],
    ['spot_neck', 'no'],
    ['pizza_pies', 'no'],
    ['sabers', 'no'],
    ['chopping_wood', 'no'],
    ['team_finishers', 'no']
]

var workouts = {}

for (let i=0; exercises.length < i; i++) {
    workouts[exercises[i][0]] = {
        num: 0,
        type: exercises[i][1]
    }
}

module.exports = workouts