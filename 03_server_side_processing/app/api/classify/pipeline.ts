import { Pipeline, pipeline} from "@xenova/transformers";

const task = 'text-classification';
const model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';

let instance: Promise<Pipeline> | null = null;

export async function getInstance(progress_callback: any = null) {
	if (instance === null) {
		instance = pipeline(task, model, { progress_callback });
	}
	return instance;
}
