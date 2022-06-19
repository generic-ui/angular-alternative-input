import { Observable } from 'rxjs';

export type ReactiveInput<T> = {
  on(): Observable<T>;
  get(): T | undefined;
}
