export default class Timer {

    duration: number;

    private _startDate: Date | null = null;
    private _currentDate: Date | null = null;
    private _running: boolean = false;
    private _pausedTime: number = 0;

    public constructor(duration: number) {
        this.duration = duration;
    }

    get runningTime(): number {
        return this._startDate && this._currentDate
                ? this._pausedTime + ((this._currentDate.getTime() - this._startDate.getTime()) / 1000)
                : 0;
    }

    get timeLeft(): number {
        return Math.max(0, this.duration - this.runningTime);
    }

    get completed(): boolean {
        return this.timeLeft == 0;
    }

    get playing(): boolean {
        return this._running && !this.completed && !!this._startDate;
    }

    get progress(): number {
        return 1 - (this.timeLeft / this.duration);
    }

    get running(): boolean {
        return this._running;
    }

    public start(): void {
        this._startDate = new Date();
        this._currentDate = this._startDate;
        this._running = true;
        this._pausedTime = 0;
    }

    public pause(): void {
        this._running = false;
        this._pausedTime = this.runningTime;
    }

    public resume(): void {
        this._running = true;
        this._startDate = new Date();
        this._currentDate = new Date();
    }

    public stop(): void {
        this._running = false;
    }

    public update(): void {
        this._currentDate = new Date();
    }

}
