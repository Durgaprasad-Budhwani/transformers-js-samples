import {NextRequest, NextResponse} from 'next/server';
import {getInstance} from "@/app/api/classify/pipeline";

export async function GET(request: NextRequest): Promise<NextResponse> {
	const text = new URL(request.url).searchParams.get('text');
	if (!text) {
		return new NextResponse(
			JSON.stringify({
				error: 'Missing text parameter',
			}),
			{status: 400}
		);
	}
	// Get the classification pipeline. When called for the first time,
	// this will load the pipeline and cache it for future use.
	const classifier = await getInstance();
	
	// Actually perform the classification
	const result = await classifier(text);
	
	return new NextResponse(JSON.stringify(result));
}