// @ts-ignore
import api from '@molgenis/molgenis-api-client';
import {entityPackage, pseudonymRegistrationEntity} from './ConfigManager';
import IPseudonymResult from './IPseudonymResult';

export type ApiResponse = Response & {items: {data: {id: string}}[]};

const apiPath = `/api/data/${
  entityPackage ? entityPackage + '_' : ''
}${pseudonymRegistrationEntity}`;

const INFORM_MESSAGE =
  'If you think this is a bug, please inform us at: https://github.com/molgenis/molgenis-app-pseudonym-registration/issues';

export function submitPseudonymRegistration(
  originalId: string
): Promise<IPseudonymResult> {
  return getPseudonym(originalId)
    .then(async (pseudonym: string) => {
      const isDuplicate = Boolean(pseudonym);
      if (isDuplicate) {
        return {
          pseudonym,
          isDuplicate
        };
      } else {
        return {
          pseudonym: await createPseudonym(originalId),
          isDuplicate
        };
      }
    })
    .catch((error) => {
      return Promise.reject(Object(error).toString());
    });
}

function getPseudonym(originalId: string): Promise<string> {
  const apiParameters = `?q=OriginalId=="${originalId}"`;
  return api
    .get(apiPath + apiParameters)
    .then((response: ApiResponse) => {
      return response.items.length ? response.items[0].data.id : '';
    })
    .catch(errorHandler);
}

function createPseudonym(originalId: string) {
  const postOptions = {body: JSON.stringify({OriginalId: originalId})};
  return api
    .post(apiPath, postOptions)
    .then((response: Response) => {
      if (response.status === 201) {
        return getPseudonym(originalId);
      } else {
        return Promise.reject(response);
      }
    })
    .catch(errorHandler);
}

function errorHandler(error: ApiResponse | string): void {
  if (isApiResponse(error)) {
    throw new Error(
      `${error.statusText} (statuscode: ${error.status}). ${INFORM_MESSAGE}`
    );
  } else {
    throw error;
  }
}

function isApiResponse(
  response: ApiResponse | string
): response is ApiResponse {
  return (<ApiResponse>response).status !== undefined;
}

export function validateInput(input: string): string {
  if (input === '') {
    return 'Please enter an id.';
  } else if (
    input.indexOf('\\') !== -1 ||
    input.indexOf('"') !== -1 ||
    input.indexOf('&') !== -1 ||
    input.indexOf('|') !== -1 ||
    input.indexOf('{') !== -1 ||
    input.indexOf('}') !== -1 ||
    input.indexOf('[') !== -1 ||
    input.indexOf(']') !== -1 ||
    input.indexOf('`') !== -1 ||
    input.indexOf('#') !== -1 ||
    input.indexOf('^') !== -1
  ) {
    return 'Id cannot contain these characters: # ^ " \\ & | { } [ ] `';
  } else {
    return '';
  }
}
