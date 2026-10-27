const BREEDS_URL = 'https://catfact.ninja/breeds';

export interface Breed {
    breed: string;
    country: string;
    origin: string;
    coat: string;
    pattern: string;
}

interface BreedsResponse {
    data: Breed[];
    total: number;
}

export async function fetchBreeds(limit: number, signal?: AbortSignal): Promise<Breed[]> {
    const url = new URL(BREEDS_URL);
    url.searchParams.set('limit', limit.toString());

    const response = await fetch(url, { signal });
    if (!response.ok) throw new Error(`Breeds request failed: ${response.status}`);

    const json: BreedsResponse = await response.json();
    return json.data;
}
