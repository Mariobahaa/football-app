import { Games } from "./games.model";
import { Team } from "./team.model";

export interface Standing {
    rank: number;
    team: Team;
    all: Games;
    goalsDiff: number;
    points: number;
}
