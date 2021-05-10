import { Component } from '@angular/core';
import { Transformer } from './transformer';
import { BattleData } from './BattleData';
import { ResolveBattleService } from './resolveBattleService';
import { BattleValidationHelper } from './validationService'
import { BattleException } from './BattleExceptionHandler'
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ResolveBattleService, BattleValidationHelper]
})
export class AppComponent {
  public battleData: BattleData;
  battleInput = "";
  public transformer: Transformer;
  battleService: ResolveBattleService;
  battleExceptionHandler: BattleException;
  battleValidation: BattleValidationHelper
  exception: any;


  constructor(battleService: ResolveBattleService, battleValidaton: BattleValidationHelper) {
    this.battleService = battleService;
    this.battleExceptionHandler = new BattleException();
    this.battleData = new BattleData();
    this.battleValidation = new BattleValidationHelper();

  }
  // initializes all the properties
  init() {
    this.battleData.aTeam = [];
    this.battleData.dTeam = [];
    this.battleData.winners = [];
    this.battleData.lefts = [];
    this.battleData.numberOfBattles = null;
    this.battleData.aWins = 0;
    this.battleData.dWins = 0;
    this.battleData.defeated = "";
    this.battleData.finalWinner = "";

  }

  // master method for battle
  /* 1. Form Autobots and Decepticons teams
     2. Make the teams fight
     3. Set the intermediate winners
     4. Set the survivors
     5. Set the final winner

  */
  startBattle() {

    try {

      this.init();
      this.constructTeams();
      this.battleData.numberOfBattles = 0;
      if (!(this.isBattlePossible())) {
        this.exception = "Battle is not possible within single or no team. "
        throw (this.exception);
      }
      // Fight will go till both teams have fighters left
      while (this.battleData.aTeam.length > 0 && this.battleData.dTeam.length > 0) {
        this.battleService = new ResolveBattleService();
       // for one on one fight, high ranked fighter is chosen from each team and then removed from the list of figthers
       var winTeam = this.battleService.findWinner(this.battleData.aTeam.pop(), this.battleData.dTeam.pop(), this.exception);
        if (winTeam != null) {
          this.winnerSetup(winTeam)
        }
        this.battleData.numberOfBattles += 1;
      }
      this.setLefts();
      this.setFinalWinner();
    }
    catch (exception) {
      this.battleExceptionHandler.handleError(exception)
    }
  }


  // If no team or only single team figthers are available, so no battle
  isBattlePossible() {
    if (this.battleData.aTeam.length == 0 || this.battleData.dTeam.length == 0) {
      return false;
    }
    return true;
  }

  // validates the figthers data entered by user and creates the seperate teams for autobots and decepticons sorted by rank
  constructTeams() {
    var input = [];
    input = this.battleInput.split('\n');
    for (var i = 0; i < input.length; i++) {
      this.battleValidation.validateInput(input[i], this.exception);
      this.transformer = new Transformer();
      var trans = this.transformer.createTransformer(input[i], this.transformer);
      if (trans == undefined)
        continue;
      if (trans.team == "A")
        this.battleData.aTeam.push(trans);
      if (trans.team == "D")
        this.battleData.dTeam.push(trans);

      //sort
      this.battleData.aTeam = this.battleData.aTeam.sort((a, b) => {
        if (a.rank < b.rank) { return -1; }
        else if (a.rank > b.rank) { return 1; }
        else { return 0; }
      });

      this.battleData.dTeam = this.battleData.dTeam.sort((a, b) => {
        if (a.rank < b.rank) { return -1; }
        else if (a.rank > b.rank) { return 1; }
        else { return 0; }
      });


    }
  }


// Sets the data to decide final winner(no of wins, intermediate winner)
  winnerSetup(winner) {
    if (winner.team == "D") {
      this.battleData.dWins++;
    }
    if (winner.team == "A") {
      this.battleData.aWins++;
    }

    this.battleData.winners.push(winner);

  }


  // sets the survivors of loosing team
  setLefts() {

    if ((this.battleData.dWins == this.battleData.aWins) && (this.battleData.dWins > 0)) {
      this.exception = "Its a tie as both the transformers knocked same number of opponents in " + this.battleData.numberOfBattles + " battles."
      throw (this.exception);

    }
    else {
      this.battleData.defeated = this.battleData.dWins > this.battleData.aWins ? "Autobots" : "Decepticons";
      this.battleData.lefts = (this.battleData.defeated == "Decepticons") ? this.battleData.dTeam : this.battleData.aTeam;
    }

  }

  // sets the final winner
  setFinalWinner() {

    var winner;
    winner = this.battleData.winners;
    for (let i = winner.length - 1; i >= 0; i--) {
      var looser = this.battleData.defeated == "Decepticons" ? "D" : "A"
      if (winner[i].team != looser) {
        this.battleData.finalWinner = winner[i]
      }

    }
  }

}
