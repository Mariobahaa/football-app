export class Constants{
    static readonly defaultLeague: string= "England";
    static readonly apiKey: string= "976620c20c96e2bcad0ed14bf78f4375";
    static readonly baseURL: string=  "https://v3.football.api-sports.io/";
    static readonly host: string = 'v3.football.api-sports.io';
    static readonly apiHeaders = {
        'x-rapidapi-host': Constants.host,
        'x-rapidapi-key': Constants.apiKey
    }
    static readonly leagues: {[key:string]: number}= {
        "England": 39,
        "Spain" : 140,
        "France": 61,
        "Germany": 78,
        "Italy": 135
    };

    static readonly numberOfFixtures: number = 10;
    static readonly separator: string = "_$_"
}