"use client";

import {Snippet} from "@nextui-org/snippet";
import {Code} from "@nextui-org/code"
import {title} from "@/components/primitives";
import {Textarea} from "@nextui-org/input";
import {useState} from "react";

export default function Home() {
	// Keep track of the classification result and the model loading status.
	const [result, setResult] = useState(true);
	const [ready, setReady] = useState(false);
	
	const classify = async (text: string) => {
		if (!text) return;
		if (ready === null) setReady(false);
		
		// Make a request to the /classify route on the server.
		const result = await fetch(`/api/classify?text=${encodeURIComponent(text)}`);
		
		// If this is the first time we've made a request, set the ready flag.
		if (!ready) setReady(true);
		
		const json = await result.json();
		setResult(json);
	};
	
	
	return (
		<section className="flex flex-col items-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Use&nbsp;</h1>
				<h1 className={title({color: "blue"})}>Transformer.js&nbsp;</h1>
				<br/>
				<h1 className={title()}>
					everywhere
				</h1>
			</div>
			
			<div className="mt-12 w-full items-center flex flex-col  ">
				<Textarea
					label="Description"
					className="mt-4 w-full"
					variant="bordered"
					labelPlacement="outside"
					placeholder="Enter your description"
					onChange={e => {
						classify(e.target.value);
					}}
				/>
				{
					result && (
						<Snippet hideSymbol hideCopyButton variant="flat" className="mt-8">
							<span>
								<Code color="primary">{JSON.stringify(result, null, 2)}</Code>
							</span>
						</Snippet>
					)
				}
				{
					!ready  && (
						<Snippet hideSymbol hideCopyButton variant="flat" className="mt-8">
							<span>
								<Code color="primary">Loading...</Code>
							</span>
						</Snippet>
					)
				}
			
			</div>
		</section>
	);
}
