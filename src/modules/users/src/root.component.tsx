import React from "react";
import { SingleSpaContext } from "single-spa-react";

interface RootProps {
	name?: string;
	[key: string]: unknown;
}

export default function Root(props: RootProps) {
	return (
		<SingleSpaContext.Consumer>
			{(singleSpaProps) => (
				<section>
					<h2>@ssr/users microfrontend</h2>
					<p>{props.name || singleSpaProps?.name || "Users"} is mounted!</p>
					<p>Props received: {JSON.stringify(props, null, 2)}</p>
				</section>
			)}
		</SingleSpaContext.Consumer>
	);
}
