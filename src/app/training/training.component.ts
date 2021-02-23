import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  onGoingTraining = false;
  trainingSubscription: Subscription;
  
  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.trainingSubscription = this.trainingService.exerciseChanged.subscribe(exercise => {
      if(exercise) {
        this.onGoingTraining = true;
      }
      else {
        this.onGoingTraining = false;
      }
    });
  }

  ngOnDestroy() {
    this.trainingSubscription.unsubscribe();
  }
}
