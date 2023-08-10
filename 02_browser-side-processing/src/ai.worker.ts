import { pipeline, env } from "@xenova/transformers";

// Skip local model check
// @ts-ignore
env.allowLocalModels = false;

// Use the Singleton pattern to enable lazy construction of the pipeline.
class PipelineSingleton {
    static task = 'text-classification';
    static model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
    static instance: any = null;

    static async getInstance(progress_callback: any = null) {
        if (this.instance === null) {
            this.instance = pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
}

addEventListener('message', async (event: MessageEvent) => {
    // Retrieve the classification pipeline. When called for the first time,
    // this will load the pipeline and save it for future use.
    let classifier = await PipelineSingleton.getInstance((x: any) => {
        // We also add a progress callback to the pipeline so that we can
        // track model loading.
        postMessage(x);
    });

    // Actually perform the classification
    let output = await classifier(event.data.text);

    // Send the output back to the main thread
    postMessage({
        status: 'complete',
        output: output,
    });
});

// addEventListener('message', (event: MessageEvent<number>) => {
//     postMessage(pi(event.data))
// })