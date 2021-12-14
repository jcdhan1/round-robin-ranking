import RoundRobinRanking from '../src/index';
import { Team } from '../src/team';
import { expect } from 'chai';

// Helpers
const TEAMS: Array<Team> = [
    new Team(0, 'Manchester City'),
    new Team(1, 'Liverpool'),
    new Team(2, 'Chelsea'),
    new Team(3, 'West Ham United'),
    new Team(4, 'Manchester United'),
    new Team(5, 'Arsenal'),
    new Team(6, 'Tottenham Hotspur'),
    new Team(7, 'Leicester City'),
    new Team(8, 'Wolverhampton Wanderers'),
    new Team(9, 'Brentford')
];

/**
 * Randomly selects n teams.
 * 
 * @param n how may teams to return.
 * @returns an array of teams.
 */
let randomTeams = (n: number): Array<Team> => {
    let shuffled = [...TEAMS].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, n);
}

// Suites
describe('No teams', () => {
    let RRR = new RoundRobinRanking([]);
    it('should initialise with 0 teams and home-away games enabled', () => {
        expect(RRR.teams).to.be.an('array');
        expect(RRR.teams).to.be.empty;
        expect(RRR.homeAway).to.be.true;
    })
    it('should not schedule any matches', () => {
        expect(RRR.matches).to.be.empty;
        RRR.scheduleMatches();
        expect(RRR.matches).to.be.empty;
    })
});

describe('Teams play each other once', () => {
    for (let n = 2; n <= 10; n++) {
        let RRR = new RoundRobinRanking(randomTeams(n), false);
        it(`should initialise with ${n} teams with home away games disabled`, () => {
            expect(RRR.teams).to.be.an('array');
            expect(RRR.teams).to.have.lengthOf(n);
            expect(RRR.homeAway).to.be.false;
        })
        let total: number = n * (n - 1) / 2;
        it(`should schedule ${total} matches`, () => {
            expect(RRR.matches).to.be.empty;
            RRR.scheduleMatches();
            expect(RRR.matches).to.have.lengthOf(total);
        })
    }
});

describe('Teams play home-away games', () => {
    for (let n = 2; n <= 10; n++) {
        let RRR = new RoundRobinRanking(randomTeams(n), true);
        it(`should initialise with ${n} teams with home away games enabled`, () => {
            expect(RRR.teams).to.be.an('array');
            expect(RRR.teams).to.have.lengthOf(n);
            expect(RRR.homeAway).to.be.true;
        })
        let total: number = n * (n - 1);
        it(`should schedule ${total} matches`, () => {
            expect(RRR.matches).to.be.empty;
            RRR.scheduleMatches();
            expect(RRR.matches).to.have.lengthOf(total);
        })
    }
});
