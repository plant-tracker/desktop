export interface Plant {
	id?: string;
	name: string;
	type: 'fern' | 'seed plant' | 'tree' | 'other';
	species: string;
	location: string;
	photoUrl: string;
	temperature: 'cool' | 'medium' | 'warm';
	light: 'low' | 'medium' | 'high';
	humidity: 'low' | 'medium' | 'high';
	created: Date;
}
