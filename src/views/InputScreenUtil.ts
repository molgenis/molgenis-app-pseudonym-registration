// @ts-ignore
import api from '@molgenis/molgenis-api-client';

type ApiResponse = Response & {items: {data: {id: string}}[]};

export const submitPseudonymRegistration = async (
  originalId: string
): Promise<{pseudonym: string; isDuplicate: boolean}> => {
  let pseudonym = '';
  let isDuplicate = false;
  const postOptions = {body: JSON.stringify({OriginalId: originalId})};

  try {
    await api
      .post(`/api/data/PseudoId_PseudonymRegistration`, postOptions)
      .then(
        async (response: ApiResponse) => {
          if (response.status === 201) {
            pseudonym = await getNewPseudonym(originalId);
          } else {
            throw new Error(`Unexpected status code ${response.status}`);
          }
        },
        async (error: Response) => {
          if (error.status === 400) {
            const result = await checkForDuplicateId(originalId);
            pseudonym = result.pseudonym;
            isDuplicate = result.isDuplicate;
          } else {
            throw new Error(
              `${error.statusText} (statuscode: ${error.status}). Please contact a system administrator`
            );
          }
        }
      );
  } catch (error: any) {
    await Promise.reject(error.toString());
  }
  return {pseudonym, isDuplicate};
};

const getNewPseudonym = async (originalId: string): Promise<string> => {
  let newPseudonym = '';
  await api
    .get(`/api/data/PseudoId_PseudonymRegistration?q=OriginalId==${originalId}`)
    .then(
      (response: ApiResponse) => {
        newPseudonym = response.items[0].data.id;
      },
      (error: ApiResponse) => {
        throw new Error(
          `${error.statusText} (statuscode: ${error.status}). Please contact a system administrator`
        );
      }
    );
  return newPseudonym;
};

const checkForDuplicateId = async (
  originalId: string
): Promise<{pseudonym: string; isDuplicate: boolean}> => {
  let isDuplicate = false;
  let pseudonym = '';
  await api
    .get(`/api/data/PseudoId_PseudonymRegistration?q=OriginalId==${originalId}`)
    .then(
      (response: ApiResponse): void => {
        if (response.items.length) {
          pseudonym = response.items[0].data.id;
          isDuplicate = true;
        } else {
          throw new Error(`Please contact a system administrator`);
        }
      },
      (error: ApiResponse): void => {
        throw new Error(
          `${error.statusText} (statuscode: ${error.status}). Please contact a system administrator`
        );
      }
    );
  return {pseudonym, isDuplicate};
};
