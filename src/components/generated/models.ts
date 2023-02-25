// Code generated by wunderctl. DO NOT EDIT.

export type JSONValue = string | number | boolean | JSONObject | Array<JSONValue>;

export type JSONObject = { [key: string]: JSONValue };

export interface GraphQLError {
	message: string;
	path?: ReadonlyArray<string | number>;
}

export interface AllAutosResponse {
	data?: AllAutosResponseData;
	errors?: ReadonlyArray<GraphQLError>;
}

export interface DragonsResponse {
	data?: DragonsResponseData;
	errors?: ReadonlyArray<GraphQLError>;
}

export interface AllAutosResponseData {
	faunaDB_allAutos: {
		data: {
			Make?: string;
			CommercialName?: string;
			MemberState?: string;
		}[];
	};
}

export interface DragonsResponseData {
	spacex_dragons?: {
		name?: string;
		active?: boolean;
		id?: string;
	}[];
}