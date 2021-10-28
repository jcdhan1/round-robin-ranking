type Result = {
    id: number;
    score: number;
};

export default class Team {
    /**
     * A numeric identifier for the team.
     */
    private id: number;

    /**
     * A text-based identifier for the team.
     */
    private name: string;

    /**
     * An array of home game results against an opponent team.
     * @defaultValue `[]`
     */
    private results: Array<Result> = [];

    /**
     * Initialises a Team.
     * 
     * @param id 
     * @param name 
     */
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
