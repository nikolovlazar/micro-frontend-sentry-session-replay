import React from "react";
import { SingleSpaContext } from "single-spa-react";
import * as Sentry from "@sentry/react";

interface RootProps {
	name?: string;
	[key: string]: unknown;
}

export default function Root(props: RootProps) {
	const handleError = () => {
		// Example of manual error capture with module context
		Sentry.withScope((scope) => {
			scope.setTag("module", "users");
			scope.setTag("action", "manual-error");
			scope.setLevel("error");
			scope.setContext("componentProps", props);

			const error = new Error("Users module test error");
			Sentry.captureException(error);
			throw error; // Still throw to see in UI
		});
	};
	return (
		<SingleSpaContext.Consumer>
			{(singleSpaProps) => (
				<section>
					<h2>@ssr/users microfrontend</h2>
					<p>{props.name || singleSpaProps?.name || "Users"} is mounted!</p>
					<p>Props received: {JSON.stringify(props, null, 2)}</p>
					<button type="button" onClick={handleError}>
						Throw error
					</button>
				</section>
			)}
		</SingleSpaContext.Consumer>
	);
}
