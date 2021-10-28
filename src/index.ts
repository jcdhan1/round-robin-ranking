import Team from "./team";

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
   * @param items 
   * @param homeAway 
   */
  constructor(teams: Array<Team>, homeAway = true) {
    if (teams.length % 2)
      throw new Error("The number of items must be even.");

    this.teams = teams;
    this.homeAway = homeAway;
  }
}
