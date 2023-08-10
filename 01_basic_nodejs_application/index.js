

(async () => {
const task = 'text-classification';
const model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
	const { pipeline, env } = await import('@xenova/transformers');
	const classify = await pipeline(task, model, {});
	const result = await classify('I love Tech9ers!');
	console.log(result)
})();


(async () => {
	const task = 'text-classification';
	const model = 'distilbert-base-uncased-finetuned-sst-2-english';
	const { pipeline, env } = await import('@xenova/transformers');
	env.localModelPath = './models'
	env.allowRemoteModels = false;
	const classify = await pipeline(task, model, {});
	const result = await classify('I love Tech9ers!');
	console.log(result)
})();
//
//
// // (async () => {
// // 	const task = 'text-generation';
// // 	const model = 'MBZUAI/LaMini-GPT-124M';
// //
// // 	const instruction = 'Please let me know your thoughts on the given place and why you think it deserves to be visited: \n"Barcelona, Spain"'
// //
// // 	const input_prompt = `"Below is an instruction that describes a task. Write a response that appropriately completes the request.\n\n### Instruction:\n${instruction}\n\n### Response:`
// //
// //
// // 	const { pipeline, env, AutoTokenizer } = await import('@xenova/transformers');
// // 	env.localModelPath = './models'
// //
// // 	const llamaModel = await pipeline(task, model, {
// // 		local_files_only: true,
// // 	});
// // 	const result = await llamaModel(input_prompt, 512, true);
// // 	console.log(result)
// // })();
//
// const { spawn } = require('child_process');
// const sampleRate = 16000;
// // const model = new Model("path/to/your/model"); // Update the path to the Vosk model
// const streamURL = "http://listen.noagendastream.com/noagenda";
//
// // Create recognizer
// // const recognizer = new KaldiRecognizer(model, sampleRate);
//
// // Create ffmpeg process to read the stream
// // const ffmpegProcess = spawn('ffmpeg', [
// // 	'-loglevel', 'quiet', '-i', streamURL,
// // 	'-ar', sampleRate.toString(), '-ac', '1', '-f', 's16le', '-'
// // ]);
//
// const ffmpegProcess = spawn('ffmpeg', [
// 	'-loglevel', 'quiet',
// 	'-f', 'avfoundation', '-i', ":0",
// 	'-ar', sampleRate.toString(),
// 	'-ac', '1', '-f', 's16le', '-',
// 	// '-acodec', 'pcm_s16le', '-ac', '1', '-ar', '16000', '-'
// ]);
//
// ffmpegProcess.stdout.on('data', (data) => {
// 	console.log(data);
// });
//
// ffmpegProcess.stdout.on('end', () => {
// 	console.log("End of stream");
// 	console.log("End Stream Transcription");
// });
//
// ffmpegProcess.stderr.on('data', (data) => {
// 	// Handle any errors or messages from the ffmpeg process
// 	console.error(data.toString());
// });
//
// (async () => {
// 	while (true) {
// 		console.log("Start Stream Transcription");
// 		// sleep for one second
// 		await new Promise(r => setTimeout(r, 1000));
// 	}
// })();