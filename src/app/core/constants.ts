export class Constants{
    static readonly defaultLeague: string= "England";
    static readonly apiKey: string= "976620c20c96e2bcad0ed14bf78f4375";
    static readonly baseURL: string=  "https://media.api-sports.io/football/";
    static readonly host: string = 'v3.football.api-sports.io';
    readonly apiHeaders = {
        'x-rapidapi-host': Constants.host,
        'x-rapidapi-key': Constants.baseURL
    }
    static readonly leagues: {[key:string]: number}= {
        "England": 39,
        "Spain" : 140,
        "France": 61,
        "Germany": 78,
        "Italy": 135
    };
}