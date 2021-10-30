export type Result = {
    id: number;
    score: number;
};

export class Team {
    /**
     * A numeric identifier for the team.
     */
    private _id: number;

    /**
     * A text-based identifier for the team.
     */
    private _name: string;

    /**
     * An array of home game results against an opponent team.
     * @defaultValue `[]`
     */
    private _results: Array<Result> = [];

    /**
     * Initialises a Team.
     * 
     * @param id 
     * @param name 
     */
    constructor(id: number, name: string) {
        this._id = id;
        this._name = name;
    }

    public get id(): number {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get results(): Array<Result> {
        return this._results;
    }

    public set results(results: Array<Result>) {
        this._results = results;
    }
}
