import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

const lifecycles = singleSpaReact({
	React,
	ReactDOMClient,
	rootComponent: Root,
	errorBoundary(err, info, props) {
		console.error("Microfrontend @ssr/admin error:", err, info);
		return (
			<div style={{ padding: "20px", border: "1px solid red", margin: "10px" }}>
				<h3>Something went wrong in @ssr/admin</h3>
				<details>
					<summary>Error details</summary>
					<pre>{err?.stack}</pre>
				</details>
			</div>
		);
	},
	domElementGetter: () => document.getElementById("admin"),
	renderType: "createRoot",
});

export const { bootstrap, mount, unmount } = lifecycles;
