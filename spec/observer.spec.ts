
import {ISubject} from '../src/ISubject';
import {Subject} from '../src/Subject';

interface IConcreteObserver {
    onConcreteSubjectNotify(subject: ConcreteSubject): void;
}

class Foo implements IConcreteObserver {
    onConcreteSubjectNotify(subject: ConcreteSubject) {}
}

class ConcreteSubject implements ISubject<IConcreteObserver> {
    private _subject: Subject<IConcreteObserver>;

    public constructor() {
        this._subject = new Subject(this);
    }

    public attachObserver(observer: IConcreteObserver): void {
        this._subject.attachObserver(observer);
    }

    public detachObserver(observer: IConcreteObserver): boolean {
        return this._subject.detachObserver(observer);
    }

    public notify(observer: IConcreteObserver): void {
        observer.onConcreteSubjectNotify(this);
    }

    public emit(): void {
        this._subject.notify();
    }
}

describe('observers', () => {
    it('onConcreteSubjectNotify is called with subject', () => {
        let subject: ConcreteSubject = new ConcreteSubject();
        let foo: Foo = new Foo();

        subject.attachObserver(foo);

        jest.spyOn(foo, 'onConcreteSubjectNotify');
        subject.emit();

        expect(foo.onConcreteSubjectNotify).toHaveBeenCalledWith(subject);
    });
});