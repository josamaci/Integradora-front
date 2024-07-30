export interface User {
    id: string,
    username: string,
    room: string,
    isAdmin: boolean,
    info: {
        teamColor: string,
        taps: number,
        playersCount?: number,
        caballosCount?: number,
        teamsColor?: Array<string>,
        startTime?:string,
        finishTime?:string,
        tapsTimes:{
            [userid:string]:{
                team: string,
                times: Array<string>,
            }
        }
    }
}