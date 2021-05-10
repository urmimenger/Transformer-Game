

import { Component } from '@angular/core';

export class ResolveBattleService {
    kingOfTransformers: any;
    aTeam: any;
    dTeam: any;
    exception: any;

    constructor() {
        this.kingOfTransformers = null;
        this.aTeam = [];
        this.dTeam = [];
        this.exception = null;
    }

    // checks if any of the transformer is the superpower(Optimus Prime, Predaking)
    FindSpecialTransformer() {
        if ((this.aTeam.name == "OptimusPrime" || this.aTeam.name == "Predaking") && (this.dTeam.name == "OptimusPrime" || this.dTeam.name == "Predaking")) {
            this.kingOfTransformers = null;
            this.exception = "Fight between " + this.aTeam.name + " and " + this.dTeam.name + ". So, no Battle as they are the superpowers."
            throw (this.exception);
        }
        else if (this.aTeam.name == "OptimusPrime" || this.aTeam.name == "Predaking") {
            this.kingOfTransformers = this.aTeam;
        }
        else if (this.dTeam.name == "OptimusPrime" || this.dTeam.name == "Predaking") {
            this.kingOfTransformers = this.dTeam;
        }


    }

    // master method to figure out the winner
    /* 1. Check if any of the transformer is superpower
       2. Check opponent run away based on strength and courage
       3. Check Skill
       4. Check Overall rating
    */
    findWinner(autobot, decepticon, ex) {
        this.exception = ex;
        this.aTeam = autobot;
        this.dTeam = decepticon;



        this.FindSpecialTransformer();

        if (this.kingOfTransformers == null) {
            if ((this.aTeam.strength - this.dTeam.strength) >= 3 && (this.aTeam.courage - this.dTeam.courage) >= 3) {
                this.kingOfTransformers = this.aTeam
            }
            else if ((this.dTeam.strength - this.aTeam.strength) >= 3 && (this.dTeam.courage - this.aTeam.courage) >= 3) {
                this.kingOfTransformers = this.dTeam;
            }
            else if (this.aTeam.skill - this.dTeam.skill >= 3) {
                this.kingOfTransformers = this.aTeam;
            }
            else if (this.dTeam.skill - this.aTeam.skill >= 3) {
                this.kingOfTransformers = this.dTeam;
            }
            else if (this.aTeam.overallRating > this.dTeam.overallRating) {
                this.kingOfTransformers = this.aTeam;
            }
            else if (this.dTeam.overallRating > this.aTeam.overallRating) {
                this.kingOfTransformers = this.dTeam;
            }
            else if (this.aTeam.overallRating == this.dTeam.overallRating) {
                this.kingOfTransformers = null;
                this.exception = "Its a tie between " + this.aTeam.name + " and " + this.dTeam.name + ".";
                throw (this.exception)
            }
        }



        return this.kingOfTransformers;
    }

}