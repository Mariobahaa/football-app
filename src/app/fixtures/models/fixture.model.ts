import { Team } from "./team.model";

export interface Fixture{
    teams: {home: Team, away: Team}
    goals: {home: number, away: number}
}
