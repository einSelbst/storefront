// Code generated by wunderctl. DO NOT EDIT.

import type { GraphQLError } from "@wundergraph/sdk/client";

export type JSONValue = string | number | boolean | JSONObject | Array<JSONValue>;

export type JSONObject = { [key: string]: JSONValue };

export interface AllBusinessesInput {
	size?: number;
	cursor?: string;
}

export interface GetBusinessByNameInput {
	name: string;
}

export interface GetCarInput {
	carId: string;
}

export interface AllBusinessesInputInternal {
	size?: number;
	cursor?: string;
}

export interface GetBusinessByNameInputInternal {
	name: string;
}

export interface GetCarInputInternal {
	carId: string;
}

export interface AllBusinessesInputInjected {
	size?: number;
	cursor?: string;
}

export interface GetBusinessByNameInputInjected {
	name: string;
}

export interface GetCarInputInjected {
	carId: string;
}

export interface AllAutosResponse {
	data?: AllAutosResponseData;
	errors?: GraphQLError[];
}

export interface AllBrandsResponse {
	data?: AllBrandsResponseData;
	errors?: GraphQLError[];
}

export interface AllBusinessesResponse {
	data?: AllBusinessesResponseData;
	errors?: GraphQLError[];
}

export interface DragonsResponse {
	data?: DragonsResponseData;
	errors?: GraphQLError[];
}

export interface GetBusinessByNameResponse {
	data?: GetBusinessByNameResponseData;
	errors?: GraphQLError[];
}

export interface GetCarResponse {
	data?: GetCarResponseData;
	errors?: GraphQLError[];
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

export interface AllBusinessesResponseData {
	faunaDB_allBusinesses: {
		data: {
			_id: string;
			name: string;
			display: string;
			wikipedia: string;
			country: string;
		}[];
		before?: string;
		after?: string;
	};
}

export interface DragonsResponseData {
	spacex_dragons?: {
		name?: string;
		active?: boolean;
		id?: string;
	}[];
}

export interface GetBusinessByNameResponseData {
	faunaDB_findBusinessByName?: {
		_id: string;
		name: string;
		display: string;
		wikipedia: string;
	};
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
