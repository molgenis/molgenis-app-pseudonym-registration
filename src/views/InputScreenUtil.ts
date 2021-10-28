// @ts-ignore
import api from '@molgenis/molgenis-api-client';

interface PseudonymRegistrationConfig {
  ID: string;
  GeneratedTokenDescription: string;
  GeneratedTokenName: string;
  LinkEntityName: string;
  FieldName: string;
}
type ApiResponse = Response & {items: any};

const requestConfiguration = (
  id: string
): Promise<PseudonymRegistrationConfig> =>
  api.get(`/api/v2/PseudonymRegistrationConfig?q=ID=like=${id}`);

const submitPseudonymRegistration = async (
  config: PseudonymRegistrationConfig,
  originalID: string
): Promise<string> => {
  let requestID: string = '';
  const postOptions = {body: JSON.stringify({OriginalID: originalID})};
  try {
    await api.post(`/api/data/${config.LinkEntityName}`, postOptions).then(
      async (response: ApiResponse) => {
        if (response.status === 201) {
          requestID = await getNewPseudonym(config, originalID);
        } else {
          throw new Error(`Unexpected status code ${response.status}`);
        }
      },
      async (error: Response) => {
        if (error.status === 400) {
          await checkForDuplicateID(config, originalID);
        } else {
          throw new Error(
            `${error.statusText} Please contact a system administrator`
          );
        }
      }
    );
  } catch (error: any) {
    await Promise.reject(error.toString());
  }
  return requestID;
};

const getNewPseudonym = async (
  config: PseudonymRegistrationConfig,
  originalID: string
): Promise<string> => {
  let newPseudonym: string = '';
  await api
    .get(
      `/api/data/${config.LinkEntityName}?q=${config.FieldName}==${originalID}`
    )
    .then(
      (response: ApiResponse) => {
        newPseudonym = response.items[0].data.ID;
      },
      (error: ApiResponse) => {
        throw new Error(
          `${error.statusText} Please contact a system administrator`
        );
      }
    );
  return newPseudonym;
};

const checkForDuplicateID = async (
  config: PseudonymRegistrationConfig,
  originalID: string
): Promise<void> => {
  await api
    .get(
      `/api/data/${config.LinkEntityName}?q=${config.FieldName}==${originalID}`
    )
    .then(
      (response: ApiResponse) => {
        const preExistingId = response.items[0].data.ID;
        if (preExistingId !== '') {
          throw new Error(
            `This record already exist with the id: ${preExistingId}`
          );
        } else {
          throw new Error(`Please contact a system administrator`);
        }
      },
      (error: ApiResponse) => {
        throw new Error(
          `${error.statusText} Please contact a system administrator`
        );
      }
    );
};

export default {
  requestConfiguration,
  submitPseudonymRegistration
};
