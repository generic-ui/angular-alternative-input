import { Component } from '@angular/core';
import { createInput } from '../input/input';


@Component({
	selector: 'app-user',
	template: `

		Reactive User:
		{{ userInput.on() | async }}
		{{ identityInput.on() | async }}
		<br/>

		Static:
		{{ userInput.get() }}
		<br/>

	`,
	inputs: ['user', 'identity']
})
export class UserComponent {

	userInput = createInput<string>('user', this);

	identityInput = createInput<string>('identity', this);

}

