// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Keys are hidden for security reasons, add yours in here
import { key } from "./key";

export const environment = {
	production: false,
	firebase: {
		apiKey: key.apiKey,
		authDomain: key.authDomain,
		databaseURL: key.databaseURL,
		projectId: key.projectId,
		storageBucket: key.storageBucket,
		messagingSenderId: key.messagingSenderId
	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
