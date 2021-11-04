// @ts-ignore
import api from '@molgenis/molgenis-api-client';
import IPseudonymResult from './IPseudonymResult';

export async function submitPseudonymRegistration(
  originalId: string
): Promise<IPseudonymResult> {
  let pseudonym = '';
  let isDuplicate = false;

  try {
    pseudonym = await getPseudonym(originalId);
    isDuplicate = Boolean(pseudonym);

    if (!isDuplicate) {
      pseudonym = await createPseudonym(originalId);
    }
  } catch (error) {
    //@ts-ignore
    await Promise.reject(error.toString());
  }

  return {pseudonym, isDuplicate};
}

async function createPseudonym(originalId: string) {
  const postOptions = {body: JSON.stringify({OriginalId: originalId})};
  return await api
    .post(`/api/data/PseudoId_PseudonymRegistration`, postOptions)
    .then(async (response: ApiResponse) => {
      if (response.status === 201) {
        return await getPseudonym(originalId);
      } else {
        throw new Error(
          `Could not create pseudonym. Unexpected status code ${response.status}`
        );
      }
    });
}

async function getPseudonym(originalId: string): Promise<string> {
  return await api
    .get(`/api/data/PseudoId_PseudonymRegistration?q=OriginalId==${originalId}`)
    .then(
      (response: ApiResponse) => {
        return response.items.length ? response.items[0].data.id : '';
      },
      (error: ApiResponse) => {
        throw new Error(
          `${error.statusText} (statuscode: ${error.status}). Please contact a system administrator`
        );
      }
    );
}

type ApiResponse = Response & {items: {data: {id: string}}[]};
