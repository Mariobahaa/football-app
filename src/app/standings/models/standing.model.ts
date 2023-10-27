import { Games } from "./games.model";
import { Team } from "./team.model";

export class Standing {
    rank!: number;
    team!: Team;
    all!: Games;
    goalsDiff: number = 0;
    points: number = 0;
}
