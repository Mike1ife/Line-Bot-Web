export interface UserTypePoint {
    userName: string;
    pictureUrl: string;
    point: number;
}

export interface MatchToday {
    team1LogoUrl: string;
    team2LogoUrl: string;
    team1Standing: string;
    team2Standing: string;
    team1Score: string;
    team2Score: string;
    team1Point: string;
    team2Point: string;
    gameTime: string;
}

export interface Profile {
    userName: string;
    pictureUrl: string;
    dayPoints: number;
    weekPoints: number;
    monthPoints: number;
    seasonPoints: number;
    allTimePoints: number;
}

export interface PointHistory {
    period: string;
    pointValue: number;
}

export interface Counter {
    teamName: string;
    teamLogoUrl: string;
    count: number;
}