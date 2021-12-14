import { Team, Result } from "./team";

type Match = {
    home: number;
    away: number;
}

type Ranking = {
    id: number;
    name: string;
    total: number;
}

/**
 * A Round-Robin Ranking (RRR) system.
 * 
 * @public
 */
export default class RoundRobinRanking {
    /**
     * Keeps track of the teams and their home game scores.
     */
    private _teams: Array<Team>;

    /**
     * Whether or not teams play both home and away matches.
     */
    private _homeAway: boolean;

    /**
     * The matches to play.
     */
    private _matches: Array<Match>;

    /**
     * Negates a score.
     * 
     * @param score the score to be negated.
     * @returns a negated score.
     */
    private negate(score: number) {
        return 1 - score;
    }

    /**
     * Initialises a RoundRobinRanking.
     * 
     * @param teams 
     * @param homeAway 
     */
    constructor(teams: Array<Team>, homeAway = true) {
        this._teams = teams;
        this._homeAway = homeAway;
        this._matches = [];
    }

    public get teams(): Array<Team> {
        return this._teams;
    }

    public get homeAway(): boolean {
        return this._homeAway;
    }

    public get matches(): Array<Match> {
        return this._matches;
    }

    /**
     * Schedules matches between every team.
     * When homeAway is false, a match is only created if the teams have not
     * played each other before.
     */
    public scheduleMatches() {
        var ids: Array<number> = this._teams.map(team => team.id);

        // Iterate through every team as the home team.
        ids.forEach((h: number) => {
            //  Iterate through every other id as the away team.
            let withoutCurrent: Array<number> = ids.filter(id => id != h);
            withoutCurrent.forEach((a: number) => {
                // Push a new match to the matches array.
                let newMatch = { home: a, away: h };
                if (this._homeAway) {
                    this._matches.push(newMatch);
                }
                else {
                    // Less matches if _homeAway is false.
                    if (this._matches.findIndex((element) => {
                        return (element.home === a && element.away === h);
                    }) < 0) {
                        this._matches.push(newMatch);
                    }
                }
            });
        });
    }

    /**
     * This pushes a result against an away team to a home team's results array.
     * 
     * @param home the id of the home team.
     * @param away the id of the away team.
     * @param score the ratio of the home team's score to the away team's score.
     */
    public recordResult(home: number, away: number, score: number) {
        var recorder = (h: number, a: number, s: number) => {
            // Get the home team.
            let homeIndex: number = this._teams.findIndex(team => team.id == h);
            // Push a new result to the home team's results array.
            this._teams[homeIndex].results.push({ id: a, score: s });
        };

        recorder(home, away, score);

        if (!this._homeAway) {
            // Record the negation.
            recorder(away, home, this.negate(score));
        }
    }

    /**
     * Rank each team by their total score.
     * 
     * @returns a sorted array of rankings
     */
    public rank(): Array<Ranking> {
        var rankings: Array<Ranking> = [];

        // Add up the home scores.
        this._teams.forEach(team => {
            let total: number = 0;
            team.results.forEach(result => {
                total += result.score;
            });

            if (this._homeAway) {
                // Add up the negated away scores.
                this._teams.map((a: Team) => {
                    let aResult = a.results.find(h => h.id == team.id);
                    if (typeof aResult !== "undefined") {
                        total += this.negate(aResult.score);
                    }
                });
            }

            rankings.push({ id: team.id, name: team.name, total: total })
        });

        // Sort by the total then return in descending order.
        rankings.sort((a: Ranking, b: Ranking) => {
            if (a.total > b.total) {
                return 1;
            }

            if (a.total < b.total) {
                return -1;
            }

            return 0;
        });

        return rankings.reverse();
    }
}
