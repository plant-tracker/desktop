export interface Plant {
	name: string;
	type: 'fern' | 'seed plant' | 'tree' | 'other';
	species: string;
	location: string;
	photoUrl: string;
	temperature: 'cool' | 'room' | 'warm';
	light: 'low' | 'medium' | 'high';
	humidity: 'low' | 'medium' | 'high';
	addedDate: Date;
}
