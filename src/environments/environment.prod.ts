// Keys are hidden for security reasons, add yours in here
import { key } from "./key";

export const environment = {
	production: true,
	firebase: {
		apiKey: key.apiKey,
		authDomain: key.authDomain,
		databaseURL: key.databaseURL,
		projectId: key.projectId,
		storageBucket: key.storageBucket,
		messagingSenderId: key.messagingSenderId
	}
};