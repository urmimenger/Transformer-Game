export class Transformer {
    name: string;
    team: string;
    strength: number;
    intelligence: number;
    speed: number;
    endurance: number;
    rank: number;
    courage: number;
    firePower: number;
    skill: number;
    overallRating: number;

    constructor() {
    }

    createTransformer(input, transformer) {
        input = input.replace(/ /gi, "");
        var arr = input.split(',');
        if (arr.length == 1 && arr[0] == "") {
            return;
        }

        transformer.name = arr[0];
        transformer.team = arr[1];
        transformer.strength = Number(arr[2]);
        transformer.intelligence = Number(arr[3]);
        transformer.speed = Number(arr[4]);
        transformer.endurance = Number(arr[5]);
        transformer.rank = Number(arr[6]);
        transformer.courage = Number(arr[7]);
        transformer.firePower = Number(arr[8]);
        transformer.skill = Number(arr[9]);

        transformer.overallRating = transformer.strength + transformer.intelligence + transformer.speed + transformer.endurance + transformer.firePower;

        return transformer;

    }
}