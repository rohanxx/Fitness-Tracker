import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class TrainingService {
    availableExercises: Exercise[] = [
        {id: 'crunches', name: 'Crunches', duration: 30, calories: 8},    
        {id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15},    
        {id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18},    
        {id: 'burpees', name: 'Burpess', duration: 60, calories: 8}    
    ];

    runningExercise: Exercise;
    exerciseChanged = new Subject<Exercise>();
    exercises: Exercise[] = [];

    trainingExercises() {
        return this.availableExercises.slice();
    }

    startExercise(selectedId: string) {
        const exercise = this.availableExercises.find(ex => ex.id == selectedId);
        this.runningExercise = exercise;
        this.exerciseChanged.next({...this.runningExercise})
    }

    getRunningExercise() {
        return {...this.runningExercise};
    }

    completeExercise() {
        this.exercises.push({ ...this.runningExercise, date: new Date(), state: 'completed'});
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.exercises.push({ 
            ...this.runningExercise, 
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            date: new Date(), 
            state: 'cancelled'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getCompletedOrCancelledExercise() {
        return this.exercises.slice();
    }
}