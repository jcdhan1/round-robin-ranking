import RoundRobinRanking from '../src/index';
import { Team } from '../src/team';
import { expect } from 'chai';

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
    let teams: Array<Team> = [
        new Team(1, 'Manchester United'),
        new Team(2, 'West Ham United'),
        new Team(3, 'Liverpool'),
        new Team(4, 'Chelsea')
    ];
    let RRR = new RoundRobinRanking(teams, false);
    it('should initialise with 4 teams with home away games disabled', () => {
        expect(RRR.teams).to.be.an('array');
        expect(RRR.teams).to.have.lengthOf(4);
        expect(RRR.homeAway).to.be.false;
    })
    it('should schedule 6 matches', () => {
        expect(RRR.matches).to.be.empty;
        RRR.scheduleMatches();
        console.log(RRR.matches);
    })
});

describe('Teams play home-away games', () => {
    let teams: Array<Team> = [
        new Team(1, 'Manchester United'),
        new Team(2, 'West Ham United'),
        new Team(3, 'Liverpool'),
        new Team(4, 'Chelsea')
    ];
    let RRR = new RoundRobinRanking(teams);
    it('should initialise with 4 teams and home-away games enabled', () => {
        expect(RRR.teams).to.be.an('array');
        expect(RRR.teams).to.have.lengthOf(4);
        expect(RRR.homeAway).to.be.true;
    })
    it('should schedule 12 matches', () => {
        expect(RRR.matches).to.be.empty;
        RRR.scheduleMatches();
        expect(RRR.matches).to.have.lengthOf(12);
    })
});
