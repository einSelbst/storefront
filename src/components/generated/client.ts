import {
	Client,
	ClientConfig,
	CreateClientConfig,
	User,
	UploadRequestOptions,
	OperationMetadata,
	OperationsDefinition,
	OperationRequestOptions,
	SubscriptionRequestOptions,
	SubscriptionEventHandler,
	FetchUserRequestOptions,
	UploadValidationOptions,
	ExtractProfileName,
	ExtractMeta,
} from "@wundergraph/sdk/client";

import type { PublicCustomClaims } from "./claims";
import type {
	AllAutosResponse,
	AllAutosResponseData,
	AllBrandsResponse,
	AllBrandsResponseData,
	AllBusinessesResponse,
	AllBusinessesResponseData,
	DragonsResponse,
	DragonsResponseData,
	GetBusinessByNameResponse,
	GetBusinessByNameInput,
	GetBusinessByNameResponseData,
	GetCarResponse,
	GetCarInput,
	GetCarResponseData,
} from "./models";

export type UserRole = "admin" | "user";

export const WUNDERGRAPH_S3_ENABLED = false;
export const WUNDERGRAPH_AUTH_ENABLED = true;

export enum AuthProviderId {
	"github" = "github",
}

export interface AuthProvider {
	id: AuthProviderId;
	login: (redirectURI?: string) => void;
}

export const defaultClientConfig: ClientConfig = {
	applicationHash: "c01662ab",
	baseURL: "http://localhost:9991",
	sdkVersion: "0.138.0",
};

export const operationMetadata: OperationMetadata = {
	AllAutos: {
		requiresAuthentication: false,
	},
	AllBrands: {
		requiresAuthentication: false,
	},
	AllBusinesses: {
		requiresAuthentication: false,
	},
	Dragons: {
		requiresAuthentication: false,
	},
	GetBusinessByName: {
		requiresAuthentication: false,
	},
	GetCar: {
		requiresAuthentication: false,
	},
};

export type PublicUser = User<UserRole, PublicCustomClaims>;

export class WunderGraphClient extends Client {
	query<
		OperationName extends Extract<keyof Operations["queries"], string>,
		Input extends Operations["queries"][OperationName]["input"] = Operations["queries"][OperationName]["input"],
		Data extends Operations["queries"][OperationName]["data"] = Operations["queries"][OperationName]["data"]
	>(options: OperationName extends string ? OperationRequestOptions<OperationName, Input> : OperationRequestOptions) {
		return super.query<OperationRequestOptions, Data>(options);
	}
	mutate<
		OperationName extends Extract<keyof Operations["mutations"], string>,
		Input extends Operations["mutations"][OperationName]["input"] = Operations["mutations"][OperationName]["input"],
		Data extends Operations["mutations"][OperationName]["data"] = Operations["mutations"][OperationName]["data"]
	>(options: OperationName extends string ? OperationRequestOptions<OperationName, Input> : OperationRequestOptions) {
		return super.mutate<OperationRequestOptions, Data>(options);
	}
	subscribe<
		OperationName extends Extract<keyof Operations["subscriptions"], string>,
		Input extends Operations["subscriptions"][OperationName]["input"] = Operations["subscriptions"][OperationName]["input"],
		Data extends Operations["subscriptions"][OperationName]["data"] = Operations["subscriptions"][OperationName]["data"]
	>(
		options: OperationName extends string
			? SubscriptionRequestOptions<OperationName, Input>
			: SubscriptionRequestOptions,
		cb: SubscriptionEventHandler<Data>
	) {
		return super.subscribe(options, cb);
	}
	public login(authProviderID: Operations["authProvider"], redirectURI?: string) {
		return super.login(authProviderID, redirectURI);
	}
	public async fetchUser<TUser extends PublicUser = PublicUser>(options?: FetchUserRequestOptions) {
		return super.fetchUser<TUser>(options);
	}
}

export const createClient = (config?: CreateClientConfig) => {
	return new WunderGraphClient({
		...defaultClientConfig,
		...config,
		operationMetadata,
		csrfEnabled: true,
	});
};

export type Queries = {
	AllAutos: {
		input?: undefined;
		data: AllAutosResponseData;
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	AllBrands: {
		input?: undefined;
		data: AllBrandsResponseData;
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	AllBusinesses: {
		input?: undefined;
		data: AllBusinessesResponseData;
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	Dragons: {
		input?: undefined;
		data: DragonsResponseData;
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	GetBusinessByName: {
		input: GetBusinessByNameInput;
		data: GetBusinessByNameResponseData;
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	GetCar: {
		input: GetCarInput;
		data: GetCarResponseData;
		requiresAuthentication: false;
		liveQuery: boolean;
	};
};

export type Mutations = {};

export type Subscriptions = {};

export type LiveQueries = {
	AllAutos: {
		input?: undefined;
		data: AllAutosResponseData;
		liveQuery: true;
		requiresAuthentication: false;
	};
	AllBrands: {
		input?: undefined;
		data: AllBrandsResponseData;
		liveQuery: true;
		requiresAuthentication: false;
	};
	AllBusinesses: {
		input?: undefined;
		data: AllBusinessesResponseData;
		liveQuery: true;
		requiresAuthentication: false;
	};
	Dragons: {
		input?: undefined;
		data: DragonsResponseData;
		liveQuery: true;
		requiresAuthentication: false;
	};
	GetBusinessByName: {
		input: GetBusinessByNameInput;
		data: GetBusinessByNameResponseData;
		liveQuery: true;
		requiresAuthentication: false;
	};
	GetCar: {
		input: GetCarInput;
		data: GetCarResponseData;
		liveQuery: true;
		requiresAuthentication: false;
	};
};

export interface Operations
	extends OperationsDefinition<Queries, Mutations, Subscriptions, UserRole, {}, keyof typeof AuthProviderId> {}
