import React from "react";
import { SingleSpaContext } from "single-spa-react";
import * as Sentry from "@sentry/react";

interface RootProps {
	name?: string;
	[key: string]: unknown;
}

function AdminComponent(props: RootProps) {
	const handleError = () => {
		// Example of manual error capture with module context
		Sentry.withScope((scope) => {
			scope.setTag("module", "admin");
			scope.setTag("action", "manual-error");
			scope.setLevel("error");
			scope.setContext("componentProps", props);

			const error = new Error("Admin module test error");
			Sentry.captureException(error);
			throw error; // Still throw to see in UI
		});
	};

	return (
		<SingleSpaContext.Consumer>
			{(singleSpaProps) => (
				<section>
					<h2>@ssr/admin microfrontend</h2>
					<p>{props.name || singleSpaProps?.name || "Admin"} is mounted!</p>
					<p>Props received: {JSON.stringify(props, null, 2)}</p>
					<button type="button" onClick={handleError}>
						Throw error (with Sentry context)
					</button>
				</section>
			)}
		</SingleSpaContext.Consumer>
	);
}

// Wrap with Sentry's React Error Boundary and Profiler
const Root = Sentry.withErrorBoundary(
	Sentry.withProfiler(AdminComponent, { name: "AdminComponent" }),
	{
		fallback: ({ error, resetError }) => (
			<div style={{ padding: "20px", border: "1px solid red", margin: "10px" }}>
				<h3>Something went wrong in @ssr/admin</h3>
				<p>{error instanceof Error ? error.message : String(error)}</p>
				<button type="button" onClick={resetError}>
					Try again
				</button>
			</div>
		),
		beforeCapture: (scope) => {
			scope.setTag("errorBoundary", "admin-module");
			scope.setTag("module", "admin");
		},
	},
);

export default Root;
