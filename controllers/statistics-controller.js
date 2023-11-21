import ctrlWrapper from "../helpers/ctrlWrapper.js";
import User from "../models/user-model.js";
import { Exercise } from "../models/exercises.js";
import { DiaryExercise } from "../models/diary-exercises.js";

const getStatistics = async (req, res) => {

    const [allExercises, allUsers, exercisesDone] = await Promise.all([
        Exercise.find(),
        User.find(),
        DiaryExercise.find(),
    ])

    const getAllBurnedCalories = async () => {
        const { calories, time } = exercisesDone.reduce((acc, data) => {
            acc.calories += data.calories;
            acc.time += data.time;
            return acc;
        }, { calories: 0, time: 0 });

        return { calories, time };
    };

    const data = await getAllBurnedCalories();

    res.json({
        exercisesVideos: allExercises.length,
        usersCount: allUsers.length,
        exercisesDone: exercisesDone.length,
        allBurnedColories: data.calories,
        generalTimeSpend: data.time,
    })
}

export default {
    getStatistics: ctrlWrapper(getStatistics)
}