import { Team, Result } from "./team";

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
  private teams: Array<Team>;

  /**
   * Whether or not teams play both home and away matches.
   */
  private homeAway: boolean;

  /**
   * Initialises a RoundRobinRanking.
   * 
   * @param teams 
   * @param homeAway 
   */
  constructor(teams: Array<Team>, homeAway = true) {
    this.teams = teams;
    this.homeAway = homeAway;
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
      let homeIndex: number = this.teams.findIndex((team: Team) => {
        return team.id == h;
      })

      // Push a new result to the home team's results array.
      this.teams[homeIndex].results.push({ id: a, score: s });
    };

    recorder(home, away, score);

    if (!this.homeAway) {
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
    this.teams.forEach(team => {
      let total: number = 0;
      team.results.forEach(result => {
        total += result.score;
      });

      if (this.homeAway) {
        // Add up the negated away scores.
        this.teams.map((opponent: Team) => {
          let resultAgainst = opponent.results.find((toCheck: Result) => {
            return toCheck.id == team.id;
          });
          if (typeof resultAgainst !== "undefined") {
            total += this.negate(resultAgainst.score);
          }
        });
      }

      rankings.push({ id: team.id, name: team.name, total: total })
    });

    // Sort by the otal then return in descending order.
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

  /**
   * Negates a score.
   * 
   * @param score the score to be negated.
   * @returns a negated score.
   */
  private negate(score: number) {
    return 1 - score;
  }
}
