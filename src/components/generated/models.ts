// Code generated by wunderctl. DO NOT EDIT.

export type JSONValue = string | number | boolean | JSONObject | Array<JSONValue>;

export type JSONObject = { [key: string]: JSONValue };

export interface GraphQLError {
	message: string;
	path?: ReadonlyArray<string | number>;
}

export interface GetCarInput {
	carId: string;
}

export interface InternalGetCarInput {
	carId: string;
}

export interface InjectedGetCarInput {
	carId: string;
}

export interface AllAutosResponse {
	data?: AllAutosResponseData;
	errors?: ReadonlyArray<GraphQLError>;
}

export interface AllBrandsResponse {
	data?: AllBrandsResponseData;
	errors?: ReadonlyArray<GraphQLError>;
}

export interface DragonsResponse {
	data?: DragonsResponseData;
	errors?: ReadonlyArray<GraphQLError>;
}

export interface GetCarResponse {
	data?: GetCarResponseData;
	errors?: ReadonlyArray<GraphQLError>;
}

export interface AllAutosResponseData {
	faunaDB_allAutos: {
		data: {
			id: string;
			Make?: string;
			CommercialName?: string;
			MemberState?: string;
		}[];
	};
}

export interface AllBrandsResponseData {
	faunaDB_allBrands: {
		data: {
			_id: string;
			name: string;
			display: string;
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

export interface GetCarResponseData {
	faunaDB_Auto?: {
		Make?: string;
		CommercialName?: string;
		MemberState?: string;
		Manufacturer?: string;
		id: string;
		_id: string;
	};
}
