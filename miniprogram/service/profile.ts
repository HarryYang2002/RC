import { rental } from "./proto_gen/rental/rental_pb";
import { SZTURC } from "./request";

export namespace ProfileService {
    export function getProfile(): Promise<rental.v1.IProfile> {
        return SZTURC.sendRequestWithAuthRetry({
            method: 'GET',
            path: '/v1/profile',
            respMarshaller: rental.v1.Profile.fromObject,
        })
    }

    export function submitProfile(req: rental.v1.IIdentity): Promise<rental.v1.IProfile> {
        return SZTURC.sendRequestWithAuthRetry({
            method: 'POST',
            path: '/v1/profile',
            data: req,
            respMarshaller: rental.v1.Profile.fromObject,
        })
    }

    export function clearProfile(): Promise<rental.v1.IProfile> {
        return SZTURC.sendRequestWithAuthRetry({
            method: 'DELETE',
            path: '/v1/profile',
            respMarshaller: rental.v1.Profile.fromObject,
        })
    }

    export function getProfilePhoto(): Promise<rental.v1.IGetProfilePhotoResponse> {
        return SZTURC.sendRequestWithAuthRetry({
            method: 'GET',
            path: '/v1/profile/photo',
            respMarshaller: rental.v1.GetProfilePhotoResponse.fromObject,
        })
    }

    export function createProfilePhoto(): Promise<rental.v1.ICreateProfilePhotoResponse> {
        return SZTURC.sendRequestWithAuthRetry({
            method: 'POST',
            path: '/v1/profile/photo',
            respMarshaller: rental.v1.CreateProfilePhotoResponse.fromObject,
        })
    }

    export function completeProfilePhoto(): Promise<rental.v1.IIdentity> {
        return SZTURC.sendRequestWithAuthRetry({
            method: 'POST',
            path: '/v1/profile/photo/complete',
            respMarshaller: rental.v1.Identity.fromObject,
        })
    }

    export function clearProfilePhoto(): Promise<rental.v1.IClearProfilePhotoResponse> {
        return SZTURC.sendRequestWithAuthRetry({
            method: 'DELETE',
            path: '/v1/profile/photo',
            respMarshaller: rental.v1.ClearProfilePhotoResponse.fromObject,
        })
    }
}