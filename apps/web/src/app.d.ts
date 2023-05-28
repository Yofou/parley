/// <reference types="@sveltejs/kit" />

// src/app.d.ts
declare global {
	namespace App {
		interface Locals {
			auth: import("lucia-auth").AuthRequest;
		}
	}
}

/// <reference types="lucia-auth" />
declare global {
	namespace Lucia {
		type Auth = import("$lib/lucia").Auth;
    type UserAttributes = {
      username: string;
      email: string;
    };
	}
}

// THIS IS IMPORTANT!!!
export {};
