import { Standing } from "./standing.model"

export interface StandingsResponse {
    response: Array<League>
}

interface League{
    league: {
        standings: Array<Array<Standing>>
    }
}