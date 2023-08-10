import {ChangeEvent, useCallback, useEffect, useRef, useState} from "react";
import {Inter} from 'next/font/google'
import {Button, CircularProgress} from "@nextui-org/react";
import {Code} from "@nextui-org/react";

const inter = Inter({subsets: ['latin']})
import {Textarea} from "@nextui-org/react";
import {Progress} from "@nextui-org/progress";


export default function Home() {
	const workerRef = useRef<Worker>();
	const [ready, setReady] = useState(false);
	const [progress, setProgress] = useState<number>(0);
	const [result, setResult] = useState<string>('');
	
	useEffect(() => {
		workerRef.current = new Worker(new URL('../ai.worker.ts', import.meta.url))
		
		const onMessageReceived = (event: MessageEvent) => {
			console.log(event.data);
			switch (event.data.status) {
				case 'initiate':
					setReady(false);
					break;
				case 'ready':
					setReady(true);
					break;
				case 'progress':
					setProgress(event.data.progress)
					break;
				case 'complete':
					setResult(event.data.output[0])
					break;
			}
		};
		
		// Attach the callback function as an event listener.
		workerRef.current.addEventListener('message', onMessageReceived);

		return () => {
			workerRef.current?.terminate()
		}
	}, [])
	
	const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
		workerRef.current?.postMessage({ text: e.target.value })
	}
	
	return (
			<main
				className={`flex min-h-screen flex-col items-center p-24 ${inter.className} className="dark text-foreground bg-background"`}
			>
				<h1 className="text-4xl font-bold">Transformers.js Client Side Processing</h1>
				<Textarea
					label="Description"
					className="mt-4 w-full"
					variant="bordered"
					labelPlacement="outside"
					placeholder="Enter your description"
					onChange={onTextChange}
				/>
				{
					(progress < 100) && (
						<Progress size="md" className="mt-4 w-full" aria-label="Loading..." value={progress} />
					)
				}
				{
					ready && result && (
						<>
							<h2>Response: </h2>
							<Code color="default" className="mt-10">{JSON.stringify(result, null, 2)}</Code>
						</>
					)
				}
			</main>
	)
}
