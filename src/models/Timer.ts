export default class Timer {

    duration: number;

    private _startDate: Date | null = null;
    private _currentDate: Date | null = null;
    private _pausedTime: number = 0;

    public constructor(duration: number) {
        this.duration = duration;
    }

    get runningTime(): number {
        return this._pausedTime +
                (this._startDate && this._currentDate
                    ? ((this._currentDate.getTime() - this._startDate.getTime()) / 1000)
                    : 0);
    }

    get timeLeft(): number {
        return Math.max(0, this.duration - this.runningTime);
    }

    get completed(): boolean {
        return this.timeLeft == 0;
    }

    get playing(): boolean {
        return !this.completed && !!this._startDate;
    }

    get progress(): number {
        return 1 - (this.timeLeft / this.duration);
    }

    get durationForHumans(): string {
        return ('00' + Math.floor(this.duration / 60)).substr(-2) + ':' +
                ('00' + this.duration % 60).substr(-2);
    }

    get timeLeftForHumans(): string {

        let timeLeft = Math.round(this.timeLeft);

        return ('00' + Math.floor(timeLeft / 60)).substr(-2) + ':' +
                ('00' + timeLeft % 60).substr(-2);
    }

    public play(): void {
        this._startDate = new Date();
        this._currentDate = new Date();
    }

    public pause(): void {
        this._pausedTime = this.runningTime;
        this._startDate = null;
        this._currentDate = null;
    }

    public stop(): void {
        this._pausedTime = 0;
        this._startDate = null;
        this._currentDate = null;
    }

    public update(): void {
        this._currentDate = new Date();
    }

}
