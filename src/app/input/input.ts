import { Observable, Subject } from 'rxjs';
import { SimpleChanges } from '@angular/core';
import { ReactiveInput } from './reactive-input';

const components = new Set<any>();
const changeFunctionMap = new Map<any, Array<changeFunction>>();

type changeFunction = (changes: SimpleChanges) => void;

export function createInput<T>(inputName: string, component: any): ReactiveInput<T> {

	let value: T | undefined = undefined;
	const values$ = new Subject<T>();

	if (!components.has(component)) {
		component.__proto__.ngOnChanges = (changes: SimpleChanges) => {
			const changeFunctions = changeFunctionMap.get(component) || [];
			changeFunctions.forEach((changeFunction: changeFunction) => {
				changeFunction(changes);
			});
		};
		components.add(component);
		changeFunctionMap.set(component, []);
	}

	changeFunctionMap.get(component)!
					.push((changes: SimpleChanges) => {
						if (changes[inputName]?.currentValue) {
							value = changes[inputName]?.currentValue;
							values$.next(changes[inputName]?.currentValue);
						}
					});

	return {
		get: () => value,
		on: () => {
			return values$;
		}
	};
}
